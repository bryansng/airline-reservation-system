package dreamwok.reservation.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import dreamwok.reservation.model.CreditCardDetails;

@Repository
public interface CreditCardDetailsRepository extends JpaRepository<CreditCardDetails, Long> {

    @Query("SELECT c from CreditCardDetails c WHERE c.cardNumber = ?1")
    Optional<CreditCardDetails> findByCardNumber(String cardNumber);
}
