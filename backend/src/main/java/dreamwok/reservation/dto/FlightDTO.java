package dreamwok.reservation.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

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
  private LocalDate departureDate;
  private LocalDate arrivalDate;
  private String departureTime;
  private String arrivalTime;

  public FlightDTO(Flight flight) {
    DateTimeFormatter dtf = DateTimeFormatter.ofPattern("hh:mm");

    this.id = flight.getId();
    this.flightPrice = flight.getFlightPrice();
    this.numOfSeats = flight.getNumOfSeats();
    this.flightName = flight.getFlightName();
    this.departureAirport = flight.getDepartureAirport();
    this.arrivalAirport = flight.getArrivalAirport();
    this.departureDateTime = flight.getDepartureDateTime();
    this.arrivalDateTime = flight.getArrivalDateTime();
    this.setDepartureDate(flight.getDepartureDateTime().toLocalDate());
    this.setArrivalDate(flight.getArrivalDateTime().toLocalDate());
    this.setDepartureTime(flight.getDepartureDateTime().toLocalTime().format(dtf));
    this.setArrivalTime(flight.getArrivalDateTime().toLocalTime().format(dtf));
  }

  public String getArrivalTime() {
    return arrivalTime;
  }

  public void setArrivalTime(String arrivalTime) {
    this.arrivalTime = arrivalTime;
  }

  public String getDepartureTime() {
    return departureTime;
  }

  public void setDepartureTime(String departureTime) {
    this.departureTime = departureTime;
  }

  public LocalDate getArrivalDate() {
    return arrivalDate;
  }

  public void setArrivalDate(LocalDate arrivalDate) {
    this.arrivalDate = arrivalDate;
  }

  public LocalDate getDepartureDate() {
    return departureDate;
  }

  public void setDepartureDate(LocalDate departureDate) {
    this.departureDate = departureDate;
  }

  public LocalDateTime getArrivalDateTime() {
    return arrivalDateTime;
  }

  public void setArrivalDateTime(LocalDateTime arrivalDateTime) {
    this.arrivalDateTime = arrivalDateTime;
  }

  public LocalDateTime getDepartureDateTime() {
    return departureDateTime;
  }

  public void setDepartureDateTime(LocalDateTime departureDateTime) {
    this.departureDateTime = departureDateTime;
  }

  public String getArrivalAirport() {
    return arrivalAirport;
  }

  public void setArrivalAirport(String arrivalAirport) {
    this.arrivalAirport = arrivalAirport;
  }

  public String getDepartureAirport() {
    return departureAirport;
  }

  public void setDepartureAirport(String departureAirport) {
    this.departureAirport = departureAirport;
  }

  public String getFlightName() {
    return flightName;
  }

  public void setFlightName(String flightName) {
    this.flightName = flightName;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Integer getNumOfSeats() {
    return this.numOfSeats;
  }

  public void setNumOfSeats(Integer numOfSeats) {
    this.numOfSeats = numOfSeats;
  }

  public Double getFlightPrice() {
    return flightPrice;
  }

  public void setFlightPrice(Double flightPrice) {
    this.flightPrice = flightPrice;
  }
}
