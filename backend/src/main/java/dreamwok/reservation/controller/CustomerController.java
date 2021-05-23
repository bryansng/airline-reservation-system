package dreamwok.reservation.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import dreamwok.reservation.core.creditcard.request.CreditCardRequest;
import dreamwok.reservation.core.creditcard.response.CreditCardResponse;
import dreamwok.reservation.core.creditcard.response.GetCreditCardResponse;
import dreamwok.reservation.core.customer.request.ChangePasswordRequest;
import dreamwok.reservation.core.customer.request.CustomerRequest;
import dreamwok.reservation.core.customer.response.CustomerResponse;
import dreamwok.reservation.service.AuthService;
import dreamwok.reservation.service.CustomerService;

@RestController
@RequestMapping(value = "/customer")
@CrossOrigin
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
    public ResponseEntity<GetCreditCardResponse> getCardDetails(@PathVariable("cardId") Long cardId,
            HttpServletRequest httpRequest) {
        return customerService.getCardDetails(cardId, httpRequest);
    }

    @RequestMapping(value = "/creditcard/{customerId}", method = RequestMethod.POST)
    public ResponseEntity<GetCreditCardResponse> insertCardDetails(@PathVariable("customerId") Long customerId,
            @RequestBody CreditCardRequest creditCardRequest, HttpServletRequest httpRequest) {
        return customerService.insertCardDetails(customerId, creditCardRequest, httpRequest);
    }

    @RequestMapping(value = "/creditcard/{cardId}", method = RequestMethod.PUT)
    public ResponseEntity<GetCreditCardResponse> updateCardDetails(@PathVariable("cardId") Long cardId,
            @RequestBody CreditCardRequest creditCardRequest, HttpServletRequest httpRequest) {
        return customerService.updateCardDetails(cardId, creditCardRequest, httpRequest);
    }

    @RequestMapping(value = "/creditcard/{cardId}", method = RequestMethod.DELETE)
    public ResponseEntity<GetCreditCardResponse> updateCardDetails(@PathVariable("cardId") Long cardId,
            HttpServletRequest httpRequest) {
        return customerService.deleteCardDetails(cardId, httpRequest);
    }

    /**
     * Customer
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/profile/{customerId}", method = RequestMethod.GET)
    public ResponseEntity<CustomerResponse> getCustomer(@PathVariable("customerId") Long customerId) {
        return customerService.getCustomer(customerId);
    }

    // @RequestMapping(value = "/profile", method = RequestMethod.POST)
    // public ResponseEntity<RegisterResponse> createCustomer(@RequestBody CustomerRequest customerRequest) {
    //     return customerService.create(customerRequest);
    // }

    @RequestMapping(value = "/profile/{customerId}", method = RequestMethod.PUT)
    public ResponseEntity<CustomerResponse> updateCustomer(@PathVariable("customerId") Long customerId,
            @RequestBody CustomerRequest customerRequest) {
        return customerService.update(customerId, customerRequest);
    }

    @RequestMapping(value = "/profile/{customerId}", method = RequestMethod.DELETE)
    public ResponseEntity<CustomerResponse> deleteCustomer(@PathVariable("customerId") Long customerId) {
        return customerService.delete(customerId);
    }

    @RequestMapping(value = "/profile/password/{customerId}", method = RequestMethod.PUT)
    public ResponseEntity<CustomerResponse> updatePassword(@PathVariable("customerId") Long customerId,
            @RequestBody ChangePasswordRequest changePasswordRequest, HttpServletRequest httpRequest) {
        return customerService.updatePassword(customerId, changePasswordRequest, httpRequest);
    }
}
