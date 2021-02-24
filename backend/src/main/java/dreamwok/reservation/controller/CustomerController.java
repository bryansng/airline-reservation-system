package dreamwok.reservation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import dreamwok.reservation.core.auth.response.RegisterResponse;
import dreamwok.reservation.core.creditcard.request.CreditCardRequest;
import dreamwok.reservation.core.customer.response.CustomerResponse;
import dreamwok.reservation.model.CreditCard;
import dreamwok.reservation.model.Customer;
import dreamwok.reservation.service.AuthService;
import dreamwok.reservation.service.CustomerService;

@RestController
@RequestMapping(value = "/customer")
public class CustomerController {
    @Autowired
    AuthService authService;

    @Autowired
    CustomerService customerService;

    @RequestMapping(value = "/creditcard{customerId}", method = RequestMethod.POST)
    public ResponseEntity<String> insertCardDetails(@PathVariable("customerId") String customerId,
            @RequestBody CreditCard creditCard) {
        return customerService.insertCardDetails(customerId, creditCard);
    }

    @RequestMapping(value = "/creditcard{cardId}", method = RequestMethod.PUT)
    public ResponseEntity<String> updateCardDetails(@PathVariable("customerId") String cardId,
            @RequestBody CreditCardRequest creditCardRequest) {
        return customerService.updateCardDetails(cardId, creditCardRequest);
    }

    @RequestMapping(value = "/creditcard{cardId}", method = RequestMethod.DELETE)
    public ResponseEntity<String> updateCardDetails(@PathVariable("customerId") String cardId) {
        return customerService.deleteCardDetails(cardId);
    }

    @RequestMapping(value = "/profile", method = RequestMethod.POST)
    public ResponseEntity<RegisterResponse> createCustomer(@RequestBody Customer customer) {
        return customerService.create(customer);
    }

    @RequestMapping(value = "/profile/{customerId}", method = RequestMethod.PUT)
    public ResponseEntity<CustomerResponse> updateCustomer(@PathVariable("customerId") String customerId,
            @RequestBody Customer customer) {
        return customerService.update(customerId, customer);
    }

    @RequestMapping(value = "/profile/{customerId}", method = RequestMethod.DELETE)
    public ResponseEntity<CustomerResponse> deleteCustomer(@PathVariable("customerId") String customerId) {
        return customerService.delete(customerId);
    }
}
