package dreamwok.reservation.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import dreamwok.reservation.core.reservation.response.CancelResponse;
import dreamwok.reservation.core.reservation.response.GetCustomerReservationsResponse;
import dreamwok.reservation.core.reservation.response.GetReservationByIdResponse;
import dreamwok.reservation.dto.ReservationDTO;
import dreamwok.reservation.model.Reservation;
import dreamwok.reservation.service.LoginIPAttemptService;
import dreamwok.reservation.service.ReservationService;
import lombok.extern.log4j.Log4j2;

@RestController
@CrossOrigin
@Log4j2
public class ReservationController {
  @Autowired
  private ReservationService reservationService;

  @Autowired
  private LoginIPAttemptService loginIPAttemptService;

  /*
   * /reservations GET { customerId: String } returns { reservations:
   * List<Reservation> [{ reservation: Reservation object }] }
   */
  @RequestMapping(value = "/customer/reservations/{customerId}", method = RequestMethod.GET)
  public ResponseEntity<GetCustomerReservationsResponse> getCustomerReservations(
      @PathVariable("customerId") Long customerId, HttpServletRequest request) {
    String ipAddress = loginIPAttemptService.getClientIP(request);
    List<Reservation> reservations = reservationService.getCustomerReservations(customerId);

    if (reservations == null) {
      log.debug(String.format("Failed to retrieve reservations for customer id %s by IP %s due to invalid customer id.",
          customerId, ipAddress));
      return new ResponseEntity<>(new GetCustomerReservationsResponse("Invalid customer id.", null),
          HttpStatus.NOT_FOUND);
    }

    List<ReservationDTO> reservationsDTO = new ArrayList<ReservationDTO>();
    for (Reservation reservation : reservations) {
      reservationsDTO.add(new ReservationDTO(reservation));
    }
    log.debug(String.format("Successfully retrieved reservations for customer id %s by IP %s.", customerId, ipAddress));
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
      @PathVariable("reservationId") Long reservationId, HttpServletRequest request) {
    String ipAddress = loginIPAttemptService.getClientIP(request);
    Reservation reservation = reservationService.getReservationById(reservationId);

    if (reservation == null) {
      log.debug(String.format("Failed to retrieve reservation id %s by IP %s due to invalid reservation id.",
          reservationId, ipAddress));
      return new ResponseEntity<>(new GetReservationByIdResponse("Invalid reservation id.", null),
          HttpStatus.NOT_FOUND);
    }

    ReservationDTO reservationDTO = new ReservationDTO(reservation);
    log.debug(String.format("Successfully retrieved reservation id %s by IP %s.", reservation.getId(), ipAddress));
    return new ResponseEntity<>(new GetReservationByIdResponse("Reservation retrieved successfully.", reservationDTO),
        HttpStatus.OK);
  }

  @RequestMapping(value = "/reservation/{customerLastName}/{reservationId}", method = RequestMethod.GET)
  public ResponseEntity<GetReservationByIdResponse> getReservationByIdAndCustomerLastName(
      @PathVariable("customerLastName") String customerLastName, @PathVariable("reservationId") Long reservationId,
      HttpServletRequest request) {
    String ipAddress = loginIPAttemptService.getClientIP(request);
    Reservation reservation = reservationService.getReservationByIdAndCustomerLastName(customerLastName, reservationId);

    if (reservation == null) {
      log.debug(String.format(
          "Failed to retrieve reservation by id %s and customer last name %s by IP %s due to invalid reservation id or incorrect reservation id with customer last name.",
          reservationId, customerLastName, ipAddress));
      return new ResponseEntity<>(new GetReservationByIdResponse(
          "Invalid reservation id or incorrect reservation id with customer last name.", null), HttpStatus.NOT_FOUND);
    }

    ReservationDTO reservationDTO = new ReservationDTO(reservation);
    log.debug(String.format("Successfully retrieved reservation by id %s and customer last name %s by IP %s.",
        reservation.getId(), customerLastName, ipAddress));
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
  public ResponseEntity<CancelResponse> cancelReservation(@PathVariable("reservationId") Long reservationId,
      HttpServletRequest request) {
    String ipAddress = loginIPAttemptService.getClientIP(request);
    Reservation reservation = reservationService.cancelReservation(reservationId);

    if (reservation == null) {
      log.debug(String.format("Failed to cancel reservation id %s by IP %s due to invalid reservation id.",
          reservationId, ipAddress));
      return new ResponseEntity<>(new CancelResponse("Invalid reservation id.", null), HttpStatus.NOT_FOUND);
    }

    ReservationDTO reservationDTO = new ReservationDTO(reservation);
    log.debug(String.format("Successfully cancelled reservation id %s by IP %s.", reservation.getId(), ipAddress));
    return new ResponseEntity<>(new CancelResponse("Reservation cancelled successfully.", reservationDTO),
        HttpStatus.OK);
  }
}
