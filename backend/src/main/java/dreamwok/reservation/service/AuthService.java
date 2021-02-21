package dreamwok.reservation.service;

import dreamwok.reservation.configuration.SecurityConfig;
import dreamwok.reservation.repository.AuthRepository;
import dreamwok.reservation.repository.CustomerRepository;
import dreamwok.reservation.model.Auth;

import java.time.LocalDateTime;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.ui.Model;

import dreamwok.reservation.model.ActionConclusion;
import dreamwok.reservation.model.Customer;

@Service
public class AuthService {
  @Autowired
  AuthRepository authRepository;

  @Autowired
  SecurityConfig securityConfig;

  @Autowired
  CustomerService customerService;

  @Autowired
  CustomerRepository customerRepository;

  @Autowired
  CustomerDetailsService customerDetailsService;

  public ActionConclusion login(String email, String password, HttpServletRequest request) {
    Customer customer = customerRepository.findByEmail(email);
    Auth auth = authRepository.findByEmail(email);
    if (customer != null && auth != null) {
      if (auth.getEmail().equals(email) && securityConfig.getPasswordEncoder().matches(password, auth.getHash())) {
        securityConfig.configAuth(auth, securityConfig.getAuth(), customer.getRoles());
        authenticateUserAndSetSession(customer, request);
        return new ActionConclusion(true, "Logged in successfully.");
      }
      return new ActionConclusion(false, "Failed to login. Email or password incorrect.");
    }
    return new ActionConclusion(false, "Failed to login. Customer does not exist.");
    // return securityConfig.getPasswordEncoder().matches(password, aLogin.getHash());
  }

  public ActionConclusion register(String fullName, String email, String password, String confirmPassword,
      HttpServletRequest request) {
    if (!password.equals(confirmPassword)) {
      return new ActionConclusion(false, "Failed to register. Passwords do not match.");
    }

    ActionConclusion acCustomerCreate = customerService.create(email, password, fullName, "", "", "", "", "",
        "customer", "USER");
    if (acCustomerCreate.isSuccess) {
      Customer customer = customerRepository.findByEmail(email);
      Auth auth = authRepository.findByEmail(email);
      securityConfig.configAuth(auth, securityConfig.getAuth(), "USER");
      authenticateUserAndSetSession(customer, request);
      return new ActionConclusion(true, "Registered successfully.");
    }
    return acCustomerCreate;
  }

  public void authenticateUserAndSetSession(Customer customer, HttpServletRequest request) {
    UserDetails user = customerDetailsService.toUserDetails(customer);

    Authentication auth = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());

    SecurityContextHolder.getContext().setAuthentication(auth);
  }

  public void addCustomerToModel(Model model, Authentication authentication) {
    if (isAuthenticated(authentication)) {
      Customer customer = getCustomerFromUserObject(authentication);
      setCustomerActiveOn(customer);
      // System.out.println("is authenticated");
      model.addAttribute("customer", customer);
      model.addAttribute("customerInitials", customer.getInitials());
    } else {
      // System.out.println("not authenticated");
    }
  }

  public Boolean isAuthenticated(Authentication authentication) {
    return authentication != null && authentication.isAuthenticated();
  }

  /**
   * @param authentication
   * @return customer if authentication is true, null if not.
   */
  public Customer getCustomerFromUserObject(Authentication authentication) {
    if (authentication != null && authentication.isAuthenticated()) {
      User user = (User) authentication.getPrincipal();
      return customerRepository.findByEmail(user.getUsername());
    }
    return null;
  }

  private void setCustomerActiveOn(Customer customer) {
    customer.setLastActiveOn(LocalDateTime.now());
  }
}