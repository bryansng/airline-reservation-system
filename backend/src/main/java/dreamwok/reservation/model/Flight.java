package dreamwok.reservation.model;

import java.util.List;

import javax.persistence.*;

@Entity
@Table(name = "flights")
public class Flight {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToMany(mappedBy = "flight", cascade = CascadeType.ALL)
  private List<Reservation> reservations;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }
}
