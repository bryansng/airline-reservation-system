package dreamwok.reservation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import dreamwok.reservation.model.Auth;

@Repository
public interface AuthRepository extends JpaRepository<Auth, String> {
  Auth findByEmail(String email);

  @Query("SELECT email FROM Auth AUTH WHERE AUTH.email = ?1")
  String findEmailByEmail(String email);

  boolean existsByEmail(String email);
}
