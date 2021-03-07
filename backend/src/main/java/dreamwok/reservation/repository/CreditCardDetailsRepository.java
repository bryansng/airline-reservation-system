package dreamwok.reservation.repository;

import dreamwok.reservation.model.CreditCardDetails;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CreditCardDetailsRepository extends JpaRepository<CreditCardDetails, Long> {
    @Query("SELECT c from CreditCardDetails c WHERE c.customerId = ?1")
    List<CreditCardDetails> findAllById(Long customerId);

    Boolean existsByCardNumber(String cardNumber);
}
