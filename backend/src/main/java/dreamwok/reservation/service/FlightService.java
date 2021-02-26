package dreamwok.reservation.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dreamwok.reservation.model.Flight;
import dreamwok.reservation.repository.FlightRepository;

@Service
public class FlightService {
  @Autowired
  FlightRepository flightRepository;

  public Flight getFlightById(Long flightId) {
    Optional<Flight> flight = flightRepository.findById(flightId);

    if (!flight.isPresent()) {
      return null;
    }
    return flight.get();
  }
}
