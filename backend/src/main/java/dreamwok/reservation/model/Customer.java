package dreamwok.reservation.model;

import javax.validation.constraints.NotEmpty;
import com.fasterxml.jackson.annotation.JsonIgnore;

import dreamwok.reservation.service.Common;

import java.time.*;
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
  private String fullName;
  private String mobileNumber = "";
  private String address = "";
  private String website = "";
  private String roles = "USER";

  @Column(nullable = true)
  private LocalDateTime bornOn;
  private LocalDateTime joinedOn = LocalDateTime.now();
  private LocalDateTime lastActiveOn = LocalDateTime.now();
  private String bio;
  private String type = "member";

  @OneToOne(cascade = CascadeType.ALL)
  // @JoinColumn(referencedColumnName = "email")
  private Auth auth;

  public void setAll(String email, String fullName, String mobileNumber, String address, String website, String bornOn,
      String bio, String type) {
    setAll(email, fullName, mobileNumber, address, website, bornOn, bio, type, this.auth);
  }

  public void setAll(String email, String fullName, String mobileNumber, String address, String website, String bornOn,
      String bio, String type, Auth auth) {
    setEmail(email.equals("") ? this.email : email);
    setFullName(fullName.equals("") ? this.fullName : fullName);
    setMobileNumber(mobileNumber.equals("") ? this.mobileNumber : mobileNumber);
    setAddress(address.equals("") ? this.address : address);
    setWebsite(website.equals("") ? this.website : website);

    if (bornOn.equals("")) {
      setBornOn(null);
    } else {
      setBornOn(Common.convertStringDateToDateTime(bornOn));
    }

    setBio(bio);
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

  public String getInitials() {
    String[] words = fullName.split(" ");
    String initials = "";
    for (int i = 0; i < words.length && i != 5; i++) {
      String word = words[i];
      initials += String.valueOf(word.charAt(0)).toUpperCase();
    }
    return initials;
  }

  public String processLastActiveOn() {
    LocalDateTime now = LocalDateTime.now();
    Duration diff = Duration.between(lastActiveOn, now);
    if (diff.getSeconds() == 0) {
      return "Currently online";
    }

    if (diff.getSeconds() < 60) {
      return diff.getSeconds() + " seconds ago";
    } else {
      long minutes = diff.toMinutes();
      if (minutes < 60) {
        return minutes + " minutes ago";
      } else if (minutes >= 1440) {
        return (minutes / 1440) + " days ago";
      }
    }
    return "Currently online";
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

  public String getWebsite() {
    return website;
  }

  public void setWebsite(String website) {
    this.website = website;
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

  public LocalDateTime getLastActiveOn() {
    return lastActiveOn;
  }

  public void setLastActiveOn(LocalDateTime lastActiveOn) {
    this.lastActiveOn = lastActiveOn;
  }

  public String getBio() {
    return bio;
  }

  public void setBio(String bio) {
    this.bio = bio;
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

  public String toString() {
    String buf = " - ";
    return id + buf + fullName + buf + getInitials() + buf + processLastActiveOn() + buf + email + buf + mobileNumber
        + buf + address + buf + type;
  }

  public String toStringWithAuth() {
    String buf = " - ";
    return id + buf + fullName + buf + getInitials() + buf + email + buf + mobileNumber + buf + address + buf + type
        + "\n" + auth.getEmail() + buf + auth.getHash();
  }
}