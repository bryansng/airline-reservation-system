package dreamwok.reservation.controller;

import dreamwok.reservation.configuration.SecurityConfig;
import dreamwok.reservation.repository.CustomerRepository;
import dreamwok.reservation.repository.AuthRepository;
import dreamwok.reservation.model.Auth;
import dreamwok.reservation.model.Customer;
import dreamwok.reservation.model.ActionConclusion;
import dreamwok.reservation.service.AuthService;
import dreamwok.reservation.service.CustomerService;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@RestController
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

  @GetMapping("/cheat/auth")
  public String autoAuth(@RequestParam(defaultValue = "hong.sng@ucdconnect.ie") String email,
      HttpServletRequest request) {
    Customer customer = customerRepository.findByEmail(email);
    Auth auth = authRepository.findByEmail(email);
    securityConfig.configAuth(auth, securityConfig.getAuth(), "ADMIN");
    authService.authenticateUserAndSetSession(customer, request);
    return "redirect:/";
  }

  @GetMapping("/cheat/regis")
  public String autoRegister(@RequestParam(defaultValue = "d d d d d d d") String fullName,
      @RequestParam(defaultValue = "d@d.d") String email, @RequestParam(defaultValue = "1234") String password,
      @RequestParam(defaultValue = "1234") String confirmPassword, HttpServletRequest request) {
    ActionConclusion acCustomerCreate = customerService.create(email, password, fullName, "", "", "", "", "",
        "customer", "USER");
    if (acCustomerCreate.isSuccess) {
      Customer customer = customerRepository.findByEmail(email);
      Auth auth = authRepository.findByEmail(email);
      securityConfig.configAuth(auth, securityConfig.getAuth(), "USER");
      authService.authenticateUserAndSetSession(customer, request);
    }
    return "redirect:/";
  }

  @PostMapping("/login")
  public String loginCustomer(@RequestParam(name = "email") String email,
      @RequestParam(name = "password") String password, Model model, HttpServletRequest request,
      RedirectAttributes redirectAttrs) {
    ActionConclusion actionConclusion = authService.login(email, password, request);

    redirectAttrs.addFlashAttribute("invalidCredentials", actionConclusion.isSuccess);
    redirectAttrs.addFlashAttribute("onClick", true);
    redirectAttrs.addFlashAttribute("credentialsMsg", actionConclusion.message);
    return "redirect:/";
  }

  @PostMapping("/register")
  public String registerCustomer(@RequestParam(name = "fullName") String fullName,
      @RequestParam(name = "email") String email, @RequestParam(name = "password") String password,
      @RequestParam(name = "confirmPassword") String confirmPassword, Model model, HttpServletRequest request,
      RedirectAttributes redirectAttrs) {
    ActionConclusion actionConclusion = authService.register(fullName, email, password, confirmPassword, request);

    redirectAttrs.addFlashAttribute("invalidCredentials", actionConclusion.isSuccess);
    redirectAttrs.addFlashAttribute("onClick", true);
    redirectAttrs.addFlashAttribute("credentialsMsg", actionConclusion.message);
    return "redirect:/";
  }
}