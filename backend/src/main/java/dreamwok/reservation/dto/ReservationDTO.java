package dreamwok.reservation.dto;

import java.util.ArrayList;
import java.util.List;

import dreamwok.reservation.core.common.ReservationStatus;
import dreamwok.reservation.model.Booking;
import dreamwok.reservation.model.Reservation;

public class ReservationDTO {
  private Long id;
  private ReservationStatus reservationStatus;
  private Double totalCost;
  private List<BookingDTO> bookings = new ArrayList<>();
  private CustomerDTO customer;
  private FlightDTO flight;

  public ReservationDTO(Reservation reservation) {
    this.id = reservation.getId();
    this.reservationStatus = reservation.getReservationStatus();
    this.totalCost = reservation.getTotalCost();
    this.customer = new CustomerDTO(reservation.getCustomer());
    this.flight = new FlightDTO(reservation.getFlight());

    for (Booking booking : reservation.getBookings()) {
      bookings.add(new BookingDTO(booking));
    }
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
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

  public FlightDTO getFlight() {
    return flight;
  }

  public void setFlight(FlightDTO flight) {
    this.flight = flight;
  }

  public List<BookingDTO> getBookings() {
    return bookings;
  }

  public void setBookings(List<BookingDTO> bookings) {
    this.bookings = bookings;
  }
}
