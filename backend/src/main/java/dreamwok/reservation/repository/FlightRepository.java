package dreamwok.reservation.repository;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dreamwok.reservation.model.Flight;

@Repository
public interface FlightRepository extends JpaRepository<Flight, Long> {
  Page<Flight> findByDepartureAirportContainsIgnoreCaseAndArrivalAirportContainsIgnoreCaseAndDepartureDateTimeBetweenAndNumOfSeatsGreaterThanEqual(
      String departureAirport, String arrivalAirport, LocalDateTime departureDateTimeStart,
      LocalDateTime departureDateTimeEnd, Integer numOfSeats, Pageable pageable);

  Page<Flight> findByDepartureAirportContainsIgnoreCaseAndArrivalAirportContainsIgnoreCaseAndDepartureDateTimeGreaterThanEqualAndNumOfSeatsGreaterThanEqual(
      String departureAirport, String arrivalAirport, LocalDateTime departureDateTime, Integer numOfSeats,
      Pageable pageable);

  Page<Flight> findByDepartureAirportContainsIgnoreCaseAndArrivalAirportContainsIgnoreCase(String departureAirport,
      String arrivalAirport, Pageable pageable);

  Page<Flight> findByFlightName(String flightName, Pageable pageable);
}
