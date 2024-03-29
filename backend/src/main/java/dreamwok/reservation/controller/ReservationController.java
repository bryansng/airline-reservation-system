package dreamwok.reservation.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

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
import dreamwok.reservation.model.Customer;
import dreamwok.reservation.model.Reservation;
import dreamwok.reservation.service.CustomerService;
import dreamwok.reservation.service.LoginIPAttemptService;
import dreamwok.reservation.service.ReservationService;
import lombok.extern.log4j.Log4j2;

@RestController
@CrossOrigin
@Log4j2
public class ReservationController {
  @Autowired
  private CustomerService customerService;

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
      @PathVariable("customerId") Long customerId, Principal principal, HttpServletRequest request) {
    Customer customer = customerService.getCustomerById(customerId);
    String ipAddress = loginIPAttemptService.getClientIP(request);
    List<Reservation> reservations = reservationService.getCustomerReservations(customerId);

    if (!customerService.isAuthUserChangingOwnData(customer, principal)) {
      log.debug(String.format("Failed to retrieve reservations for customer id %s by IP %s due to improper access.",
          customerId, ipAddress));
      return new ResponseEntity<>(new GetCustomerReservationsResponse("Improper access.", null),
          HttpStatus.BAD_REQUEST);
    }

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

  @RequestMapping(value = "/admin/reservation/cancel/{reservationId}", method = RequestMethod.PUT)
  public ResponseEntity<CancelResponse> adminCancelReservation(@PathVariable("reservationId") Long reservationId,
      HttpServletRequest httpRequest) {
    String ipAddress = loginIPAttemptService.getClientIP(httpRequest);
    Reservation reservation = reservationService.cancelReservation(reservationId);

    if (reservation == null) {
      log.debug(
          String.format("Failed to cancel reservation id %s by an admin with IP %s due to invalid reservation id.",
              reservationId, ipAddress));
      return new ResponseEntity<>(new CancelResponse("Invalid reservation id.", null), HttpStatus.NOT_FOUND);
    }

    ReservationDTO reservationDTO = new ReservationDTO(reservation);
    log.debug(String.format("Successfully cancelled reservation id %s by an admin with IP %s.", reservation.getId(),
        ipAddress));
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

  @RequestMapping(value = "/admin/reservation/edit/{reservationId}", method = RequestMethod.PUT)
  public ResponseEntity<CancelResponse> adminEditReservation(@PathVariable("reservationId") Long reservationId,
      @RequestBody AdminEditReservationRequest request, HttpServletRequest httpRequest) {
    String ipAddress = loginIPAttemptService.getClientIP(httpRequest);
    Reservation reservation = reservationService.adminEditReservation(reservationId, request);

    if (reservation == null) {
      log.debug(String.format("Failed to edit reservation id %s by an admin with IP %s due to invalid reservation id.",
          reservationId, ipAddress));
      return new ResponseEntity<>(new CancelResponse("Invalid reservation id.", null), HttpStatus.NOT_FOUND);
    }

    ReservationDTO reservationDTO = new ReservationDTO(reservation);
    log.debug(
        String.format("Successfully edited reservation id %s by an admin with IP %s.", reservation.getId(), ipAddress));
    return new ResponseEntity<>(new CancelResponse("Reservation edited successfully.", reservationDTO), HttpStatus.OK);
  }

  // GetCustomerReservationsResponse contains a list of reservationDTOs
  @RequestMapping(value = "/admin/reservation/all", method = RequestMethod.GET)
  public ResponseEntity<GetCustomerReservationsResponse> getAllReservations(HttpServletRequest httpRequest) {
    String ipAddress = loginIPAttemptService.getClientIP(httpRequest);
    List<ReservationDTO> reservationDTOs = reservationService.getAllReservationDTOs();

    if (reservationDTOs == null) {
      log.debug(
          String.format("Failed to get all reservations by an admin with IP %s due to null reservations.", ipAddress));
      return new ResponseEntity<>(new GetCustomerReservationsResponse("There are null reservations.", null),
          HttpStatus.NOT_FOUND);
    }
    log.debug(String.format("Successfully retrieved reservations by an admin with IP %s.", ipAddress));
    return new ResponseEntity<>(
        new GetCustomerReservationsResponse("Reservation retrieved successfully.", reservationDTOs), HttpStatus.OK);
  }
}
