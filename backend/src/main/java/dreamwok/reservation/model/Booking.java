package dreamwok.reservation.model;

import javax.persistence.*;

import dreamwok.reservation.dto.BookingDTO;

@Entity
@Table(name = "bookings")
public class Booking {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  private Reservation reservation;

  @ManyToOne(fetch = FetchType.LAZY)
  private Customer customer;

  private Boolean isCheckedIn = false;
  private Boolean isCancelled = false;

  public Booking() {
  }

  public Booking(Boolean isCheckedIn, Boolean isCancelled, Reservation reservation, Customer customer) {
    this.isCheckedIn = isCheckedIn;
    this.isCancelled = isCancelled;
    this.reservation = reservation;
    this.customer = customer;
  }

  public Reservation getReservation() {
    return reservation;
  }

  public void setReservation(Reservation reservation) {
    this.reservation = reservation;
  }

  public Customer getCustomer() {
    return customer;
  }

  public void setCustomer(Customer customer) {
    this.customer = customer;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Boolean getIsCheckedIn() {
    return isCheckedIn;
  }

  public void setIsCheckedIn(Boolean isCheckedIn) {
    this.isCheckedIn = isCheckedIn;
  }

  public Boolean getIsCancelled() {
    return isCancelled;
  }

  public void setIsCancelled(Boolean isCancelled) {
    this.isCancelled = isCancelled;
  }

  public void update(BookingDTO booking, Customer customerToUpdate) {
    this.setIsCheckedIn(booking.getIsCheckedIn());
    this.setIsCancelled(booking.getIsCancelled());
    this.setCustomer(customerToUpdate);
  }
}
