package dreamwok.reservation.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import dreamwok.reservation.core.booking.request.AdminEditReservationRequest;
import dreamwok.reservation.core.reservation.response.CancelResponse;
import dreamwok.reservation.core.reservation.response.GetCustomerReservationsResponse;
import dreamwok.reservation.core.reservation.response.GetReservationByIdResponse;
import dreamwok.reservation.dto.ReservationDTO;
import dreamwok.reservation.model.Reservation;
import dreamwok.reservation.service.ReservationService;

@RestController
@CrossOrigin
public class ReservationController {
  @Autowired
  private ReservationService reservationService;

  /*
   * /reservations GET { customerId: String } returns { reservations:
   * List<Reservation> [{ reservation: Reservation object }] }
   */
  @RequestMapping(value = "/reservations/{customerId}", method = RequestMethod.GET)
  public ResponseEntity<GetCustomerReservationsResponse> getCustomerReservations(
      @PathVariable("customerId") Long customerId) {
    List<Reservation> reservations = reservationService.getCustomerReservations(customerId);

    if (reservations == null) {
      return new ResponseEntity<>(new GetCustomerReservationsResponse("Invalid customer id.", null),
          HttpStatus.NOT_FOUND);
    }

    List<ReservationDTO> reservationsDTO = new ArrayList<ReservationDTO>();
    for (Reservation reservation : reservations) {
      reservationsDTO.add(new ReservationDTO(reservation));
    }
    return new ResponseEntity<>(
        new GetCustomerReservationsResponse("Customer reservations retrieved successfully.", reservationsDTO),
        HttpStatus.OK);
  }

  /*
   * /reservation GET { reservationId: String } returns { reservation: Reservation
   * object }
   */
  @RequestMapping(value = "/reservation/{reservationId}", method = RequestMethod.GET)
  public ResponseEntity<GetReservationByIdResponse> getReservationById(
      @PathVariable("reservationId") Long reservationId) {
    Reservation reservation = reservationService.getReservationById(reservationId);

    if (reservation == null) {
      return new ResponseEntity<>(new GetReservationByIdResponse("Invalid reservation id.", null),
          HttpStatus.NOT_FOUND);
    }

    ReservationDTO reservationDTO = new ReservationDTO(reservation);
    return new ResponseEntity<>(new GetReservationByIdResponse("Reservation retrieved successfully.", reservationDTO),
        HttpStatus.OK);
  }

  @RequestMapping(value = "/reservation/{customerLastName}/{reservationId}", method = RequestMethod.GET)
  public ResponseEntity<GetReservationByIdResponse> getReservationByIdAndCustomerLastName(
      @PathVariable("customerLastName") String customerLastName, @PathVariable("reservationId") Long reservationId) {
    Reservation reservation = reservationService.getReservationByIdAndCustomerLastName(customerLastName, reservationId);

    if (reservation == null) {
      return new ResponseEntity<>(new GetReservationByIdResponse(
          "Invalid reservation id or incorrect reservation id with customer last name.", null), HttpStatus.NOT_FOUND);
    }

    ReservationDTO reservationDTO = new ReservationDTO(reservation);
    return new ResponseEntity<>(new GetReservationByIdResponse("Reservation retrieved successfully.", reservationDTO),
        HttpStatus.OK);
  }

  /* /reservation/cancel PUT
    {
        reservationId: String
    }
    returns
    {
        status: 200 if success, BAD_REQUEST if cannot due to not within 24 hours.
        message: ...
    } */
  @RequestMapping(value = "/reservation/cancel/{reservationId}", method = RequestMethod.PUT)
  public ResponseEntity<CancelResponse> cancelReservation(@PathVariable("reservationId") Long reservationId) {
    Reservation reservation = reservationService.cancelReservation(reservationId);

    if (reservation == null) {
      return new ResponseEntity<>(new CancelResponse("Invalid reservation id.", null), HttpStatus.NOT_FOUND);
    }

    ReservationDTO reservationDTO = new ReservationDTO(reservation);
    return new ResponseEntity<>(new CancelResponse("Reservation cancelled successfully.", reservationDTO),
        HttpStatus.OK);
  }

  @RequestMapping(value = "/adm/reservation/cancel/{reservationId}", method = RequestMethod.PUT)
  public ResponseEntity<CancelResponse> adminCancelReservation(@PathVariable("reservationId") Long reservationId) {
    Reservation reservation = reservationService.cancelReservation(reservationId);

    if (reservation == null) {
      return new ResponseEntity<>(new CancelResponse("Invalid reservation id.", null), HttpStatus.NOT_FOUND);
    }

    ReservationDTO reservationDTO = new ReservationDTO(reservation);
    return new ResponseEntity<>(new CancelResponse("Reservation cancelled successfully.", reservationDTO),
        HttpStatus.OK);
  }

  // @RequestMapping(value = "/reservation/admin/delete/{reservationId}", method = RequestMethod.DELETE)
  // public ResponseEntity<CancelResponse> adminDeleteReservation(@PathVariable("reservationId") Long reservationId) {
  //   Reservation reservation = reservationService.adminDeleteReservation(reservationId);

  //   if (reservation == null) {
  //     return new ResponseEntity<>(new CancelResponse("Invalid reservation id.", null), HttpStatus.NOT_FOUND);
  //   }

  //   ReservationDTO reservationDTO = new ReservationDTO(reservation);
  //   return new ResponseEntity<>(new CancelResponse("Reservation deleted successfully.", reservationDTO), HttpStatus.OK);
  // }

  @RequestMapping(value = "/adm/reservation/edit/{reservationId}", method = RequestMethod.PUT)
  public ResponseEntity<CancelResponse> adminEditReservation(@PathVariable("reservationId") Long reservationId,
      @RequestBody AdminEditReservationRequest request) {
    Reservation reservation = reservationService.adminEditReservation(reservationId, request);

    if (reservation == null) {
      return new ResponseEntity<>(new CancelResponse("Invalid reservation id.", null), HttpStatus.NOT_FOUND);
    }

    ReservationDTO reservationDTO = new ReservationDTO(reservation);
    return new ResponseEntity<>(new CancelResponse("Reservation edited successfully.", reservationDTO), HttpStatus.OK);
  }

  // GetCustomerReservationsResponse contains a list of reservationDTOs
  @RequestMapping(value = "/adm/reservation/all", method = RequestMethod.GET)
  public ResponseEntity<GetCustomerReservationsResponse> getAllReservations() {
    List<ReservationDTO> reservationDTOs = reservationService.getAllReservationDTOs();

    if (reservationDTOs == null) {
      return new ResponseEntity<>(new GetCustomerReservationsResponse("Invalid reservations id.", null),
          HttpStatus.NOT_FOUND);
    }
    return new ResponseEntity<>(
        new GetCustomerReservationsResponse("Reservation retrieved successfully.", reservationDTOs), HttpStatus.OK);
  }
}
