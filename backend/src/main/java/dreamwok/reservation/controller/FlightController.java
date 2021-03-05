package dreamwok.reservation.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import dreamwok.reservation.core.flight.response.FlightsResponse;
import dreamwok.reservation.core.flight.response.GetFlightByIdResponse;
import dreamwok.reservation.dto.FlightDTO;
import dreamwok.reservation.model.Flight;
import dreamwok.reservation.repository.FlightRepository;
import dreamwok.reservation.service.FlightService;

/**
 * Endpoints to search flights.
 * /search - default search returning all flights departing on the specified date
 * having fromDepartureDate > 0 & /search-from-date - search returns all flights departing on the specified date onwards
 *
 *  for testing purposes: /search-from-date, /search-by-airport, /search-by-flight-name
 */
@RestController
@CrossOrigin
public class FlightController {
	@Autowired
	FlightRepository flightRepository;

	@Autowired
	FlightService flightService;

	@GetMapping("/search")
	public ResponseEntity<FlightsResponse> search(@RequestParam String departureAirport,
			@RequestParam String arrivalAirport,
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate departureDate,
			@RequestParam Integer numOfPassengers, @RequestParam int pageNum, @RequestParam Integer fromDepartureDate) {
		Page<Flight> flightsPage = (fromDepartureDate > 0)
				? flightService.searchFromDate(departureAirport, arrivalAirport, departureDate.atStartOfDay(), numOfPassengers,
						pageNum)
				: flightService.search(departureAirport, arrivalAirport, departureDate.atStartOfDay(),
						departureDate.plusDays(1).atStartOfDay(), numOfPassengers, pageNum);

		List<Flight> flights = flightsPage.getContent();
		List<Flight> futureFlights = new ArrayList<>();

		for (Flight flight : flights) {
			if (!flightService.isFlightPast(flight)) {
				futureFlights.add(flight);
			}
		}

		return new ResponseEntity<>(new FlightsResponse("Flights returned successfully.", futureFlights), HttpStatus.OK);
	}

	@GetMapping("/test/search-from-date")
	public ResponseEntity<FlightsResponse> searchFromDate(@RequestParam String departureAirport,
			@RequestParam String arrivalAirport,
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate departureDate,
			@RequestParam Integer numOfPassengers, @RequestParam int pageNum) {
		Page<Flight> flights = flightService.searchFromDate(departureAirport, arrivalAirport, departureDate.atStartOfDay(),
				numOfPassengers, pageNum);
		return new ResponseEntity<>(new FlightsResponse("Flights returned successfully.", flights.getContent()),
				HttpStatus.OK);
	}

	@GetMapping("/test/search-by-airport")
	public ResponseEntity<FlightsResponse> searchByAirport(@RequestParam String departureAirport,
			@RequestParam String arrivalAirport, @RequestParam int pageNum) {
		Page<Flight> flights = flightService.findByAirports(departureAirport, arrivalAirport, pageNum);
		return new ResponseEntity<>(new FlightsResponse("Flights returned successfully.", flights.getContent()),
				HttpStatus.OK);
	}

	@GetMapping("/test/search-by-flight-name")
	public ResponseEntity<FlightsResponse> searchByFlighName(@RequestParam String flightName, @RequestParam int pageNum) {
		Page<Flight> flights = flightService.searchByFlightName(flightName, pageNum);
		return new ResponseEntity<>(new FlightsResponse("Flights returned successfully.", flights.getContent()),
				HttpStatus.OK);
	}

	@RequestMapping(value = "/flight/{flightId}", method = RequestMethod.GET)
	public ResponseEntity<GetFlightByIdResponse> getFlightById(@PathVariable("flightId") Long flightId) {
		Flight flight = flightService.getFlightById(flightId);

		if (flight == null) {
			return new ResponseEntity<>(new GetFlightByIdResponse("Invalid flight id.", null), HttpStatus.NOT_FOUND);
		}

		FlightDTO flightDTO = new FlightDTO(flight);
		return new ResponseEntity<>(new GetFlightByIdResponse("Flight retrieved successfully.", flightDTO), HttpStatus.OK);
	}
}
