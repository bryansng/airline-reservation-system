package dreamwok.reservation.service;

import dreamwok.reservation.configuration.SecurityConfig;
import dreamwok.reservation.core.auth.request.RegisterRequest;
import dreamwok.reservation.core.auth.request.SignInRequest;
import dreamwok.reservation.core.auth.response.RegisterResponse;
import dreamwok.reservation.core.auth.response.SignInResponse;
import dreamwok.reservation.core.customer.request.CustomerRequest;
import dreamwok.reservation.repository.AuthRepository;
import dreamwok.reservation.repository.CustomerRepository;
import dreamwok.reservation.model.Auth;

import java.time.LocalDateTime;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;

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

  public ResponseEntity<SignInResponse> login(@RequestBody SignInRequest signInRequest, HttpServletRequest request) {
    String email = signInRequest.getEmail();
    String password = signInRequest.getPassword();

    Customer customer = customerRepository.findByEmail(email);
    Auth auth = authRepository.findByEmail(email);
    if (customer != null && auth != null) {
      if (auth.getEmail().equals(email) && securityConfig.getPasswordEncoder().matches(password, auth.getHash())) {
        securityConfig.configAuth(auth, securityConfig.getAuth(), customer.getRoles());
        authenticateUserAndSetSession(customer, request);
        return new ResponseEntity<>(new SignInResponse("Logged in successfully.", customer), HttpStatus.OK);
      }
      return new ResponseEntity<>(new SignInResponse("Failed to login. Email or password incorrect.", null),
          HttpStatus.BAD_REQUEST);
    }
    return new ResponseEntity<>(new SignInResponse("Failed to login. Customer does not exist.", null),
        HttpStatus.NOT_FOUND);
  }

  public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest registerRequest,
      HttpServletRequest request) {
    CustomerRequest customerRequest = new CustomerRequest(registerRequest.getEmail(), "Braddy", "Yeoh", "123 Road",
        "123", LocalDateTime.now(), "member");

    ResponseEntity<RegisterResponse> registerResponse = customerService.create(customerRequest);

    if (registerResponse.getStatusCode() == HttpStatus.CREATED) {
      Customer customer = customerRepository.findByEmail(registerRequest.getEmail());
      Auth auth = authRepository.findByEmail(registerRequest.getEmail());
      securityConfig.configAuth(auth, securityConfig.getAuth(), "USER");
      authenticateUserAndSetSession(customer, request);
      return registerResponse;
    }
    return new ResponseEntity<>(new RegisterResponse("Failed to create new customer.", null),
        HttpStatus.INTERNAL_SERVER_ERROR);
  }

  public void authenticateUserAndSetSession(Customer customer, HttpServletRequest request) {
    UserDetails user = customerDetailsService.toUserDetails(customer);

    Authentication auth = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());

    SecurityContextHolder.getContext().setAuthentication(auth);
  }

  public void addCustomerToModel(Model model, Authentication authentication) {
    if (isAuthenticated(authentication)) {
      Customer customer = getCustomerFromUserObject(authentication);
      // System.out.println("is authenticated");
      model.addAttribute("customer", customer);
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
}