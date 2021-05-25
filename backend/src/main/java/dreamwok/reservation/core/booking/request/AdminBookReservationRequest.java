package dreamwok.reservation.core.booking.request;

import java.util.List;

import dreamwok.reservation.dto.CustomerDTO;

public class AdminBookReservationRequest {
  private Long flightId;
  private List<CustomerDTO> customers;

  public AdminBookReservationRequest() {
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
}
