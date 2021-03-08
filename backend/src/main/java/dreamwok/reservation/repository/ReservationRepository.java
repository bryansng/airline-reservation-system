package dreamwok.reservation.repository;

import dreamwok.reservation.model.Reservation;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
  // get all by customerId, sorted by flight depature date, then reservation_status.
  List<Reservation> findByCustomerIdOrderByFlightDepartureDateTimeDescReservationStatusAsc(Long customerId);

  // DEPRECATED.
  // get all by customerId, sorted by created_on, then reservation_status.
  // List<Reservation> findByCustomerIdOrderByCreatedOnDescReservationStatusAsc(Long customerId);
}
