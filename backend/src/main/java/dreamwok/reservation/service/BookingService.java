package dreamwok.reservation.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dreamwok.reservation.dto.BookingCreditCardDetailsDTO;
import dreamwok.reservation.dto.CustomerDTO;
import dreamwok.reservation.model.CreditCardDetails;
import dreamwok.reservation.model.Customer;
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
      BookingCreditCardDetailsDTO creditCardDetails) {
    if (!isValidCreditCardDetails(creditCardDetails)) {
      return null;
    }

    return reservationService.createReservation(flightId, customers, creditCardDetails);
  }

  public Boolean isValidCreditCardDetails(BookingCreditCardDetailsDTO creditCardDetails) {
    Long creditCardDetailsId = creditCardDetails.getId();

    if (creditCardDetailsId == null) {
      // if null, then credit card details not masked.
      return isValidCreditCardDetailsAgainstAPI(creditCardDetails);
    }

    Optional<CreditCardDetails> realCreditCardDetailsOptional = creditCardDetailsRepository
        .findById(creditCardDetailsId);

    if (!realCreditCardDetailsOptional.isPresent()) {
      // if not present, then credit card details not masked since not in database, therefore not retrieved from database to begin with.
      return isValidCreditCardDetailsAgainstAPI(creditCardDetails);
    }

    CreditCardDetails realCreditCardDetails = realCreditCardDetailsOptional.get();
    if (isValidCreditCardDetailsInDatabase(creditCardDetails, realCreditCardDetails)
        && isValidCreditCardDetailsAgainstAPI(creditCardDetails, realCreditCardDetails)) {
      return true;
    }
    return false;
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

    String cardNum = creditCardDetails.getCardNumber();
    String realCardNum = realCreditCardDetails.getCardNumber();
    if (!(cardNum.length() >= 13 && cardNum.length() <= 19
        && cardNum.substring(cardNum.length() - 4).equals(realCardNum.substring(cardNum.length() - 4)))) {
      return false;
    }

    String expiryDate = creditCardDetails.getExpiryDate();
    String realExpiryDate = realCreditCardDetails.getExpiryDate();
    if (!(expiryDate.length() == 5 && expiryDate.equals(realExpiryDate))) {
      return false;
    }

    String nameOnCard = creditCardDetails.getNameOnCard();
    String realNameOnCard = realCreditCardDetails.getNameOnCard();
    if (!(nameOnCard.length() >= 8 && nameOnCard.equals(realNameOnCard))) {
      return false;
    }

    String securityCode = creditCardDetails.getSecurityCode();
    String realSecurityCode = realCreditCardDetails.getSecurityCode();
    if (!(securityCode.length() == 3 && securityCode.equals(realSecurityCode))) {
      return false;
    }

    return true;
  }
}
