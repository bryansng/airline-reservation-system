package dreamwok.reservation.core.booking.response;

import dreamwok.reservation.core.common.Response;
import dreamwok.reservation.dto.ReservationDTO;

public class BookReservationResponse extends Response {
  private ReservationDTO reservation;

  public BookReservationResponse(String message, ReservationDTO reservation) {
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
