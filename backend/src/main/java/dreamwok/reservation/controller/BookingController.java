package dreamwok.reservation.controller;

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

@RestController
@CrossOrigin
public class BookingController {
  @Autowired
  BookingService bookingService;

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
  public ResponseEntity<BookReservationResponse> bookReservation(@RequestBody BookReservationRequest request) {
    Reservation reservation = bookingService.bookReservation(request.getFlightId(), request.getCustomers(),
        request.getCreditCardDetails());

    if (reservation == null) {
      return new ResponseEntity<>(
          new BookReservationResponse("Invalid credit card credentials or Invalid flight id.", null),
          HttpStatus.BAD_REQUEST);
    }

    ReservationDTO reservationDTO = new ReservationDTO(reservation);
    return new ResponseEntity<>(new BookReservationResponse("Reservation created successfully.", reservationDTO),
        HttpStatus.CREATED);
  }
}
