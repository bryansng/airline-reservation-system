package dreamwok.reservation.service;

import dreamwok.reservation.configuration.SecurityConfig;
import dreamwok.reservation.core.auth.request.RegisterRequest;
import dreamwok.reservation.core.auth.request.SignInRequest;
import dreamwok.reservation.core.auth.response.RegisterResponse;
import dreamwok.reservation.core.auth.response.SignInResponse;
import dreamwok.reservation.dto.CustomerDTO;
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
  private final int MAX_ALLOWED_FAILED_AUTH_ATTEMPTS = 3;
  // private final long AUTH_TIMEOUT_DURATION = 5; // 2 hours, in seconds.
  private final long AUTH_TIMEOUT_DURATION = 2 * 60 * 60; // 2 hours, in seconds.

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
      if (isExceededFailedAuthAttempts(customer)) {
        return new ResponseEntity<>(new SignInResponse("400",
            "Failed to login. Exceeded authentication attempts. Please try again later.", null), HttpStatus.OK);
      }

      // if email and password in request body same as in db.
      if (auth.getEmail().equals(email) && securityConfig.getPasswordEncoder().matches(password, auth.getHash())) {
        // reset failed auth attempts.
        resetFailedAuthAttempts(customer);

        securityConfig.configAuth(auth, securityConfig.getAuth(), customer.getRoles());
        authenticateUserAndSetSession(customer, request);
        return new ResponseEntity<>(new SignInResponse("200", "Logged in successfully.", new CustomerDTO(customer)),
            HttpStatus.OK);
      }

      // incorrect credentials.
      incrementFailedAuthAttempts(customer);
      return new ResponseEntity<>(new SignInResponse("400", "Failed to login. Email or password incorrect.", null),
          HttpStatus.OK);
    }

    // email does not exist.
    return new ResponseEntity<>(new SignInResponse("400", "Failed to login. Customer does not exist.", null),
        HttpStatus.OK);
  }

  private Boolean isExceededFailedAuthAttempts(Customer customer) {
    // System.out.println("timeout till: " + customer.getAuthTimeoutUntil());
    // System.out.println("failed: " + customer.getNumFailedAuthAttempts());

    // check if timeout until has past.
    // if so, reset auth attempts.
    // and return false.
    if (customer.getAuthTimeoutUntil() != null && LocalDateTime.now().isAfter(customer.getAuthTimeoutUntil())) {
      resetFailedAuthAttempts(customer);
      return false;
    }

    return customer.getNumFailedAuthAttempts() >= MAX_ALLOWED_FAILED_AUTH_ATTEMPTS
        && customer.getAuthTimeoutUntil() != null;
  }

  private void incrementFailedAuthAttempts(Customer customer) {
    customer.incrementFailedAuthAttempts();

    // if exceeded allowed attempts,
    // add timeout until.
    if (customer.getNumFailedAuthAttempts() >= MAX_ALLOWED_FAILED_AUTH_ATTEMPTS) {
      customer.setAuthTimeoutUntil(LocalDateTime.now().plusSeconds(AUTH_TIMEOUT_DURATION));
    }

    customerRepository.save(customer);
  }

  private void resetFailedAuthAttempts(Customer customer) {
    customer.setNumFailedAuthAttempts(0);
    customer.setAuthTimeoutUntil(null);
    customerRepository.save(customer);
  }

  public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest registerRequest,
      HttpServletRequest request) {
    ResponseEntity<RegisterResponse> registerResponse = customerService.create(registerRequest);

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