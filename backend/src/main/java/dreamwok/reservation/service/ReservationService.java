package dreamwok.reservation.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dreamwok.reservation.core.common.ReservationStatus;
import dreamwok.reservation.model.Booking;
import dreamwok.reservation.model.Customer;
import dreamwok.reservation.model.Flight;
import dreamwok.reservation.model.Reservation;
import dreamwok.reservation.repository.BookingRepository;
import dreamwok.reservation.repository.CustomerRepository;
import dreamwok.reservation.repository.ReservationRepository;

@Service
public class ReservationService {
  @Autowired
  CustomerService customerService;

  @Autowired
  FlightService flightService;

  @Autowired
  CustomerRepository customerRepository;

  @Autowired
  ReservationRepository reservationRepository;

  @Autowired
  BookingRepository bookingRepository;

  public Reservation createReservation(Long flightId, List<Customer> customers) {
    // check if flight exists.
    Flight flight = flightService.getFlightById(flightId);
    if (flight == null) {
      return null;
    }

    // check if customers exist.
    // if not, create them in database.
    List<Customer> updatedCustomers = new ArrayList<>();
    for (Customer customer : customers) {
      if (!customerRepository.existsByEmail(customer.getEmail())) {
        updatedCustomers.add(customerRepository.save(customer));
      } else {
        updatedCustomers.add(customerRepository.findByEmail(customer.getEmail()));
      }
    }

    // create reservation.
    Reservation reservation = new Reservation(ReservationStatus.SCHEDULED,
        flight.getFlightPrice() * updatedCustomers.size(), updatedCustomers.get(0), flight, null);
    reservation = reservationRepository.save(reservation);

    // create the response bookings.
    List<Booking> bookings = new ArrayList<>();
    for (Customer customer : updatedCustomers) {
      Booking booking = new Booking(false, false, reservation, customer);
      booking = bookingRepository.save(booking);
      bookings.add(booking);
    }

    reservation.setBookings(bookings);
    return reservation;
  }

  public List<Reservation> getCustomerReservations(Long customerId) {
    Customer customer = customerService.getCustomerById(customerId);

    if (customer == null) {
      return null;
    }

    return customer.getReservations();
  }

  public Reservation getReservationById(Long reservationId) {
    Optional<Reservation> reservationOptional = reservationRepository.findById(reservationId);

    if (!reservationOptional.isPresent()) {
      return null;
    }

    return reservationOptional.get();
  }

  public Reservation cancelReservation(Long reservationId) {
    Reservation reservation = getReservationById(reservationId);

    if (reservation == null) {
      return null;
    }

    reservation.setReservationStatus(ReservationStatus.CANCELLED);
    reservationRepository.save(reservation);
    return reservation;
  }
}