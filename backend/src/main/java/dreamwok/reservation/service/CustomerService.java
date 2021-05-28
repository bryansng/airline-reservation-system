package dreamwok.reservation.service;

import java.util.ArrayList;
import dreamwok.reservation.repository.AuthRepository;
import dreamwok.reservation.repository.CreditCardDetailsRepository;
import dreamwok.reservation.repository.CustomerRepository;
import lombok.extern.log4j.Log4j2;
import dreamwok.reservation.model.Auth;
import dreamwok.reservation.model.CreditCardDetails;
import dreamwok.reservation.model.Customer;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import dreamwok.reservation.configuration.SecurityConfig;
import dreamwok.reservation.core.auth.request.RegisterRequest;
import dreamwok.reservation.core.auth.response.RegisterResponse;

import dreamwok.reservation.core.common.CreditCardEncryptor;

import dreamwok.reservation.core.creditcard.request.CreditCardRequest;
import dreamwok.reservation.core.creditcard.response.CreditCardResponse;
import dreamwok.reservation.core.creditcard.response.GetCreditCardResponse;
import dreamwok.reservation.core.customer.request.ChangePasswordRequest;
import dreamwok.reservation.core.customer.request.CustomerRequest;
import dreamwok.reservation.core.customer.response.CustomerResponse;
import dreamwok.reservation.dto.CreditCardDetailsDTO;
import dreamwok.reservation.dto.CustomerDTO;

@Service
@CrossOrigin
@Log4j2
public class CustomerService {
  @Autowired
  CustomerRepository customerRepository;

  @Autowired
  AuthRepository authRepository;

  @Autowired
  CreditCardDetailsRepository creditCardDetailsRepository;

  @Autowired
  LoginIPAttemptService loginIPAttemptService;

  @Autowired
  SecurityConfig securityConfig;

  @Autowired
  CreditCardEncryptor creditCardEncryptor;

  public void save(Customer customer, Auth auth) {
    auth.setCustomer(customer);
    customer.setAuth(auth);

    customerRepository.save(customer);
  }

  public Page<Customer> search(String stringToSearch, int pageNum) {
    return this.search(stringToSearch, pageNum, Common.PAGINATION_ROWS);
  }

  public Page<Customer> search(String stringToSearch, int pageNum, int pageSize) {
    Long id = Common.convertStringToLong(stringToSearch);

    Page<Customer> res = customerRepository
        .findByIdOrFirstNameContainsIgnoreCaseOrLastNameContainsIgnoreCaseOrEmailContainsIgnoreCaseOrPhoneNumContainsOrAddressContainsIgnoreCaseOrTypeIgnoreCaseContains(
            id, stringToSearch, stringToSearch, stringToSearch, stringToSearch, stringToSearch, stringToSearch,
            PageRequest.of(pageNum, pageSize));
    return res;
  }

  public Customer getCustomerById(Long customerId) {
    Optional<Customer> customer = customerRepository.findById(customerId);

    if (!customer.isPresent()) {
      return null;
    }
    return customer.get();
  }

  public Boolean isAuthUserChangingOwnData(Customer customer, Principal principal) {
    Authentication authentication = (Authentication) principal;
    User user = (User) authentication.getPrincipal();

    if (user.getUsername().equals(customer.getId().toString())) {
      // System.out.println("has proper access");
      return true;
    }
    // System.out.println("no proper access");
    return false;
  }

