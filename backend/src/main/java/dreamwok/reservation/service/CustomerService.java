package dreamwok.reservation.service;

import dreamwok.reservation.repository.CreditCardRepository;
import dreamwok.reservation.repository.CustomerRepository;
import dreamwok.reservation.model.Auth;
import dreamwok.reservation.model.CreditCard;
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
import dreamwok.reservation.core.creditcard.request.CreditCardRequest;
import dreamwok.reservation.core.customer.response.CustomerResponse;

@Service
public class CustomerService {
    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    CreditCardRepository creditCardReposistory;

    @Autowired
    SecurityConfig securityConfig;

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
                .findByIdOrFullNameContainsIgnoreCaseOrEmailContainsIgnoreCaseOrMobileNumberContainsOrAddressContainsIgnoreCaseOrTypeIgnoreCaseContains(
                        id, stringToSearch, stringToSearch, stringToSearch, stringToSearch, stringToSearch,
                        PageRequest.of(pageNum, pageSize));
        return res;
    }

    public ResponseEntity<String> insertCardDetails(String customerId, CreditCard creditCard) {
        creditCardReposistory.save(creditCard);

        return new ResponseEntity<>("Detail inserted", HttpStatus.CREATED);
    }

    public ResponseEntity<String> updateCardDetails(String stringId, CreditCardRequest creditCardRequest) {
        Long id = Common.convertStringToLong(stringId);

        if (creditCardReposistory.existsById(id)) {
            CreditCard currCreditCard = creditCardReposistory.getOne(id);
            currCreditCard.updateCard(creditCardRequest);
            creditCardReposistory.save(currCreditCard);

            return new ResponseEntity<>("Card deleted", HttpStatus.OK);
        }

        return new ResponseEntity<>("Detail updated", HttpStatus.CREATED);
    }

    public ResponseEntity<String> deleteCardDetails(String stringId) {
        Long id = Common.convertStringToLong(stringId);

        if (creditCardReposistory.existsById(id)) {
            creditCardReposistory.deleteById(id);

            return new ResponseEntity<>("Card deleted", HttpStatus.OK);
        }
        return new ResponseEntity<>("Card does not exist", HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<CustomerResponse> update(String customerId, Customer newCustomer) {
        long id = Common.convertStringToLong(customerId);
        if (customerRepository.existsById(id)) {
            Customer currCustomer = customerRepository.getOne(id);
            currCustomer.setAll(newCustomer);
            customerRepository.save(currCustomer);
            return new ResponseEntity<>(new CustomerResponse("Customer updated", newCustomer), HttpStatus.OK);
        }
        return new ResponseEntity<>(new CustomerResponse("Failed to update. Customer ID does not exist.", null),
                HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<RegisterResponse> create(Customer customer) {
        String email = customer.getEmail();
        String password = "";
        if (!customerRepository.existsByEmail(email)) {
            Auth auth = new Auth();
            auth.setAll(email, securityConfig.getPasswordEncoder().encode(password));
            customer.setAuth(auth);
            customerRepository.save(customer);
            return new ResponseEntity<>(new RegisterResponse("User registered successfully.", customer),
                    HttpStatus.CREATED);
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

    public ResponseEntity<CustomerResponse> delete(String stringId) {
        Long id = Common.convertStringToLong(stringId);

        if (customerRepository.existsById(id)) {
            Optional<Customer> optionalCustomer = customerRepository.findById(id);
            customerRepository.deleteById(id);

            Customer customer = optionalCustomer.isPresent() ? optionalCustomer.get() : null;

            return new ResponseEntity<>(new CustomerResponse("Deleted successfully.", customer), HttpStatus.OK);
        }
        return new ResponseEntity<>(new CustomerResponse("Failed to delete. Customer ID does not exist.", null),
                HttpStatus.BAD_REQUEST);
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