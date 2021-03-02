package dreamwok.reservation.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import dreamwok.reservation.model.CreditCard;

@Repository
public interface CreditCardRepository extends JpaRepository<CreditCard, Long> {
    // Page<CreditCard> findByCustomerIdOrNameOnCardContainsIgnoreCase(Long
    // customerid, String nameOnCard,
    // Pageable pageable);

    // boolean existsById(Long id);

    // CreditCard findById(Long id);

    @Query("SELECT c from CreditCard c WHERE c.customerId = ?1")
    List<CreditCard> findAllById(Long customerId);

    @Query("SELECT c from CreditCard c WHERE c.cardNumber = ?1")
    Boolean existsByCardNumber(String cardNumber);

    // @Query("SELECT m FROM CreditCard m WHERE m.id = ?1")
    // Optional<CreditCard> findByIdOptional(Long id);

}