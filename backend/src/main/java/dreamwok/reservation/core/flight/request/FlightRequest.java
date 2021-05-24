package dreamwok.reservation.core.flight.request;

import java.time.LocalDateTime;

import dreamwok.reservation.service.Common;

public class FlightRequest {
  private String flightName;
  private String departureAirport;
  private String arrivalAirport;
  private LocalDateTime departureDateTime;
  private LocalDateTime arrivalDateTime;
  private Double flightPrice;
  private Integer numOfSeats;

  public void setFlightName(String flightName) {
    this.flightName = flightName;
  }

  public void setDepartureAirport(String departureAirport) {
    this.departureAirport = departureAirport;
  }

  public void setArrivalAirport(String arrivalAirport) {
    this.arrivalAirport = arrivalAirport;
  }

  public void setDepartureDateTime(String departureDateTime) {
    this.departureDateTime = Common.convertStringToDateTime(departureDateTime);
  }

  public void setArrivalDateTime(String arrivalDateTime) {
    this.arrivalDateTime = Common.convertStringToDateTime(arrivalDateTime);
  }

  public void setDepartureDateTime(LocalDateTime departureDateTime) {
    this.departureDateTime = departureDateTime;
  }

  public void setArrivalDateTime(LocalDateTime arrivalDateTime) {
    this.arrivalDateTime = arrivalDateTime;
  }

  public void setNumOfSeats(Integer numOfSeats) {
    this.numOfSeats = numOfSeats;
  }

  public String getFlightName() {
    return this.flightName;
  }

  public String getDepartureAirport() {
    return this.departureAirport;
  }

  public String getArrivalAirport() {
    return this.arrivalAirport;
  }

  public LocalDateTime getDepartureDateTime() {
    return this.departureDateTime;
  }

  public LocalDateTime getArrivalDateTime() {
    return this.arrivalDateTime;
  }

  public Double getFlightPrice() {
    return this.flightPrice;
  }

  public Integer getNumOfSeats() {
    return this.numOfSeats;
  }

  public void setFlightPrice(Double flightPrice) {
    this.flightPrice = flightPrice;
  }

}
