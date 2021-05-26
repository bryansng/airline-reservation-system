package dreamwok.reservation.controller;

import java.security.Principal;

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
    public ResponseEntity<CreditCardResponse> getAllCardsByCustomerId(@PathVariable("customerId") Long customerId,
            Principal principal) {
        return customerService.getAllCardsByCustomerId(customerId, principal);
    }

    @RequestMapping(value = "/creditcard/{customerId}/{cardId}", method = RequestMethod.GET)
    public ResponseEntity<GetCreditCardResponse> getCardDetails(@PathVariable("customerId") Long customerId,
            @PathVariable("cardId") Long cardId, Principal principal, HttpServletRequest httpRequest) {
        return customerService.getCardDetails(customerId, cardId, principal, httpRequest);
    }

    @RequestMapping(value = "/creditcard/{customerId}", method = RequestMethod.POST)
    public ResponseEntity<GetCreditCardResponse> insertCardDetails(@PathVariable("customerId") Long customerId,
            @RequestBody CreditCardRequest creditCardRequest, Principal principal, HttpServletRequest httpRequest) {
        return customerService.insertCardDetails(customerId, principal, creditCardRequest, httpRequest);
    }

    @RequestMapping(value = "/creditcard/{customerId}/{cardId}", method = RequestMethod.PUT)
    public ResponseEntity<GetCreditCardResponse> updateCardDetails(@PathVariable("customerId") Long customerId,
            @PathVariable("cardId") Long cardId, Principal principal, @RequestBody CreditCardRequest creditCardRequest,
            HttpServletRequest httpRequest) {
        return customerService.updateCardDetails(customerId, cardId, principal, creditCardRequest, httpRequest);
    }

    @RequestMapping(value = "/creditcard/{customerId}/{cardId}", method = RequestMethod.DELETE)
    public ResponseEntity<GetCreditCardResponse> updateCardDetails(@PathVariable("customerId") Long customerId,
            @PathVariable("cardId") Long cardId, Principal principal, HttpServletRequest httpRequest) {
        return customerService.deleteCardDetails(customerId, cardId, principal, httpRequest);
    }

    /**
     * Customer
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/profile/{customerId}", method = RequestMethod.GET)
    public ResponseEntity<CustomerResponse> getCustomer(@PathVariable("customerId") Long customerId,
            Principal principal) {
        return customerService.getCustomer(customerId, principal);
    }

    // @RequestMapping(value = "/profile", method = RequestMethod.POST)
    // public ResponseEntity<RegisterResponse> createCustomer(@RequestBody CustomerRequest customerRequest) {
    //     return customerService.create(customerRequest);
    // }

    @RequestMapping(value = "/profile/{customerId}", method = RequestMethod.PUT)
    public ResponseEntity<CustomerResponse> updateCustomer(@PathVariable("customerId") Long customerId,
            Principal principal, @RequestBody CustomerRequest customerRequest) {
        return customerService.update(customerId, principal, customerRequest);
    }

    @RequestMapping(value = "/profile/{customerId}", method = RequestMethod.DELETE)
    public ResponseEntity<CustomerResponse> deleteCustomer(@PathVariable("customerId") Long customerId,
            Principal principal, HttpServletRequest httpRequest) {
        return customerService.delete(customerId, principal, httpRequest);
    }

    @RequestMapping(value = "/profile/password/{customerId}", method = RequestMethod.PUT)
    public ResponseEntity<CustomerResponse> updatePassword(@PathVariable("customerId") Long customerId,
            Principal principal, @RequestBody ChangePasswordRequest changePasswordRequest,
            HttpServletRequest httpRequest) {
        return customerService.updatePassword(customerId, principal, changePasswordRequest, httpRequest);
    }
}
