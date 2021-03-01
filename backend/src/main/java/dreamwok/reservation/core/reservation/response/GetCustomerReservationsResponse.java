package dreamwok.reservation.core.reservation.response;

import java.util.List;

import dreamwok.reservation.core.common.Response;
import dreamwok.reservation.dto.ReservationDTO;

public class GetCustomerReservationsResponse extends Response {
  private List<ReservationDTO> reservations;

  public GetCustomerReservationsResponse(String message, List<ReservationDTO> reservations) {
    super(message);
    this.reservations = reservations;
  }

  public List<ReservationDTO> getReservations() {
    return this.reservations;
  }

  public void setReservations(List<ReservationDTO> reservations) {
    this.reservations = reservations;
  }
}
