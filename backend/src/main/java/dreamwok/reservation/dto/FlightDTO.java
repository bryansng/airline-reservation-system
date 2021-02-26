package dreamwok.reservation.dto;

import dreamwok.reservation.model.Flight;

public class FlightDTO {
  private Long id;
  private Double flightPrice;

  public FlightDTO(Flight flight) {
    this.id = flight.getId();
    this.flightPrice = flight.getFlightPrice();
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Double getFlightPrice() {
    return flightPrice;
  }

  public void setFlightPrice(Double flightPrice) {
    this.flightPrice = flightPrice;
  }
}
