package dreamwok.reservation.core.reservation.response;

import dreamwok.reservation.core.common.Response;
import dreamwok.reservation.dto.ReservationDTO;

public class GetReservationByIdResponse extends Response {
  private ReservationDTO reservation;

  public GetReservationByIdResponse(String message, ReservationDTO reservation) {
    super(message);
    this.reservation = reservation;
  }

  public ReservationDTO getReservation() {
    return this.reservation;
  }

  public void setReservation(ReservationDTO reservation) {
    this.reservation = reservation;
  }
}
