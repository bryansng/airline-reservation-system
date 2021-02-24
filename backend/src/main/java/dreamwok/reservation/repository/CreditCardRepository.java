package dreamwok.reservation.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import dreamwok.reservation.model.CreditCard;

@Repository
public interface CreditCardRepository extends JpaRepository<CreditCard, Long> {
    Page<CreditCard> findByCustomerIdOrNameOnCardContainsIgnoreCase(Long customerid, String nameOnCard,
            Pageable pageable);

    boolean existsById(String id);

    CreditCard findById(String id);

    @Query("SELECT m FROM CreditCard m WHERE m.id = ?1")
    Optional<CreditCard> findByIdOptional(String id);

}