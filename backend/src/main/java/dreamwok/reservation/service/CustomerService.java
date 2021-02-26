package dreamwok.reservation.service;

import dreamwok.reservation.repository.CustomerRepository;
import dreamwok.reservation.model.Auth;
import dreamwok.reservation.model.ActionConclusion;
import dreamwok.reservation.model.Customer;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import dreamwok.reservation.configuration.SecurityConfig;
import dreamwok.reservation.core.auth.response.RegisterResponse;

@Service
public class CustomerService {
  @Autowired
  CustomerRepository customerRepository;

  @Autowired
  SecurityConfig securityConfig;

  public void save(Customer customer, Auth auth) {
    auth.setCustomer(customer);
    customer.setAuth(auth);

    customerRepository.save(customer);
  }

  public Customer getCustomerById(Long customerId) {
    Optional<Customer> customer = customerRepository.findById(customerId);

    if (!customer.isPresent()) {
      return null;
    }
    return customer.get();
  }

  public Page<Customer> search(String stringToSearch, int pageNum) {
    return this.search(stringToSearch, pageNum, Common.PAGINATION_ROWS);
  }

  public Page<Customer> search(String stringToSearch, int pageNum, int pageSize) {
    Long id = Common.convertStringToLong(stringToSearch);

    Page<Customer> res = customerRepository
        .findByIdOrFullNameContainsIgnoreCaseOrEmailContainsIgnoreCaseOrMobileNumberContainsOrAddressContainsIgnoreCaseOrTypeIgnoreCaseContains(
            id, stringToSearch, stringToSearch, stringToSearch, stringToSearch, stringToSearch,
            PageRequest.of(pageNum, pageSize));
    return res;
  }

  public ActionConclusion update(String stringId, String email, String fullName, String mobileNumber, String address,
      String website, String bornOn, String type) {
    Long id = Common.convertStringToLong(stringId);

    if (customerRepository.existsById(id)) {
      Customer customer = customerRepository.getOne(id);
      customer.setAll(email, fullName, mobileNumber, address, bornOn, type);
      customerRepository.save(customer);
      return new ActionConclusion(true, "Updated successfully.");
    }
    return new ActionConclusion(false, "Failed to update. Customer ID does not exist.");
  }

  public ResponseEntity<RegisterResponse> create(String email, String password, String fullName, String mobileNumber,
      String address, String bornOn, String type, String roles) {
    if (!customerRepository.existsByEmail(email)) {
      Customer customer = new Customer();
      Auth auth = new Auth();
      auth.setAll(email, securityConfig.getPasswordEncoder().encode(password));
      customer.setAll(email, fullName, mobileNumber, address, bornOn, type, auth);
      customerRepository.save(customer);
      return new ResponseEntity<>(new RegisterResponse("User registered successfully.", customer), HttpStatus.CREATED);
    }
    return new ResponseEntity<>(new RegisterResponse("Failed to create. Customer email already exists.", null),
        HttpStatus.BAD_REQUEST);
  }

  public Customer createCustomer(Auth auth) {
    Customer customer = new Customer();
    customer.setEmail(auth.getEmail());
    customer.setRoles("USER"); // set as ROLE_USER by default.
    return customer;
  }

  public ActionConclusion delete(String stringId) {
    Long id = Common.convertStringToLong(stringId);

    if (customerRepository.existsById(id)) {
      customerRepository.deleteById(id);
      return new ActionConclusion(true, "Deleted successfully.");
    }
    return new ActionConclusion(false, "Failed to delete. Customer ID does not exist.");
  }

  public void printMe(List<Customer> arr) {
    System.out.println("\n\nPrinting search result:");
    for (Customer customer : arr) {
      System.out.println(customer);
    }
    ;
  }

  public void printAll() {
    System.out.println("\n\nPrinting all:");
    for (Customer customer : customerRepository.findAll()) {
      System.out.println(customer);
    }
    ;
  }
}