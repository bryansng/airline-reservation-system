package dreamwok.reservation.service;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dreamwok.reservation.dto.BookingCreditCardDetailsDTO;
import dreamwok.reservation.dto.CustomerDTO;
import dreamwok.reservation.model.CreditCardDetails;
import dreamwok.reservation.model.Reservation;
import dreamwok.reservation.repository.BookingRepository;
import dreamwok.reservation.repository.CreditCardDetailsRepository;

@Service
public class BookingService {
  @Autowired
  ReservationService reservationService;

  @Autowired
  CreditCardDetailsRepository creditCardDetailsRepository;

  @Autowired
  BookingRepository bookingRepository;

  public Reservation bookReservation(Long flightId, List<CustomerDTO> customers,
      BookingCreditCardDetailsDTO creditCardDetails, HttpServletRequest httpRequest) {
    if (!isValidCreditCardDetails(creditCardDetails)) {
      return null;
    }

    return reservationService.createReservation(flightId, customers, creditCardDetails, httpRequest);
  }

  public Boolean isValidCreditCardDetails(BookingCreditCardDetailsDTO creditCardDetails) {
    Long creditCardDetailsId = creditCardDetails.getId();

    if (creditCardDetailsId == null) {
      // if null, then credit card details not masked.
      return isValidLengthCreditCardDetails(creditCardDetails) && isValidCreditCardDetailsAgainstAPI(creditCardDetails);
    }
    // System.out.println("id not null");

    Optional<CreditCardDetails> realCreditCardDetailsOptional = creditCardDetailsRepository
        .findById(creditCardDetailsId);

    if (!realCreditCardDetailsOptional.isPresent()) {
      // if not present, then credit card details not masked since not in database, therefore not retrieved from database to begin with.
      return isValidLengthCreditCardDetails(creditCardDetails) && isValidCreditCardDetailsAgainstAPI(creditCardDetails);
    }
    // System.out.println("credit card details not from database");

    CreditCardDetails realCreditCardDetails = realCreditCardDetailsOptional.get();
    if (isValidLengthCreditCardDetails(creditCardDetails)
        && isValidCreditCardDetailsInDatabase(creditCardDetails, realCreditCardDetails)
        && isValidCreditCardDetailsAgainstAPI(creditCardDetails, realCreditCardDetails)) {
      return true;
    }
    return false;
  }

  public Boolean isValidLengthCreditCardDetails(BookingCreditCardDetailsDTO creditCardDetails) {
    String cardNum = creditCardDetails.getCardNumber();
    // if (!(cardNum.length() >= 13 && cardNum.length() <= 19
    //     && cardNum.substring(cardNum.length() - 4).equals(realCardNum.substring(cardNum.length() - 4)))) {
    //   return false;
    // }
    if (!(cardNum.length() == 16)) {
      return false;
    }

    String expiryDate = creditCardDetails.getExpiryDate();
    if (!(expiryDate.length() == 5)) {
      return false;
    }

    String nameOnCard = creditCardDetails.getNameOnCard();
    if (!(nameOnCard.length() >= 1)) {
      return false;
    }

    String securityCode = creditCardDetails.getSecurityCode();
    if (!(securityCode.length() == 3)) {
      return false;
    }

    // System.out.println("valid credit card details length");
    return true;
  }

  public Boolean isValidCreditCardDetailsAgainstAPI(BookingCreditCardDetailsDTO creditCardDetails) {
    return true;
  }

  public Boolean isValidCreditCardDetailsAgainstAPI(BookingCreditCardDetailsDTO creditCardDetails,
      CreditCardDetails realCreditCardDetails) {
    // check real against api.
    return true;
  }

  public Boolean isValidCreditCardDetailsInDatabase(BookingCreditCardDetailsDTO creditCardDetails,
      CreditCardDetails realCreditCardDetails) {
    if (creditCardDetails.getCustomerId() != null) {
      Long customerId = creditCardDetails.getCustomerId();
      Long realCustomerId = creditCardDetails.getCustomerId();

      if (!(customerId.equals(realCustomerId))) {
        return false;
      }
    }
    // System.out.println("credit card belongs to correct customer");

    String cardNum = creditCardDetails.getCardNumber();
    String realCardNum = realCreditCardDetails.getCardNumber();
    // if (!(cardNum.length() >= 13 && cardNum.length() <= 19
    //     && cardNum.substring(cardNum.length() - 4).equals(realCardNum.substring(cardNum.length() - 4)))) {
    //   return false;
    // }
    if (!(cardNum.length() == 16
        && cardNum.substring(cardNum.length() - 4).equals(realCardNum.substring(cardNum.length() - 4)))) {
      return false;
    }
    // System.out.println("match credit card num");

    String expiryDate = creditCardDetails.getExpiryDate();
    String realExpiryDate = realCreditCardDetails.getExpiryDate();
    if (!(expiryDate.length() == 5 && expiryDate.equals(realExpiryDate))) {
      return false;
    }
    // System.out.println("match expiry date");

    String nameOnCard = creditCardDetails.getNameOnCard();
    String realNameOnCard = realCreditCardDetails.getNameOnCard();
    if (!(nameOnCard.length() >= 1 && nameOnCard.equals(realNameOnCard))) {
      return false;
    }
    // System.out.println("match name on card");

    String securityCode = creditCardDetails.getSecurityCode();
    String realSecurityCode = realCreditCardDetails.getSecurityCode();
    if (!(securityCode.length() == 3 && securityCode.equals(realSecurityCode))) {
      return false;
    }
    // System.out.println("match security code");

    return true;
  }
}
