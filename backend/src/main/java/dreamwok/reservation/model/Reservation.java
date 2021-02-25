package dreamwok.reservation.model;

import java.util.List;

import javax.persistence.*;

import dreamwok.reservation.core.common.ReservationStatus;

@Entity
@Table(name = "reservations")
public class Reservation {
  // to use String.
  // https://stackoverflow.com/questions/18622716/how-to-use-id-with-string-type-in-jpa-hibernate
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private ReservationStatus reservationStatus = ReservationStatus.SCHEDULED;
  private Double totalCost = 0.0;

  @ManyToOne(fetch = FetchType.LAZY)
  private Customer customer;

  @ManyToOne(fetch = FetchType.LAZY)
  private Flight flight;

  // @OneToMany(mappedBy = "reservation", fetch = FetchType.LAZY)
  // private List<Booking> bookings;

  // public Reservation(ReservationStatus reservationStatus, Double totalCost, Customer customer, Flight flight,
  //     List<Booking> bookings) {
  //   this.reservationStatus = reservationStatus;
  //   this.totalCost = totalCost;
  //   this.customer = customer;
  //   this.flight = flight;
  //   this.bookings = bookings;
  // }

  public Reservation(ReservationStatus reservationStatus, Double totalCost, Customer customer, Flight flight) {
    this.reservationStatus = reservationStatus;
    this.totalCost = totalCost;
    this.customer = customer;
    this.flight = flight;
  }

  public Customer getCustomer() {
    return customer;
  }

  public void setCustomer(Customer customer) {
    this.customer = customer;
  }

  public Flight getFlight() {
    return flight;
  }

  public void setFlight(Flight flight) {
    this.flight = flight;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public ReservationStatus getStatus() {
    return reservationStatus;
  }

  public void setStatus(ReservationStatus reservationStatus) {
    this.reservationStatus = reservationStatus;
  }

  public Double getTotalCost() {
    return totalCost;
  }

  public void setTotalCost(Double totalCost) {
    this.totalCost = totalCost;
  }
}
