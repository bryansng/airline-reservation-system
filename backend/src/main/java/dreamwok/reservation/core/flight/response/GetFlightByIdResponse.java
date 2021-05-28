package dreamwok.reservation.core.flight.response;

import dreamwok.reservation.core.common.Response;
import dreamwok.reservation.dto.FlightDTO;

public class GetFlightByIdResponse extends Response {
  private FlightDTO flight;

  public GetFlightByIdResponse(String message, FlightDTO flight) {
    super(message);
    this.flight = flight;
  }

  public GetFlightByIdResponse(String statusCode, String message, FlightDTO flight) {
    super(statusCode, message);
    this.flight = flight;
  }

  public FlightDTO getFlight() {
    return this.flight;
  }

  public void setFlight(FlightDTO flight) {
    this.flight = flight;
  }
}
