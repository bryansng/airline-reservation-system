package dreamwok.reservation.model;

import dreamwok.reservation.dto.FlightDTO;
import dreamwok.reservation.service.Common;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import java.util.List;

@Entity
@Table(name = "flights")

public class Flight {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotEmpty
  private String flightName;
  private String departureAirport;
  private String arrivalAirport;
  private LocalDateTime departureDateTime;
  private LocalDateTime arrivalDateTime;
  private Double flightPrice;
  private Integer numOfSeats;

  @OneToMany(mappedBy = "flight", cascade = CascadeType.ALL)
  private List<Reservation> reservations;

  public Flight() {
  }

  public Flight(String flightName, String departureAirport, String arrivalAirport, String departureDateTime,
      String arrivalDateTime, Double flightPrice, Integer numOfSeats) {
    this.flightName = flightName;
    this.departureAirport = departureAirport;
    this.arrivalAirport = arrivalAirport;
    this.departureDateTime = Common.convertStringDateToDateTime(departureDateTime);
    this.arrivalDateTime = Common.convertStringDateToDateTime(arrivalDateTime);
    this.flightPrice = flightPrice;
    this.numOfSeats = numOfSeats;
  }

  public Flight(String flightName, String departureAirport, String arrivalAirport, LocalDateTime departureDateTime,
      LocalDateTime arrivalDateTime, Double flightPrice, Integer numOfSeats) {
    this.flightName = flightName;
    this.departureAirport = departureAirport;
    this.arrivalAirport = arrivalAirport;
    this.departureDateTime = departureDateTime;
    this.arrivalDateTime = arrivalDateTime;
    this.flightPrice = flightPrice;
    this.numOfSeats = numOfSeats;
  }

  public Flight(FlightDTO flight) {
    this(flight.getFlightName(), flight.getDepartureAirport(), flight.getArrivalAirport(),
        flight.getDepartureDateTime(), flight.getArrivalDateTime(), flight.getFlightPrice(), flight.getNumOfSeats());
  }

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
    this.departureDateTime = Common.convertStringDateToDateTime(departureDateTime);
  }

  public void setArrivalDateTime(String arrivalDateTime) {
    this.arrivalDateTime = Common.convertStringDateToDateTime(arrivalDateTime);
  }

  public void setDepartureDateTime(LocalDateTime departureDateTime) {
    this.departureDateTime = departureDateTime;
  }

  public void setArrivalDateTime(LocalDateTime arrivalDateTime) {
    this.arrivalDateTime = arrivalDateTime;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public void setNumOfSeats(Integer numOfSeats) {
    this.numOfSeats = numOfSeats;
  }

  public void addPassengers(Integer numOfPassengers) throws Exception {
    if (this.numOfSeats >= numOfPassengers)
      this.numOfSeats -= numOfPassengers;
    else
      throw new Exception("Not enough seats.");
  }

  public void cancelPassengers(Integer numOfPassengers) throws Exception {
    if (this.numOfSeats >= numOfPassengers)
      this.numOfSeats += numOfPassengers;
    else
      throw new Exception("Unable to cancel more passengers than available seats.");
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

  // public String getDepartureDateTimeString() {
  //   return this.departureDateTime.toString();
  // }

  // public String getArrivalDateTimeString() {
  //   return this.arrivalDateTime.toString();
  // }

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

  public void updateFlight(String flightName, String departureAirport, String arrivalAirport,
      LocalDateTime departureDateTime, LocalDateTime arrivalDateTime, Double flightPrice, Integer numOfSeats) {
    this.setArrivalAirport(arrivalAirport);
    this.setArrivalDateTime(arrivalDateTime);
    this.setDepartureAirport(departureAirport);
    this.setDepartureDateTime(departureDateTime);
    this.setFlightName(flightName);
    this.setFlightPrice(flightPrice);
    this.setNumOfSeats(numOfSeats);
  }
}
