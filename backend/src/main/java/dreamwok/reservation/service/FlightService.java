package dreamwok.reservation.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import java.util.Optional;

import org.springframework.stereotype.Service;

import dreamwok.reservation.model.Flight;
import dreamwok.reservation.repository.FlightRepository;

@Service
public class FlightService {

  @Autowired
  FlightRepository flightRepository;

  public Page<Flight> search(String departureAirport, String arrivalAirport, LocalDateTime departureDateTimeStart,
      LocalDateTime departureDateTimeEnd, Integer numOfPassengers, int pageNum) {
    Page<Flight> flights = flightRepository
        .findByDepartureAirportContainsIgnoreCaseAndArrivalAirportContainsIgnoreCaseAndDepartureDateTimeBetweenAndNumOfSeatsGreaterThanEqual(
            departureAirport, arrivalAirport, departureDateTimeStart, departureDateTimeEnd, numOfPassengers,
            PageRequest.of(pageNum, Common.PAGINATION_ROWS));
    return flights;
  }

  public Page<Flight> searchFromDate(String departureAirport, String arrivalAirport, LocalDateTime departureDateTime,
      Integer numOfPassengers, int pageNum) {
    Page<Flight> flights = flightRepository
        .findByDepartureAirportContainsIgnoreCaseAndArrivalAirportContainsIgnoreCaseAndDepartureDateTimeGreaterThanEqualAndNumOfSeatsGreaterThanEqualOrderByDepartureDateTimeAsc(
            departureAirport, arrivalAirport, departureDateTime, numOfPassengers,
            PageRequest.of(pageNum, Common.PAGINATION_ROWS));
    return flights;
  }

  public Page<Flight> findByAirports(String departureAirport, String arrivalAirport, int pageNum) {
    Page<Flight> flights = flightRepository.findByDepartureAirportContainsIgnoreCaseAndArrivalAirportContainsIgnoreCase(
        departureAirport, arrivalAirport, PageRequest.of(pageNum, Common.PAGINATION_ROWS));
    return flights;
  }

  public Page<Flight> searchByFlightName(String flightName, int pageNum) {
    Page<Flight> flights = flightRepository.findByFlightName(flightName,
        PageRequest.of(pageNum, Common.PAGINATION_ROWS));
    return flights;
  }

  public Flight getFlightById(Long flightId) {
    Optional<Flight> flightOptional = flightRepository.findById(flightId);

    if (!flightOptional.isPresent()) {
      return null;
    }

    return flightOptional.get();
  }

  public Boolean isFlightPast(Flight flight) {
    LocalDateTime departureDateTime = flight.getDepartureDateTime();
    LocalDateTime now = LocalDateTime.now();

    if (departureDateTime.isBefore(now)) {
      return true;
    }
    return false;
  }
}