  /**
   * Card
   *
   * @param customerId
   * @param creditCard
   * @return
   * @throws IllegalBlockSizeException
   * @throws BadPaddingException
   * @throws InvalidAlgorithmParameterException
   * @throws NoSuchAlgorithmException
   * @throws NoSuchPaddingException
   * @throws InvalidKeyException
   */
  public ResponseEntity<CreditCardResponse> getAllCardsByCustomerId(Long customerId, Principal principal) {
    Customer customer = getCustomerById(customerId);

    if (customer != null) {
      if (isAuthUserChangingOwnData(customer, principal)) {
        List<CreditCardDetails> cards = creditCardDetailsRepository.findAllById(customerId);

        List<CreditCardDetails> decryptedCards = new ArrayList<>();
        if (cards.size() > 0) {
          for (CreditCardDetails card : cards) {
            CreditCardDetails decrypted = creditCardEncryptor.decryptCard(card);
            decryptedCards.add(decrypted);
          }
        }

        return new ResponseEntity<>(new CreditCardResponse("Found all cards for customer", decryptedCards),
            HttpStatus.OK);
      }
      return new ResponseEntity<>(new CreditCardResponse("Improper access.", null), HttpStatus.BAD_REQUEST);
    }
    return new ResponseEntity<>(new CreditCardResponse("No customer with this id.", null), HttpStatus.NOT_FOUND);
  }

  public ResponseEntity<GetCreditCardResponse> getCardDetails(Long customerId, Long cardId, Principal principal,
      HttpServletRequest httpRequest) {
    Customer customer = getCustomerById(customerId);
    String ipAddress = loginIPAttemptService.getClientIP(httpRequest);
    if (customer != null) {
      if (!isAuthUserChangingOwnData(customer, principal)) {
        log.debug(String.format("Failed to retrieve card id %s by IP %s due to improper access.", cardId, ipAddress));
        return new ResponseEntity<>(new GetCreditCardResponse("Improper access.", null), HttpStatus.BAD_REQUEST);
      }

      Optional<CreditCardDetails> card = creditCardDetailsRepository.findById(cardId);

      if (card.isPresent()) {
        CreditCardDetails decryptedCard = creditCardEncryptor.decryptCard(card.get());

        log.debug(String.format("Successfully retrieved card id %s by IP %s.", cardId, ipAddress));
        return new ResponseEntity<>(
            new GetCreditCardResponse("Found card for customer.", new CreditCardDetailsDTO(decryptedCard)),
            HttpStatus.OK);
      }

      log.debug(String.format("Failed to retrieve card id %s by IP %s due to invalid card id.", cardId, ipAddress));
      return new ResponseEntity<>(new GetCreditCardResponse("No card with this id found", null), HttpStatus.NOT_FOUND);
    }
    log.debug(String.format("Failed to retrieve card id %s by IP %s due to invalid customer id.", cardId, ipAddress));
    return new ResponseEntity<>(new GetCreditCardResponse("No customer with this id found.", null),
        HttpStatus.BAD_REQUEST);
  }

  public ResponseEntity<GetCreditCardResponse> insertCardDetails(Long customerId, Principal principal,
      CreditCardRequest creditCardRequest, HttpServletRequest httpRequest) {
    Customer customer = getCustomerById(customerId);
    String ipAddress = loginIPAttemptService.getClientIP(httpRequest);
    if (customer != null) {

      if (!isAuthUserChangingOwnData(customer, principal)) {
        log.debug(String.format("Failed to add card by IP %s due to improper access.", ipAddress));
        return new ResponseEntity<>(new GetCreditCardResponse("Improper access.", null), HttpStatus.BAD_REQUEST);
      }

      CreditCardRequest ccr = creditCardEncryptor.encryptCard(creditCardRequest);

      CreditCardDetails creditCard = new CreditCardDetails(customerId, ccr);
      creditCard = creditCardDetailsRepository.save(creditCard);
      CreditCardDetails decryptedCard = creditCardEncryptor.decryptCard(creditCard);

      log.debug(String.format("Successfully added card id %s by IP %s.", creditCard.getId(), ipAddress));
      return new ResponseEntity<>(
          new GetCreditCardResponse("Card details inserted.", new CreditCardDetailsDTO(decryptedCard)),
          HttpStatus.CREATED);
    }
    log.debug(String.format("Failed to add card by IP %s due to invalid customer id.", ipAddress));
    return new ResponseEntity<>(new GetCreditCardResponse("No customer with this id found.", null),
        HttpStatus.BAD_REQUEST);
  }

