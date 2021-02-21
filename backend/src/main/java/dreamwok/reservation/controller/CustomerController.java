package dreamwok.reservation.controller;

import dreamwok.reservation.repository.CustomerRepository;
import dreamwok.reservation.service.CustomerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import dreamwok.reservation.service.AuthService;

@RestController
public class CustomerController {
  @Autowired
  AuthService authService;

  @Autowired
  CustomerService customerService;

  @Autowired
  CustomerRepository customerRepository;
}
