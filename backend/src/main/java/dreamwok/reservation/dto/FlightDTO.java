package dreamwok.reservation.dto;

import java.time.LocalDateTime;

import dreamwok.reservation.model.Flight;

public class FlightDTO {
  private Long id;
  private String flightName;
  private String departureAirport;
  private String arrivalAirport;
  private LocalDateTime departureDateTime;
  private LocalDateTime arrivalDateTime;
  private Double flightPrice;
  private Integer numOfSeats;

  public FlightDTO(Flight flight) {
    this.id = flight.getId();
    this.flightName = flight.getFlightName();
    this.departureAirport = flight.getDepartureAirport();
    this.arrivalAirport = flight.getArrivalAirport();
    this.departureDateTime = flight.getDepartureDateTime();
    this.arrivalDateTime = flight.getArrivalDateTime();
    this.flightPrice = flight.getFlightPrice();
    this.numOfSeats = flight.getNumOfSeats();
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getFlightName() {
    return this.flightName;
  }

  public void setFlightName(String flightName) {
    this.flightName = flightName;
  }

  public String getDepartureAirport() {
    return this.departureAirport;
  }

  public void setDepartureAirport(String departureAirport) {
    this.departureAirport = departureAirport;
  }

  public String getArrivalAirport() {
    return this.arrivalAirport;
  }

  public void setArrivalAirport(String arrivalAirport) {
    this.arrivalAirport = arrivalAirport;
  }

  public LocalDateTime getDepartureDateTime() {
    return this.departureDateTime;
  }

  public void setDepartureDateTime(LocalDateTime departureDateTime) {
    this.departureDateTime = departureDateTime;
  }

  public LocalDateTime getArrivalDateTime() {
    return this.arrivalDateTime;
  }

  public void setArrivalDateTime(LocalDateTime arrivalDateTime) {
    this.arrivalDateTime = arrivalDateTime;
  }

  public Double getFlightPrice() {
    return flightPrice;
  }

  public void setFlightPrice(Double flightPrice) {
    this.flightPrice = flightPrice;
  }

  public Integer getNumOfSeats() {
    return this.numOfSeats;
  }

  public void setNumOfSeats(Integer numOfSeats) {
    this.numOfSeats = numOfSeats;
  }
}
