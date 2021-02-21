package dreamwok.reservation.repository;

import dreamwok.reservation.model.Customer;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
  Page<Customer> findByIdOrFullNameContainsIgnoreCaseOrEmailContainsIgnoreCaseOrMobileNumberContainsOrAddressContainsIgnoreCaseOrTypeIgnoreCaseContains(
      Long id, String fullName, String email, String mobileNumber, String address, String type, Pageable pageable);

  boolean existsByEmail(String email);

  Customer findByEmail(String email);

  @Query("SELECT m FROM Customer m WHERE m.email = ?1")
  Optional<Customer> findByEmailOptional(String email);

}