package dreamwok.reservation.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import dreamwok.reservation.core.booking.request.AdminBookReservationRequest;
import dreamwok.reservation.core.booking.request.AdminEditReservationRequest;
import dreamwok.reservation.core.common.ReservationStatus;
import dreamwok.reservation.core.creditcard.request.CreditCardRequest;
import dreamwok.reservation.dto.BookingCreditCardDetailsDTO;
import dreamwok.reservation.dto.BookingDTO;
import dreamwok.reservation.dto.CustomerDTO;
import dreamwok.reservation.dto.ReservationDTO;
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
      BookingCreditCardDetailsDTO creditCardDetailsDTO) {
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
    // ? can trick endpoint to add creditCardDetails to the wrong customer by specifying customer id?
    if (creditCardDetailsDTO.getIsSavePaymentDetails()
        && creditCardDetailsDTO.getCustomerId() == updatedCustomers.get(0).getId()) {
      customerService.insertCardDetails(creditCardDetailsDTO.getCustomerId(),
          new CreditCardRequest(creditCardDetailsDTO));
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

  public Reservation adminCreateReservation(AdminBookReservationRequest request) {
    // check if flight exists.
    Flight flight = flightService.getFlightById(request.getFlightId());
    if (flight == null) {
      return null;
    }

    // check if customers exist.
    // if not, create them in database.
    List<Customer> updatedCustomers = new ArrayList<>();
    for (CustomerDTO customerDTO : request.getCustomers()) {
      if (!customerRepository.existsByEmail(customerDTO.getEmail())) {
        updatedCustomers.add(customerRepository.save(new Customer(customerDTO)));
      } else {
        updatedCustomers.add(customerRepository.findByEmail(customerDTO.getEmail()));
      }
    }

    // create reservation.
    Reservation reservation = null;
    if (request.getIsPaid()) {
      reservation = new Reservation(ReservationStatus.SCHEDULED, 0.00, updatedCustomers.get(0), flight, null);
      reservation = reservationRepository.save(reservation);
    } else {
      reservation = new Reservation(ReservationStatus.UNPAID, flight.getFlightPrice() * updatedCustomers.size(),
          updatedCustomers.get(0), flight, null);
      reservation = reservationRepository.save(reservation);
    }

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
    //     .findByCustomerIdOrderByCreatedOnDescReservationStatusAsc(customer.getId());
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

  // public Reservation adminDeleteReservation(Long reservationId) {
  //   Reservation reservation = getReservationById(reservationId);

  //   if (reservation == null) {
  //     return null;
  //   }
  //   reservationRepository.deleteById(reservationId);
  //   return reservation;
  // }

  public Reservation adminEditReservation(Long reservationId, AdminEditReservationRequest request) {
    Reservation reservation = getReservationById(reservationId);
    if (reservation == null) {
      return null;
    }

    // update customer
    Customer payingCustomer;
    if (!customerRepository.existsByEmail(request.getCustomer().getEmail()))
      payingCustomer = new Customer(request.getCustomer());
    else
      payingCustomer = customerRepository.findByEmail(request.getCustomer().getEmail());

    payingCustomer.update(request.getCustomer());
    customerRepository.save(payingCustomer);

    // List<Customer> updatedCustomers = updateCustomerForBookings(request.getBookings());

    // grab & delete existing bookings for this reservation id
    List<Booking> oldBookings = bookingRepository.findByReservationId(reservationId);
    bookingRepository.deleteInBatch(oldBookings);

    // make new bookings
    List<Booking> updatedBookings = new ArrayList<Booking>();
    for (BookingDTO bookingDTO : request.getBookings()) {
      Customer customer = updateCustomerForBookings(bookingDTO);
      Booking booking = new Booking(bookingDTO.getIsCheckedIn(), bookingDTO.getIsCancelled(), reservation, customer);
      bookingRepository.save(booking);
      updatedBookings.add(booking);
    }

    // update flight
    Flight newFlight = flightService.getFlightById(request.getFlightId());
    if (newFlight == null) {
      return null;
    }

    // update reservation
    if (request.getIsPaid()) {
      reservation.editReservation(request.getReservationStatus(), reservation.getTotalCost(), payingCustomer, newFlight,
          updatedBookings);
    } else {
      reservation.editReservation(request.getReservationStatus(), request.getTotalCost(), payingCustomer, newFlight,
          updatedBookings);
      reservationRepository.save(reservation);
    }

    return reservation;
  }

  // private Customer updateCustomerForBooking(BookingDTO bookingDTO) {
  //   // update customer
  //   Customer customer;
  //   if (customerRepository.existsById(bookingDTO.getCustomer().getId())) {
  //     customer = customerRepository.getOne(bookingDTO.getCustomer().getId());
  //     customer.update(bookingDTO.getCustomer());
  //   } else {
  //     customer = new Customer(bookingDTO.getCustomer());
  //   }
  //   return customerRepository.save(customer);
  // }

  private Customer updateCustomerForBookings(BookingDTO bookingDTO) {
    Customer customer;
    if (!customerRepository.existsByEmail(bookingDTO.getCustomer().getEmail())) {
      customer = customerRepository.save(new Customer(bookingDTO.getCustomer()));
    } else {
      customer = customerRepository.findByEmail(bookingDTO.getCustomer().getEmail());
    }
    return customer;
  }

  public List<ReservationDTO> getAllReservationDTOs() {
    Page<Reservation> reservations = reservationRepository
        .findAll(PageRequest.of(0, (int) reservationRepository.count()));
    List<ReservationDTO> reservationDTOs = new ArrayList<ReservationDTO>();
    for (Reservation reservation : reservations.getContent())
      reservationDTOs.add(new ReservationDTO(reservation));
    return reservationDTOs;
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
