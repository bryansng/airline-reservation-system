package dreamwok.reservation.model;

import java.time.LocalDateTime;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnore;

import dreamwok.reservation.core.customer.request.CustomerRequest;
import dreamwok.reservation.dto.CustomerDTO;

import java.util.List;

import javax.persistence.*;

@Entity
@Table(name = "customers")
public class Customer {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotEmpty
  private String email;
  private String firstName;
  private String lastName;
  private String address;
  private String phoneNum;
  private String roles = "USER";

  @Column(nullable = true)
  private LocalDateTime bornOn;
  private LocalDateTime joinedOn = LocalDateTime.now();
  private String type = "member";

  @OneToOne(cascade = CascadeType.ALL)
  // @OneToOne()
  private Auth auth;

  @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
  private List<Reservation> reservations;

  @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
  private List<Booking> bookings;

  // @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
  // private List<CreditCardDetails> creditCardDetails;

  public Customer() {

  }

  public Customer(CustomerDTO customerDTO) {
    this(customerDTO.getEmail(), customerDTO.getFirstName(), customerDTO.getLastName(), customerDTO.getAddress(),
        customerDTO.getMobileNumber());
  }

  public Customer(String email, String firstName, String lastName, String address, String phoneNum) {
    this.setEmail(email);
    this.setFirstName(firstName);
    this.setLastName(lastName);
    this.setAddress(address);
    this.setPhoneNum(phoneNum);
  }

  public String getRoles() {
    return roles;
  }

  public void setRoles(String roles) {
    this.roles = roles;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  @JsonIgnore
  public Auth getAuth() {
    return auth;
  }

  public void setAuth(Auth auth) {
    this.auth = auth;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPhoneNum() {
    return phoneNum;
  }

  public void setPhoneNum(String phoneNum) {
    this.phoneNum = phoneNum;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public LocalDateTime getJoinedOn() {
    return joinedOn;
  }

  public void setJoinedOn(LocalDateTime joinedOn) {
    this.joinedOn = joinedOn;
  }

  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public void update(CustomerRequest customerRequest) {
    this.setEmail(customerRequest.getEmail());
    this.setFirstName(customerRequest.getFirstName());
    this.setLastName(customerRequest.getLastName());
    this.setAddress(customerRequest.getAddress());
    this.setPhoneNum(customerRequest.getPhoneNum());
    // this.setType(type);
    // this.setAuth(this.auth);

    // switch (type.toLowerCase()) {
    //   case "member":
    //     this.setRoles("USER");
    //     break;
    //   case "librarian":
    //     this.setRoles("ADMIN");
    //     break;
    // }
  }

  public List<Reservation> getReservations() {
    return reservations;
  }

  public void setReservations(List<Reservation> reservations) {
    this.reservations = reservations;
  }

  public List<Booking> getBookings() {
    return bookings;
  }

  public void setBookings(List<Booking> bookings) {
    this.bookings = bookings;
  }

  // public List<CreditCardDetails> getCreditCardDetails() {
  //   return creditCardDetails;
  // }

  // public void setCreditCardDetails(List<CreditCardDetails> creditCardDetails) {
  //   this.creditCardDetails = creditCardDetails;
  // }
}