  public ResponseEntity<GetCreditCardResponse> updateCardDetails(Long customerId, Long id, Principal principal,
      CreditCardRequest creditCardRequest, HttpServletRequest httpRequest) {
    Customer customer = getCustomerById(customerId);
    String ipAddress = loginIPAttemptService.getClientIP(httpRequest);
    if (customer != null) {
      if (!isAuthUserChangingOwnData(customer, principal)) {
        log.debug(String.format("Failed to update card id %s by IP %s due to improper access.", id, ipAddress));
        return new ResponseEntity<>(new GetCreditCardResponse("Improper access.", null), HttpStatus.BAD_REQUEST);
      }

      if (creditCardDetailsRepository.existsById(id)) {
        // String cardNumber = creditCardRequest.getCardNumber();
        // if (!creditCardDetailsRepository.existsByCardNumber(cardNumber)) {
        CreditCardDetails currCreditCard = creditCardDetailsRepository.getOne(id);
        currCreditCard.updateCard(creditCardEncryptor.encryptCard(creditCardRequest));
        currCreditCard = creditCardDetailsRepository.save(currCreditCard);
        CreditCardDetails decryptedCard = creditCardEncryptor.decryptCard(currCreditCard);

        log.debug(String.format("Successfully updated card details with id %s by IP %s.", id, ipAddress));
        return new ResponseEntity<>(
            new GetCreditCardResponse("Card details updated", new CreditCardDetailsDTO(decryptedCard)), HttpStatus.OK);
        // }

        // return new ResponseEntity<>(new GetCreditCardResponse("Card number already exists.", null), HttpStatus.CONFLICT);
      }

      log.debug(String.format("Failed to update card id %s by IP %s due to invalid card id.", id, ipAddress));
      return new ResponseEntity<>(new GetCreditCardResponse("No card with this id found", null), HttpStatus.NOT_FOUND);
    }
    log.debug(String.format("Failed to update card id %s by IP %s due to invalid customer id.", id, ipAddress));
    return new ResponseEntity<>(new GetCreditCardResponse("No customer with this id found.", null),
        HttpStatus.BAD_REQUEST);
  }

  public ResponseEntity<GetCreditCardResponse> deleteCardDetails(Long customerId, Long id, Principal principal,
      HttpServletRequest httpRequest) {
    Customer customer = getCustomerById(customerId);
    String ipAddress = loginIPAttemptService.getClientIP(httpRequest);
    if (customer != null) {
      if (!isAuthUserChangingOwnData(customer, principal)) {
        log.debug(String.format("Failed to delete card id %s by IP %s due to improper access.", id, ipAddress));
        return new ResponseEntity<>(new GetCreditCardResponse("Improper access.", null), HttpStatus.BAD_REQUEST);
      }

      if (creditCardDetailsRepository.existsById(id)) {
        creditCardDetailsRepository.deleteById(id);

        log.debug(String.format("Successfully deleted card details with id %s by IP %s.", id, ipAddress));
        return new ResponseEntity<>(new GetCreditCardResponse("Card deleted", null), HttpStatus.OK);
      }

      log.debug(String.format("Failed to delete card id %s by IP %s due to invalid card id.", id, ipAddress));
      return new ResponseEntity<>(new GetCreditCardResponse("No card with this id found", null), HttpStatus.NOT_FOUND);
    }
    log.debug(String.format("Failed to delete card id %s by IP %s due to invalid customer id.", id, ipAddress));
    return new ResponseEntity<>(new GetCreditCardResponse("No customer with this id found.", null),
        HttpStatus.BAD_REQUEST);
  }

