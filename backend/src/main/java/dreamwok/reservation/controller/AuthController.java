package dreamwok.reservation.controller;

import dreamwok.reservation.configuration.SecurityConfig;
import dreamwok.reservation.core.auth.request.RegisterRequest;
import dreamwok.reservation.core.auth.request.SignInRequest;
import dreamwok.reservation.core.auth.response.RegisterResponse;
import dreamwok.reservation.core.auth.response.SignInResponse;
import dreamwok.reservation.dto.CustomerDTO;
import dreamwok.reservation.repository.CustomerRepository;
import dreamwok.reservation.repository.AuthRepository;
import dreamwok.reservation.model.Auth;
import dreamwok.reservation.model.Customer;
import dreamwok.reservation.service.AuthService;
import dreamwok.reservation.service.CustomerService;

import java.time.LocalDateTime;

import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class AuthController {
  @Autowired
  AuthService authService;

  @Autowired
  AuthRepository authRepository;

  @Autowired
  CustomerService customerService;

  @Autowired
  CustomerRepository customerRepository;

  @Autowired
  SecurityConfig securityConfig;

  @GetMapping("/cheat/login")
  public ResponseEntity<SignInResponse> autoLogin(@RequestParam(defaultValue = "hong.sng@ucdconnect.ie") String email,
      HttpServletRequest request) {
    Customer customer = customerRepository.findByEmail(email);
    Auth auth = authRepository.findByEmail(email);
    securityConfig.configAuth(auth, securityConfig.getAuth(), "ADMIN");
    authService.authenticateUserAndSetSession(customer, request);
    return new ResponseEntity<>(new SignInResponse("Logged in successfully.", new CustomerDTO(customer)),
        HttpStatus.OK);
  }

  @GetMapping("/cheat/register")
  public ResponseEntity<RegisterResponse> autoRegister(@RequestParam(defaultValue = "d d d d d d d") String fullName,
      @RequestParam(defaultValue = "d@d.d") String email, @RequestParam(defaultValue = "1234") String password,
      HttpServletRequest request) {
    RegisterRequest registerRequest = new RegisterRequest(email, password, "d", "d", "123 Road", "123",
        LocalDateTime.now());
    ResponseEntity<RegisterResponse> registerResponse = customerService.create(registerRequest);

    if (registerResponse.getStatusCode() == HttpStatus.CREATED) {
      Customer customer = customerRepository.findByEmail(email);
      Auth auth = authRepository.findByEmail(email);
      securityConfig.configAuth(auth, securityConfig.getAuth(), "USER");
      authService.authenticateUserAndSetSession(customer, request);
    }

    return registerResponse;
  }

  /* /login POST
    {
        email: String
        password: String
    }
    returns
    {
        customer: Customer object
    } */
  @RequestMapping(value = "/login", method = RequestMethod.POST)
  public ResponseEntity<SignInResponse> loginCustomer(@RequestBody SignInRequest signInRequest,
      HttpServletRequest request) {
    return authService.login(signInRequest, request);
  }

  /* /register POST
    {
        email: String
        password: String
    }
    returns
    {
        customer: Customer object
    } */
  @RequestMapping(value = "/register", method = RequestMethod.POST)
  public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest registerRequest,
      HttpServletRequest request) {
    return authService.register(registerRequest, request);
  }

  /* When creating user, requests needs this customer object:
        customer: {
            email: String
            firstName: String
            lastName: String
            address: String
            phoneNumber: String
        } */

  /* /register DELETE
    {
        customerId: String
    }
    returns
    {
        status: ...
        message: ...
    } */
  @RequestMapping(value = "/register", method = RequestMethod.DELETE)
  public ResponseEntity<RegisterResponse> deleteCustomer(@RequestBody RegisterRequest registerRequest,
      HttpServletRequest request) {
    return authService.register(registerRequest, request);
  }
}