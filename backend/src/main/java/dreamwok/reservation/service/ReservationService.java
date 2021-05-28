package dreamwok.reservation.service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dreamwok.reservation.core.common.ReservationStatus;
import dreamwok.reservation.core.creditcard.request.CreditCardRequest;
import dreamwok.reservation.dto.BookingCreditCardDetailsDTO;
import dreamwok.reservation.dto.CustomerDTO;
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

  public Reservation createReservation(Long flightId, List<CustomerDTO> customers,
      BookingCreditCardDetailsDTO creditCardDetailsDTO, Principal principal, HttpServletRequest httpRequest) {
    // check if flight exists.
    Flight flight = flightService.getFlightById(flightId);
    if (flight == null) {
      return null;
    }

    // check if customers exist.
    // if not, create them in database.
    List<Customer> updatedCustomers = new ArrayList<>();
    for (CustomerDTO customerDTO : customers) {
      if (!customerRepository.existsByEmail(customerDTO.getEmail())) {
        updatedCustomers.add(customerRepository.save(new Customer(customerDTO)));
      } else {
        updatedCustomers.add(customerRepository.findByEmail(customerDTO.getEmail()));
      }
    }

    // if isSavePaymentDetails
    // and customer.id in creditCardDetails matches paying customer by email.
    // ? can trick endpoint to add creditCardDetails to the wrong customer by
    // specifying customer id?
    if (creditCardDetailsDTO.getIsSavePaymentDetails()
        && creditCardDetailsDTO.getCustomerId() == updatedCustomers.get(0).getId()) {
      customerService.insertCardDetails(creditCardDetailsDTO.getCustomerId(), principal,
          new CreditCardRequest(creditCardDetailsDTO), httpRequest);
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

    List<Reservation> reversations = reservationRepository
        .findByCustomerIdOrderByFlightDepartureDateTimeDescReservationStatusAsc(customer.getId());
    // List<Reservation> reversations = reservationRepository
    // .findByCustomerIdOrderByCreatedOnDescReservationStatusAsc(customer.getId());
    // List<Reservation> reversations = customer.getReservations();
    List<Reservation> updatedReservations = new ArrayList<>();
    for (Reservation reservation : reversations) {
      updatedReservations.add(checkAndSetIfReservationFlightPast(reservation));
    }

    return updatedReservations;
  }

  public Reservation getReservationById(Long reservationId) {
    Optional<Reservation> reservationOptional = reservationRepository.findById(reservationId);

    if (!reservationOptional.isPresent()) {
      return null;
    }

    return checkAndSetIfReservationFlightPast(reservationOptional.get());
  }

  public Reservation getReservationByIdAndCustomerLastName(String customerLastName, Long reservationId) {
    Optional<Reservation> reservationOptional = reservationRepository.findById(reservationId);

    if (!reservationOptional.isPresent()) {
      return null;
    }

    // check if customerLastName matches paying customer's last name.
    Reservation reservation = reservationOptional.get();
    if (!reservation.getCustomer().getLastName().equals(customerLastName)) {
      return null;
    }

    return checkAndSetIfReservationFlightPast(reservation);
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

  public Reservation checkAndSetIfReservationFlightPast(Reservation reservation) {
    if (reservation.getReservationStatus() == ReservationStatus.SCHEDULED
        && flightService.isFlightPast(reservation.getFlight())) {
      reservation.setReservationStatus(ReservationStatus.PAST);
      return reservationRepository.save(reservation);
    }
    return reservation;
  }
}
