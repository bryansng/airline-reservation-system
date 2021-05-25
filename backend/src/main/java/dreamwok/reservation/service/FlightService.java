package dreamwok.reservation.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

import org.springframework.stereotype.Service;

import dreamwok.reservation.core.flight.request.FlightRequest;
import dreamwok.reservation.core.flight.response.GetFlightByIdResponse;
import dreamwok.reservation.dto.FlightDTO;
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

  public Page<Flight> getAllFlights() {
    Page<Flight> flights = flightRepository.findAll(PageRequest.of(0, (int) flightRepository.count()));
    return flights;
  }

  public ResponseEntity<GetFlightByIdResponse> deleteFlightById(Long flightId) {
    Optional<Flight> flight = flightRepository.findById(flightId);

    if (flight.isEmpty())
      return new ResponseEntity<>(new GetFlightByIdResponse("Flight does not exist.", null), HttpStatus.NOT_FOUND);

    flightRepository.deleteById(flightId);
    return new ResponseEntity<>(new GetFlightByIdResponse("Flight deleted.", new FlightDTO(flight.get())),
        HttpStatus.OK);
  }

  public ResponseEntity<GetFlightByIdResponse> editFlightById(Long flightId, FlightRequest flightRequest) {
    Optional<Flight> optionalFlight = flightRepository.findById(flightId);

    if (optionalFlight.isEmpty())
      return new ResponseEntity<>(new GetFlightByIdResponse("Flight does not exist.", null), HttpStatus.NOT_FOUND);

    Flight flight = optionalFlight.get();
    flight.updateFlight(flightRequest.getFlightName(), flightRequest.getDepartureAirport(),
        flightRequest.getArrivalAirport(), flightRequest.getDepartureDateTime(), flightRequest.getArrivalDateTime(),
        flightRequest.getFlightPrice(), flightRequest.getNumOfSeats());
    flight = flightRepository.save(flight);
    return new ResponseEntity<>(new GetFlightByIdResponse("Flight edited.", new FlightDTO(flight)), HttpStatus.OK);
  }

  // public ResponseEntity<GetFlightByIdResponse> editFlightById(Long flightId, String flightName, String departureAirport,
  //     String arrivalAirport, LocalDateTime departureDateTime, LocalDateTime arrivalDateTime, Double flightPrice,
  //     Integer numOfSeats) {
  //   Optional<Flight> optionalFlight = flightRepository.findById(flightId);

  //   if (optionalFlight.isEmpty())
  //     return new ResponseEntity<>(new GetFlightByIdResponse("Flight does not exist.", null), HttpStatus.NOT_FOUND);

  //   Flight flight = optionalFlight.get();
  //   flight.updateFlight(flightName, departureAirport, arrivalAirport, departureDateTime, arrivalDateTime, flightPrice,
  //       numOfSeats);
  //   flight = flightRepository.save(flight);
  //   return new ResponseEntity<>(new GetFlightByIdResponse("Flight edited.", new FlightDTO(flight)), HttpStatus.OK);
  // }

  public ResponseEntity<GetFlightByIdResponse> createFlight(FlightRequest flightRequest) {

    Flight newFlight = new Flight(flightRequest.getFlightName(), flightRequest.getDepartureAirport(),
        flightRequest.getArrivalAirport(), flightRequest.getDepartureDateTime(), flightRequest.getArrivalDateTime(),
        flightRequest.getFlightPrice(), flightRequest.getNumOfSeats());
    Flight flight = flightRepository.save(newFlight);
    return new ResponseEntity<>(new GetFlightByIdResponse("Flight created.", new FlightDTO(flight)),
        HttpStatus.CREATED);
  }
}
