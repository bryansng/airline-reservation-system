package dreamwok.reservation.service;

import dreamwok.reservation.repository.CreditCardDetailsRepository;
import dreamwok.reservation.repository.CustomerRepository;
import dreamwok.reservation.model.Auth;
import dreamwok.reservation.model.CreditCardDetails;
import dreamwok.reservation.model.Customer;

import java.util.ArrayList;
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
import dreamwok.reservation.core.creditcard.response.CreditCardResponse;
import dreamwok.reservation.core.customer.request.CustomerRequest;
import dreamwok.reservation.core.customer.response.CustomerResponse;
import dreamwok.reservation.dto.CreditCardDetailsDTO;
import dreamwok.reservation.dto.CustomerDTO;

@Service
public class CustomerService {
    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    CreditCardDetailsRepository creditCardDetailsRepository;

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
                .findByIdOrFirstNameContainsIgnoreCaseOrLastNameContainsIgnoreCaseOrEmailContainsIgnoreCaseOrPhoneNumContainsOrAddressContainsIgnoreCaseOrTypeIgnoreCaseContains(
                        id, stringToSearch, stringToSearch, stringToSearch, stringToSearch, stringToSearch,
                        stringToSearch, PageRequest.of(pageNum, pageSize));
        return res;
    }

    public Customer getCustomerById(Long customerId) {
        Optional<Customer> customer = customerRepository.findById(customerId);

        if (!customer.isPresent()) {
            return null;
        }
        return customer.get();
    }

    /**
     * Card
     *
     * @param customerId
     * @param creditCard
     * @return
     */

    public ResponseEntity<CreditCardResponse> getAllCardsByCustomerId(Long customerId) {
        List<CreditCardDetails> cards = new ArrayList<>();

        Optional<Customer> customer = customerRepository.findById(customerId);

        if (customer.isPresent()) {
            cards = customer.get().getCreditCardDetails();
        }

        List<CreditCardDetailsDTO> cardsDTO = new ArrayList<>();

        for (CreditCardDetails card : cards) {
            CreditCardDetailsDTO cctDTO = new CreditCardDetailsDTO(card);
            cardsDTO.add(cctDTO);
        }

        return new ResponseEntity<>(new CreditCardResponse("Found all cards for customer", cardsDTO), HttpStatus.OK);
    }

    public ResponseEntity<CreditCardResponse> getCardDetails(Long cardId) {
        Optional<CreditCardDetails> card = creditCardDetailsRepository.findById(cardId);

        if (card.isPresent()) {
            CreditCardDetailsDTO cctDTO = new CreditCardDetailsDTO(card.get());
            List<CreditCardDetailsDTO> cards = new ArrayList<>();
            cards.add(cctDTO);

            return new ResponseEntity<>(new CreditCardResponse("Found card for customer", cards), HttpStatus.OK);
        }

        return new ResponseEntity<>(new CreditCardResponse("No cards found", null), HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<String> insertCardDetails(Long customerId, CreditCardRequest creditCardRequest) {
        String cardNumber = creditCardRequest.getCardNumber();

        Optional<CreditCardDetails> card = creditCardDetailsRepository.findByCardNumber(cardNumber);

        if (!card.isPresent()) {
            Customer customer = customerRepository.getOne(customerId);
            CreditCardDetails creditCard = new CreditCardDetails(customer, creditCardRequest);
            creditCardDetailsRepository.save(creditCard);

            return new ResponseEntity<>("Card details inserted.", HttpStatus.CREATED);
        }

        return new ResponseEntity<>("Card exists.", HttpStatus.CONFLICT);
    }

    public ResponseEntity<String> updateCardDetails(Long id, CreditCardRequest creditCardRequest) {
        if (creditCardDetailsRepository.existsById(id)) {
            CreditCardDetails currCreditCard = creditCardDetailsRepository.getOne(id);
            currCreditCard.updateCard(creditCardRequest);
            creditCardDetailsRepository.save(currCreditCard);

            return new ResponseEntity<>("Detail updated", HttpStatus.OK);
        }

        return new ResponseEntity<>("Card does not exist", HttpStatus.CREATED);
    }

    public ResponseEntity<String> deleteCardDetails(Long id) {
        if (creditCardDetailsRepository.existsById(id)) {
            creditCardDetailsRepository.deleteById(id);

            return new ResponseEntity<>("Card deleted", HttpStatus.OK);
        }
        return new ResponseEntity<>("Card does not exist", HttpStatus.BAD_REQUEST);
    }

    /**
     * Customer
     *
     * @param customerId
     * @param newCustomer
     * @return
     */
    public ResponseEntity<CustomerResponse> getCustomer(Long id) {
        Optional<Customer> customer = customerRepository.findById(id);

        if (customer.isPresent()) {
            CustomerDTO customerDTO = new CustomerDTO(customer.get());
            return new ResponseEntity<>(new CustomerResponse("Customer retrieved.", customerDTO), HttpStatus.FOUND);
        }

        return new ResponseEntity<>(new CustomerResponse("Customer not found.", null), HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<CustomerResponse> update(Long id, CustomerRequest customerRequest) {
        Optional<Customer> customer = customerRepository.findById(id);

        if (customer.isPresent()) {
            Customer currCustomer = customer.get();
            currCustomer.update(customerRequest);
            Customer newCustomer = customerRepository.save(currCustomer);
            CustomerDTO customerDTO = new CustomerDTO(newCustomer);
            return new ResponseEntity<>(new CustomerResponse("Customer updated", customerDTO), HttpStatus.OK);
        }

        return new ResponseEntity<>(new CustomerResponse("Failed to update. Customer ID does not exist.", null),
                HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<RegisterResponse> create(CustomerRequest customerRequest) {
        String email = customerRequest.getEmail();
        String password = "pass";
        if (!customerRepository.existsByEmail(email)) {
            Customer customer = new Customer(customerRequest, "member");
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

    public ResponseEntity<CustomerResponse> delete(Long id) {
        Optional<Customer> optionalCustomer = customerRepository.findById(id);
        customerRepository.deleteById(id);

        if (optionalCustomer.isPresent()) {
            CustomerDTO customerDTO = new CustomerDTO(optionalCustomer.get());

            return new ResponseEntity<>(new CustomerResponse("Deleted successfully.", customerDTO), HttpStatus.OK);
        }

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