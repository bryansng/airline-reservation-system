package dreamwok.reservation.dto;

import dreamwok.reservation.model.Customer;

public class CustomerDTO {
  private Long id;
  private String email;
  private String firstName;
  private String lastName;
  private String mobileNumber = "";
  private String address = "";

  public CustomerDTO(Customer customer) {
    this.id = customer.getId();
    this.email = customer.getEmail();
    this.firstName = customer.getFirstName();
    this.lastName = customer.getLastName();
    this.mobileNumber = customer.getMobileNumber();
    this.address = customer.getAddress();
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
}
