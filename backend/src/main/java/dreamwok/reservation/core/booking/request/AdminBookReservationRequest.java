package dreamwok.reservation.core.booking.request;

import java.util.List;

import dreamwok.reservation.dto.CustomerDTO;

public class AdminBookReservationRequest {
  private Long flightId;
  private List<CustomerDTO> customers;
  private Boolean isPaid = false;

  public AdminBookReservationRequest() {
  }

  public AdminBookReservationRequest(Long flightId, List<CustomerDTO> customers, Boolean isPaid) {
    this.flightId = flightId;
    this.customers = customers;
    this.isPaid = isPaid;
  }

  public AdminBookReservationRequest(Long flightId, List<CustomerDTO> customers) {
    this.flightId = flightId;
    this.customers = customers;
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

  public Boolean getIsPaid() {
    return this.isPaid;
  }

  public void setIsPaid(Boolean isPaid) {
    this.isPaid = isPaid;
  }
}
