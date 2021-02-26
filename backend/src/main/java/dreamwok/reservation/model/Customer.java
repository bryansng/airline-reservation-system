package dreamwok.reservation.model;

import javax.validation.constraints.NotEmpty;
import com.fasterxml.jackson.annotation.JsonIgnore;

import dreamwok.reservation.service.Common;

import java.time.*;
import java.util.List;

import javax.persistence.*;

@Entity
@Table(name = "customers")
public class Customer {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotEmpty
  // @Column(name = "email", insertable = false, updatable = false)
  private String email;
  private String firstName;
  private String lastName;
  private String fullName;
  private String mobileNumber = "";
  private String address = "";
  private String roles = "USER";

  @Column(nullable = true)
  private LocalDateTime bornOn;
  private LocalDateTime joinedOn = LocalDateTime.now();
  private String type = "member";

  @OneToOne(cascade = CascadeType.ALL)
  // @JoinColumn(referencedColumnName = "email")
  private Auth auth;

  @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
  private List<Reservation> reservations;

  @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
  private List<Booking> bookings;

  public void setAll(String email, String fullName, String mobileNumber, String address, String bornOn, String type) {
    setAll(email, fullName, mobileNumber, address, bornOn, type, this.auth);
  }

  public void setAll(String email, String fullName, String mobileNumber, String address, String bornOn, String type,
      Auth auth) {
    setEmail(email.equals("") ? this.email : email);
    setFullName(fullName.equals("") ? this.fullName : fullName);
    setMobileNumber(mobileNumber.equals("") ? this.mobileNumber : mobileNumber);
    setAddress(address.equals("") ? this.address : address);

    if (bornOn.equals("")) {
      setBornOn(null);
    } else {
      setBornOn(Common.convertStringDateToDateTime(bornOn));
    }

    setType(type);
    setAuth(auth);

    switch (type.toLowerCase()) {
      case "member":
        setRoles("USER");
        break;
      case "librarian":
        setRoles("ADMIN");
        break;
    }
  }

  @JsonIgnore
  public Auth getAuth() {
    return auth;
  }

  public void setAuth(Auth auth) {
    this.auth = auth;
  }

  public Boolean isAdmin() {
    return type.equals("librarian");
  }

  public Boolean isMember() {
    return type.equals("member");
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getFullName() {
    return fullName;
  }

  public void setFullName(String fullName) {
    this.fullName = fullName;
  }

  public String getMobileNumber() {
    return mobileNumber;
  }

  public void setMobileNumber(String mobileNumber) {
    this.mobileNumber = mobileNumber;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public LocalDateTime getBornOn() {
    return bornOn;
  }

  public void setBornOn(LocalDateTime bornOn) {
    this.bornOn = bornOn;
  }

  public LocalDateTime getJoinedOn() {
    return joinedOn;
  }

  public void setJoinedOn(LocalDateTime joinedOn) {
    this.joinedOn = joinedOn;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public String getRoles() {
    return roles;
  }

  public void setRoles(String roles) {
    this.roles = roles;
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
}