  /**
   * Customer
   *
   * @param customerId
   * @param newCustomer
   * @return
   */
  public ResponseEntity<CustomerResponse> getCustomer(Long id, Principal principal) {
    if (customerRepository.existsById(id)) {
      Customer customer = customerRepository.findById(id).get();

      if (!isAuthUserChangingOwnData(customer, principal)) {
        return new ResponseEntity<>(new CustomerResponse("Improper access.", null), HttpStatus.BAD_REQUEST);
      }

      return new ResponseEntity<>(new CustomerResponse("Customer retrieved.", new CustomerDTO(customer)),
          HttpStatus.OK);
      // return new ResponseEntity<>(new CustomerResponse("Customer retrieved.",
      // customer), HttpStatus.OK);
    }

    return new ResponseEntity<>(new CustomerResponse("Customer not found.", null), HttpStatus.NOT_FOUND);
  }

  public ResponseEntity<CustomerResponse> update(Long id, Principal principal, CustomerRequest customerRequest) {
    if (customerRepository.existsById(id)) {
      Customer customer = customerRepository.findById(id).get();
      if (isAuthUserChangingOwnData(customer, principal)) {
        String email = customerRequest.getEmail();
        if (customerRepository.existsByEmail(email)) {
          return new ResponseEntity<>(
              new CustomerResponse("400", "Failed to update. Customer email already used.", null), HttpStatus.OK);
        }

        // update email and new personal details.
        customer.update(customerRequest);
        Auth updatedAuth = customer.getAuth();
        updatedAuth.setEmail(email);
        customer.setAuth(updatedAuth);
        Customer updatedCustomer = customerRepository.save(customer);
        return new ResponseEntity<>(new CustomerResponse("200", "Customer updated", new CustomerDTO(updatedCustomer)),
            HttpStatus.OK);
      }
      return new ResponseEntity<>(new CustomerResponse("400", "Improper access.", null), HttpStatus.OK);
    }
    return new ResponseEntity<>(new CustomerResponse("400", "Failed to update. Customer ID does not exist.", null),
        HttpStatus.OK);
  }

  public ResponseEntity<CustomerResponse> updatePassword(Long id, Principal principal, ChangePasswordRequest request,
      HttpServletRequest httpRequest) {
    String ipAddress = loginIPAttemptService.getClientIP(httpRequest);
    if (customerRepository.existsById(id)) {
      Customer customer = customerRepository.findById(id).get();
      Auth auth = customer.getAuth();

      if (!isAuthUserChangingOwnData(customer, principal)) {
        log.debug(String.format("Failed to change customer password with id %s by IP %s due to improper access.", id,
            ipAddress));
        return new ResponseEntity<>(new CustomerResponse("Improper access.", null), HttpStatus.BAD_REQUEST);
      }

      // if password matches user's.
      // hash new password and update.
      if (auth.getEmail().equals(request.getEmail())
          && securityConfig.getPasswordEncoder().matches(request.getOldPassword(), auth.getHash())) {
        auth.setHash(securityConfig.getPasswordEncoder().encode(request.getNewPassword()));
        customer.setAuth(auth);
        Customer updatedCustomer = customerRepository.save(customer);

        log.debug(String.format("Successfully updated customer password with id %s by IP %s.", id, ipAddress));
        return new ResponseEntity<>(new CustomerResponse("Customer password updated", new CustomerDTO(updatedCustomer)),
            HttpStatus.OK);
      }
      log.debug(String.format("Failed to change customer password with id %s by IP %s due to incorrect password.", id,
          ipAddress));
      return new ResponseEntity<>(new CustomerResponse("Failed to update password. Incorrect password.", null),
          HttpStatus.BAD_REQUEST);
    }
    log.debug(String.format(
        "Failed to change customer password with id %s by IP %s due to customer id does not exist in database.", id,
        ipAddress));
    return new ResponseEntity<>(new CustomerResponse("Failed to update. Customer ID does not exist.", null),
        HttpStatus.BAD_REQUEST);
  }

