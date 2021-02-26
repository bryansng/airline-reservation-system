package dreamwok.reservation.model;

import java.util.List;

import javax.persistence.*;

@Entity
@Table(name = "flights")
public class Flight {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private Double flightPrice;

  @OneToMany(mappedBy = "flight", cascade = CascadeType.ALL)
  private List<Reservation> reservations;

  public Flight() {
  }

  public Flight(Double flightPrice) {
    this.flightPrice = flightPrice;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Double getFlightPrice() {
    return flightPrice;
  }

  public void setFlightPrice(Double flightPrice) {
    this.flightPrice = flightPrice;
  }
}
