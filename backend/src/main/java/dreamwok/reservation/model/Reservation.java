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

  @OneToMany(mappedBy = "reservation", fetch = FetchType.LAZY)
  private List<Booking> bookings;

  // @Column(nullable = true)
  // private LocalDateTime createdOn = LocalDateTime.now();

  public Reservation() {
  }

  public Reservation(ReservationStatus reservationStatus, Double totalCost, Customer customer, Flight flight,
      List<Booking> bookings) {
    this.reservationStatus = reservationStatus;
    this.totalCost = totalCost;
    this.customer = customer;
    this.flight = flight;
    this.bookings = bookings;
  }

  // public Reservation(ReservationDTO reservation) {
  //   this(reservation.getReservationStatus(), reservation.getTotalCost(), new Customer(reservation.getCustomer()),
  //       new Flight(reservation.getFlight()), new ArrayList<Booking>());
  //   this.bookings = convertBookingDTOListToBookingList(reservation.getBookings());
  // }

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

  public List<Booking> getBookings() {
    return bookings;
  }

  public void setBookings(List<Booking> bookings) {
    this.bookings = bookings;
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

  public void editReservation(ReservationStatus reservationStatus, Double totalCost, Customer customer, Flight flight,
      List<Booking> bookings) {
    this.reservationStatus = reservationStatus;
    this.totalCost = totalCost;
    this.customer = customer;
    this.flight = flight;
    this.bookings = bookings;
  }

  // public void editReservation(ReservationStatus reservationStatus, Double totalCost, CustomerDTO customer,
  //     FlightDTO flight, List<BookingDTO> bookings) {
  //   this.reservationStatus = reservationStatus;
  //   this.totalCost = totalCost;
  //   this.customer = new Customer(customer);
  //   this.flight = new Flight(flight);
  //   this.bookings = convertBookingDTOListToBookingList(bookings);
  // }

  // public List<Booking> convertBookingDTOListToBookingList(List<BookingDTO> bookingDTOs) {
  //   List<Booking> bookings = new ArrayList<Booking>();
  //   for (BookingDTO booking : bookingDTOs)
  //     bookings.add(new Booking(booking, this));
  //   return bookings;
  // }
}
