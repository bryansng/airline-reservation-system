package dreamwok.reservation.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import dreamwok.reservation.core.booking.request.BookReservationRequest;
import dreamwok.reservation.core.booking.response.BookReservationResponse;
import dreamwok.reservation.dto.ReservationDTO;
import dreamwok.reservation.model.Reservation;
import dreamwok.reservation.service.BookingService;
import dreamwok.reservation.service.LoginIPAttemptService;
import lombok.extern.log4j.Log4j2;

@RestController
@CrossOrigin
@Log4j2
public class BookingController {
  @Autowired
  BookingService bookingService;

  @Autowired
  LoginIPAttemptService loginIPAttemptService;

  /* /book POST
  {
    flightId: String
    customers: List<Customer> [
        {
            email: String
            firstName: String
            lastName: String
            address: String
            mobileNumber: String
        }
    ]
    creditCardDetails: <CreditCardDetails> {
        creditCardId: String (required to unmask the saved credit card details to retrieve the full card number from database) (this is null/empty for guests and is required when executive card member use a saved card)
        nameOnCard: String
        cardNumber: String
        expiryDate: String
        securityCode: String
    }
  }
  returns
  {
    reservation: Reservation object
  } */
  @RequestMapping(value = "/book", method = RequestMethod.POST)
  public ResponseEntity<BookReservationResponse> bookReservation(@RequestBody BookReservationRequest request,
      HttpServletRequest httpRequest) {
    String ipAddress = loginIPAttemptService.getClientIP(httpRequest);
    Reservation reservation = bookingService.bookReservation(request.getFlightId(), request.getCustomers(),
        request.getCreditCardDetails(), httpRequest);

    if (reservation == null) {
      if (request.getCustomers().size() > 0) {
        log.debug(String.format(
            "Failed to create reservation for user with email %s by IP %s due to incorrect/invalid credit card credentials.",
            request.getCustomers().get(0).getEmail(), ipAddress));
      } else {
        log.debug(String.format(
            "Failed to create reservation for invalid number of users (expected at least 1) by IP %s due to incorrect/invalid credit card credentials.",
            ipAddress));
      }
      return new ResponseEntity<>(new BookReservationResponse("Incorrect/invalid credit card credentials.", null),
          HttpStatus.BAD_REQUEST);
    }
    ReservationDTO reservationDTO = new ReservationDTO(reservation);
    log.debug(String.format("Successfully created reservation with id %s for user with email %s or id %s by IP %s.",
        reservation.getId(), reservation.getCustomer().getEmail(), reservation.getCustomer().getId(), ipAddress));
    return new ResponseEntity<>(new BookReservationResponse("Reservation created successfully.", reservationDTO),
        HttpStatus.CREATED);
  }
}
