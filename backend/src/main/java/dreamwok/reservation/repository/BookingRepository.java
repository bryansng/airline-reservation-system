package dreamwok.reservation.repository;

import dreamwok.reservation.model.Booking;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

  // find all bookings for a reservation
  List<Booking> findByReservationId(Long reservationId);
}
