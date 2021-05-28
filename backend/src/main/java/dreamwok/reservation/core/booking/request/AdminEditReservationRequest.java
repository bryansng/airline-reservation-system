package dreamwok.reservation.core.booking.request;

import java.util.ArrayList;

import java.util.List;
import dreamwok.reservation.core.common.ReservationStatus;
import dreamwok.reservation.dto.CustomerDTO;
import dreamwok.reservation.dto.BookingDTO;

public class AdminEditReservationRequest {
  private ReservationStatus reservationStatus;
  private Double totalCost;
  private List<BookingDTO> bookings = new ArrayList<>();
  private CustomerDTO customer;
  // private FlightDTO flight;
  private Long flightId;
  private Boolean isPaid = false;

  public AdminEditReservationRequest() {
  }

  public AdminEditReservationRequest(ReservationStatus reservationStatus, Double totalCost, List<BookingDTO> bookings,
      CustomerDTO customer, Long flightId) {
    this.reservationStatus = reservationStatus;
    this.totalCost = totalCost;
    this.bookings = bookings;
    this.customer = customer;
    this.flightId = flightId;
  }

  public AdminEditReservationRequest(ReservationStatus reservationStatus, Double totalCost, List<BookingDTO> bookings,
      CustomerDTO customer, Long flightId, Boolean isPaid) {
    this.reservationStatus = reservationStatus;
    this.totalCost = totalCost;
    this.bookings = bookings;
    this.customer = customer;
    this.flightId = flightId;
    this.isPaid = isPaid;
  }

  public ReservationStatus getReservationStatus() {
    return reservationStatus;
  }

  public void setReservationStatus(ReservationStatus reservationStatus) {
    this.reservationStatus = reservationStatus;
  }

  public Double getTotalCost() {
    return totalCost;
  }

  public void setTotalCost(Double totalCost) {
    this.totalCost = totalCost;
  }

  public CustomerDTO getCustomer() {
    return customer;
  }

  public void setCustomer(CustomerDTO customer) {
    this.customer = customer;
  }

  // public FlightDTO getFlight() {
  //   return flight;
  // }

  // public void setFlight(FlightDTO flight) {
  //   this.flight = flight;
  // }

  public Long getFlightId() {
    return this.flightId;
  }

  public void setFlightId(Long flightId) {
    this.flightId = flightId;
  }

  public List<BookingDTO> getBookings() {
    return bookings;
  }

  public void setBookings(List<BookingDTO> bookings) {
    this.bookings = bookings;
  }

  public Boolean getIsPaid() {
    return this.isPaid;
  }

  public void setIsPaid(Boolean isPaid) {
    this.isPaid = isPaid;
  }

}
