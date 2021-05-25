package dreamwok.reservation.service;

import dreamwok.reservation.configuration.JwtTokenUtil;
import dreamwok.reservation.configuration.SecurityConfig;
import dreamwok.reservation.core.auth.request.RegisterRequest;
import dreamwok.reservation.core.auth.request.SignInRequest;
import dreamwok.reservation.core.auth.request.UserByTokenRequest;
import dreamwok.reservation.core.auth.response.RegisterResponse;
import dreamwok.reservation.core.auth.response.SignInResponse;
import dreamwok.reservation.dto.CustomerDTO;
import dreamwok.reservation.repository.AuthRepository;
import dreamwok.reservation.repository.CustomerRepository;
import lombok.extern.log4j.Log4j2;
import dreamwok.reservation.model.Auth;

import java.time.LocalDateTime;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestBody;

import dreamwok.reservation.model.Customer;

@Service
@Log4j2
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

  @Autowired
  LoginIPAttemptService loginIPAttemptService;

  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  JwtTokenUtil jwtTokenUtil;

  public ResponseEntity<SignInResponse> login(@RequestBody SignInRequest signInRequest, HttpServletRequest request)
      throws Exception {
    String ipAddress = loginIPAttemptService.getClientIP(request);
    if (loginIPAttemptService.isBlocked(ipAddress)) {
      log.debug(String.format("Failed to login by IP %s due to exceeded IP authentication attempts.", ipAddress));
      return new ResponseEntity<>(new SignInResponse("400",
          "Failed to login. Exceeded IP authentication attempts. Please try again later.", null, null), HttpStatus.OK);
    }

    String email = signInRequest.getEmail();
    String password = signInRequest.getPassword();

    Customer customer = customerRepository.findByEmail(email);
    Auth auth = authRepository.findByEmail(email);
    if (customer != null && auth != null) {
      if (isExceededFailedAuthAttempts(customer)) {
        log.debug(
            String.format("Failed to login to user id %s by IP %s due to exceeded account authentication attempts.",
                customer.getId().toString(), ipAddress));
        return new ResponseEntity<>(
            new SignInResponse("400",
                "Failed to login. Exceeded account authentication attempts. Please try again later.", null, null),
            HttpStatus.OK);
      }

      // if email and password in request body same as in db.
      if (auth.getEmail().equals(email) && securityConfig.getPasswordEncoder().matches(password, auth.getHash())) {
        // reset failed auth attempts.
        resetFailedAuthAttempts(customer);
        loginIPAttemptService.loginSucceeded(ipAddress);

        // securityConfig.configAuth(auth, securityConfig.getAuth(), customer.getRoles());
        // authenticateUserAndSetSession(customer, request);

        UserDetails userDetails = customerDetailsService.loadUserByUsername(email);
        final String token = jwtTokenUtil.generateToken(userDetails);

        try {
          authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        } catch (DisabledException e) {
          throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
          throw new Exception("INVALID_CREDENTIALS", e);
        }

        log.debug(String.format("Successful login to user id %s by IP %s.", customer.getId().toString(), ipAddress));
        return new ResponseEntity<>(
            new SignInResponse("200", "Logged in successfully.", new CustomerDTO(customer), token), HttpStatus.OK);
      }

      // incorrect credentials.
      incrementFailedAuthAttempts(customer);
      loginIPAttemptService.loginFailed(ipAddress);
      log.debug(String.format("Failed to login to user id %s by IP %s due to incorrect email or password.",
          customer.getId().toString(), ipAddress));
      return new ResponseEntity<>(
          new SignInResponse("400", "Failed to login. Email or password incorrect.", null, null), HttpStatus.OK);
    }

    // email does not exist.
    log.debug(String.format("Failed to login using email %s by IP %s due to email does not exist in database.", email,
        ipAddress));
    return new ResponseEntity<>(new SignInResponse("400", "Failed to login. Customer does not exist.", null, null),
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
      HttpServletRequest request) throws Exception {
    String email = registerRequest.getEmail();
    String password = registerRequest.getPassword();

    String ipAddress = loginIPAttemptService.getClientIP(request);
    ResponseEntity<RegisterResponse> registerResponse = customerService.create(registerRequest, ipAddress);

    if (registerResponse.getStatusCode() == HttpStatus.CREATED) {
      // Customer customer = customerRepository.findByEmail(registerRequest.getEmail());
      // Auth auth = authRepository.findByEmail(registerRequest.getEmail());
      // securityConfig.configAuth(auth, securityConfig.getAuth(), "USER");
      // authenticateUserAndSetSession(customer, request);

      UserDetails userDetails = customerDetailsService.loadUserByUsername(email);
      final String token = jwtTokenUtil.generateToken(userDetails);

      try {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
      } catch (DisabledException e) {
        throw new Exception("USER_DISABLED", e);
      } catch (BadCredentialsException e) {
        throw new Exception("INVALID_CREDENTIALS", e);
      }

      RegisterResponse response = registerResponse.getBody();
      response.setToken(token);
      return new ResponseEntity<>(response, registerResponse.getStatusCode());
    }
    return new ResponseEntity<>(new RegisterResponse("Failed to create new customer.", null),
        HttpStatus.INTERNAL_SERVER_ERROR);
  }

  public void authenticateUserAndSetSession(Customer customer, HttpServletRequest request) {
    UserDetails user = customerDetailsService.toUserDetails(customer);

    Authentication auth = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());

    SecurityContextHolder.getContext().setAuthentication(auth);
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
      try {
        User user = (User) authentication.getPrincipal();
        return customerRepository.findByEmail(user.getUsername());
      } catch (ClassCastException e) {
        log.debug(
            "Failed to cast authentication.getPrincipal() to User. Generally due to getPrincipal being type String with value \"AnonymousUser\". Most likely because token is not valid or has expired.");
        log.debug(e.getMessage());
        return null;
      }
    }
    return null;
  }

  public ResponseEntity<SignInResponse> getCustomerByToken(@RequestBody UserByTokenRequest userByTokenRequest,
      HttpServletRequest request) throws Exception {
    //     jwtTokenUtil.
    // String email = jwtTokenUtil.getUsernameFromToken(userByTokenRequest.getToken());
    // System.out.println("email: " + email);
    // Customer customer = customerRepository.findByEmail(email);
    Customer customer = getCustomerFromUserObject(SecurityContextHolder.getContext().getAuthentication());

    if (customer == null) {
      return new ResponseEntity<>(
          new SignInResponse("400", "Failed to login by token. Token not correlated with any customer.", null, null),
          HttpStatus.OK);
    }
    return new ResponseEntity<>(new SignInResponse("200", "Logged in by token successfully.", new CustomerDTO(customer),
        userByTokenRequest.getToken()), HttpStatus.OK);
  }
}