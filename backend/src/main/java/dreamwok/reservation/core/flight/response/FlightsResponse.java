package dreamwok.reservation.core.flight.response;

import java.util.List;

import dreamwok.reservation.model.Flight;

public class FlightsResponse {
  private List<Flight> flights;
  private String message;

  public FlightsResponse(String message, List<Flight> flights) {
    this.message = message;
    this.flights = flights;
  }

  public String getMessage() {
    return this.message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public List<Flight> getFlight() {
    return this.flights;
  }

  public void setFlight(List<Flight> flights) {
    this.flights = flights;
  }
}