  public ResponseEntity<RegisterResponse> create(RegisterRequest registerRequest, String ipAddress) {
    String email = registerRequest.getEmail();
    String password = registerRequest.getPassword();

    if (!customerRepository.existsByEmail(email)) {
      Customer customer = new Customer(registerRequest.getEmail(), registerRequest.getFirstName(),
          registerRequest.getLastName(), registerRequest.getAddress(), registerRequest.getPhoneNum());

      Auth auth = new Auth();
      auth.setAll(email, securityConfig.getPasswordEncoder().encode(password));
      customer.setAuth(auth);
      customerRepository.save(customer);

      log.debug(
          String.format("Successful registration for user id %s by IP %s.", customer.getId().toString(), ipAddress));
      return new ResponseEntity<>(new RegisterResponse("User registered successfully.", new CustomerDTO(customer)),
          HttpStatus.CREATED);
    }

    // if exists by email, check if it has an auth object.
    // if not, then this customer has never registered but has booked flights
    // directly/indirectly.
    Customer customer = customerRepository.findByEmail(email);
    if (customer.getAuth() == null) {
      customer.setFirstName(registerRequest.getFirstName());
      customer.setLastName(registerRequest.getLastName());
      customer.setAddress(registerRequest.getAddress());
      customer.setPhoneNum(registerRequest.getPhoneNum());

      Auth auth = new Auth();
      auth.setAll(email, securityConfig.getPasswordEncoder().encode(password));
      customer.setAuth(auth);
      customerRepository.save(customer);

      log.debug(String.format("Successful registration of existing user id %s by IP %s.", customer.getId().toString(),
          ipAddress));
      return new ResponseEntity<>(new RegisterResponse("User registered successfully.", new CustomerDTO(customer)),
          HttpStatus.CREATED);
    }

    // runs if exists by email and auth object exists.
    log.debug(String.format("Failed to register with email %s by IP %s due to email and auth existing in database.",
        email, ipAddress));
    return new ResponseEntity<>(new RegisterResponse("Failed to create. Customer email already exists.", null),
        HttpStatus.BAD_REQUEST);
  }

  public ResponseEntity<CustomerResponse> delete(Long id, Principal principal, HttpServletRequest httpRequest) {
    String ipAddress = loginIPAttemptService.getClientIP(httpRequest);
    Optional<Customer> customerOptional = customerRepository.findById(id);

    if (customerOptional.isPresent()) {
      Customer customer = customerOptional.get();

      if (!isAuthUserChangingOwnData(customer, principal)) {
        return new ResponseEntity<>(new CustomerResponse("Improper access.", null), HttpStatus.BAD_REQUEST);
      }

      // remove auth from authRepo.
      // remove auth from customer.
      Auth auth = customer.getAuth();
      customer.setAuth(null);
      authRepository.deleteById(auth.getId());
      // authRepository.deleteByEmail(auth.getEmail());

      log.debug(String.format("Successfully deleted customer with id %s by IP %s.", id, ipAddress));
      return new ResponseEntity<>(new CustomerResponse("Deleted successfully.", new CustomerDTO(customer)),
          HttpStatus.OK);
    }
    log.debug(String.format(
        "Failed to delete customer with id %s by IP %s due to customer ID not existing in database.", id, ipAddress));
    return new ResponseEntity<>(new CustomerResponse("Failed to delete. Customer ID does not exist.", null),
        HttpStatus.BAD_REQUEST);
  }

  public Customer createCustomer(Auth auth) {
    Customer customer = new Customer();
    customer.setEmail(auth.getEmail());
    customer.setRoles("USER"); // set as ROLE_USER by default.
    return customer;
  }

  /**
   * Auxiliary methods
   *
   * @param arr
   */
  public void printMe(List<Customer> arr) {
    System.out.println("\n\nPrinting search result:");
    for (Customer customer : arr) {
      System.out.println(customer);
    }
  }

  public void printAll() {
    System.out.println("\n\nPrinting all:");
    for (Customer customer : customerRepository.findAll()) {
      System.out.println(customer);
    }
  }
}