package dreamwok.reservation.dto;

import dreamwok.reservation.model.Booking;

public class BookingDTO {
  private Long id;
  private Boolean isCheckedIn = false;
  private Boolean isCancelled = false;
  private CustomerDTO customer;

  public BookingDTO(Long id, Boolean isCheckedIn, Boolean isCancelled, CustomerDTO customer) {
    this.id = id;
    this.isCheckedIn = isCheckedIn;
    this.isCancelled = isCancelled;
    this.customer = customer;
  }

  public BookingDTO(Booking booking) {
    this.id = booking.getId();
    this.isCheckedIn = booking.getIsCheckedIn();
    this.isCancelled = booking.getIsCancelled();
    this.customer = new CustomerDTO(booking.getCustomer());
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Boolean getIsCheckedIn() {
    return isCheckedIn;
  }

  public void setIsCheckedIn(Boolean isCheckedIn) {
    this.isCheckedIn = isCheckedIn;
  }

  public Boolean getIsCancelled() {
    return isCancelled;
  }

  public void setIsCancelled(Boolean isCancelled) {
    this.isCancelled = isCancelled;
  }

  public CustomerDTO getCustomer() {
    return customer;
  }

  public void setCustomer(CustomerDTO customer) {
    this.customer = customer;
  }
}
