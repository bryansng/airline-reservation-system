package dreamwok.reservation.repository;

import dreamwok.reservation.model.CreditCardDetails;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CreditCardDetailsRepository extends JpaRepository<CreditCardDetails, Long> {

}
