package dreamwok.reservation.core.booking.request;

import java.util.List;

import dreamwok.reservation.dto.BookingCreditCardDetailsDTO;
import dreamwok.reservation.dto.CustomerDTO;

public class BookReservationRequest {
  private Long flightId;
  private List<CustomerDTO> customers;
  private BookingCreditCardDetailsDTO creditCardDetails;

  public BookReservationRequest() {
  }

  public Long getFlightId() {
    return this.flightId;
  }

  public void setFlightId(Long flightId) {
    this.flightId = flightId;
  }

  public List<CustomerDTO> getCustomers() {
    return this.customers;
  }

  public void setCustomers(List<CustomerDTO> customers) {
    this.customers = customers;
  }

  public BookingCreditCardDetailsDTO getCreditCardDetails() {
    return this.creditCardDetails;
  }

  public void setCreditCardDetails(BookingCreditCardDetailsDTO creditCardDetails) {
    this.creditCardDetails = creditCardDetails;
  }
}
