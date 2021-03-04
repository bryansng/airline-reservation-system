package dreamwok.reservation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import dreamwok.reservation.core.auth.response.RegisterResponse;
import dreamwok.reservation.core.creditcard.request.CreditCardRequest;
import dreamwok.reservation.core.creditcard.response.CreditCardResponse;
import dreamwok.reservation.core.customer.request.CustomerRequest;
import dreamwok.reservation.core.customer.response.CustomerResponse;
import dreamwok.reservation.service.AuthService;
import dreamwok.reservation.service.CustomerService;

@RestController
@CrossOrigin
@RequestMapping(value = "/customer")
public class CustomerController {
    @Autowired
    AuthService authService;

    @Autowired
    CustomerService customerService;

    /**
     * Card
     *
     * @param customerId
     * @return
     */
    @RequestMapping(value = "/creditcard/all/{customerId}", method = RequestMethod.GET)
    public ResponseEntity<CreditCardResponse> getAllCardsByCustomerId(@PathVariable("customerId") Long customerId) {
        return customerService.getAllCardsByCustomerId(customerId);
    }

    @RequestMapping(value = "/creditcard/{cardId}", method = RequestMethod.GET)
    public ResponseEntity<CreditCardResponse> getCardDetails(@PathVariable("cardId") Long cardId) {
        return customerService.getCardDetails(cardId);
    }

    @RequestMapping(value = "/creditcard/{customerId}", method = RequestMethod.POST)
    public ResponseEntity<String> insertCardDetails(@PathVariable("customerId") Long customerId,
            @RequestBody CreditCardRequest creditCardRequest) {
        return customerService.insertCardDetails(customerId, creditCardRequest);
    }

    @RequestMapping(value = "/creditcard/{cardId}", method = RequestMethod.PUT)
    public ResponseEntity<String> updateCardDetails(@PathVariable("cardId") Long cardId,
            @RequestBody CreditCardRequest creditCardRequest) {
        return customerService.updateCardDetails(cardId, creditCardRequest);
    }

    @RequestMapping(value = "/creditcard/{cardId}", method = RequestMethod.DELETE)
    public ResponseEntity<String> updateCardDetails(@PathVariable("cardId") Long cardId) {
        return customerService.deleteCardDetails(cardId);
    }

    /**
     * Customer
     *
     * @param customerRequest
     * @return
     */
    @RequestMapping(value = "/profile/{customerId}", method = RequestMethod.GET)
    public ResponseEntity<CustomerResponse> getCustomer(@PathVariable("customerId") Long customerId) {
        return customerService.getCustomer(customerId);
    }

    @RequestMapping(value = "/profile", method = RequestMethod.POST)
    public ResponseEntity<RegisterResponse> createCustomer(@RequestBody CustomerRequest customerRequest) {
        return customerService.create(customerRequest);
    }

    @RequestMapping(value = "/profile/{customerId}", method = RequestMethod.PUT)
    public ResponseEntity<CustomerResponse> updateCustomer(@PathVariable("customerId") Long customerId,
            @RequestBody CustomerRequest customerRequest) {
        return customerService.update(customerId, customerRequest);
    }

    @RequestMapping(value = "/profile/{customerId}", method = RequestMethod.DELETE)
    public ResponseEntity<CustomerResponse> deleteCustomer(@PathVariable("customerId") Long customerId) {
        return customerService.delete(customerId);
    }
}
