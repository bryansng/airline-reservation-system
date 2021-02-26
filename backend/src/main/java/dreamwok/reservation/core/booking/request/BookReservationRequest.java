package dreamwok.reservation.core.booking.request;

import java.util.List;

import dreamwok.reservation.model.CreditCardDetails;
import dreamwok.reservation.model.Customer;

public class BookReservationRequest {
  private Long flightId;
  private List<Customer> customers;
  private CreditCardDetails creditCardDetails;

  public BookReservationRequest() {
  }

  public Long getFlightId() {
    return this.flightId;
  }

  public void setFlightId(Long flightId) {
    this.flightId = flightId;
  }

  public List<Customer> getCustomers() {
    return this.customers;
  }

  public void setCustomers(List<Customer> customers) {
    this.customers = customers;
  }

  public CreditCardDetails getCreditCardDetails() {
    return this.creditCardDetails;
  }

  public void setCreditCardDetails(CreditCardDetails creditCardDetails) {
    this.creditCardDetails = creditCardDetails;
  }
}
