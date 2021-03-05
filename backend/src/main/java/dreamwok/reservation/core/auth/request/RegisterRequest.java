package dreamwok.reservation.core.auth.request;

import java.time.LocalDateTime;

import dreamwok.reservation.core.customer.request.CustomerRequest;

public class RegisterRequest extends CustomerRequest {
  private String password;

  public RegisterRequest(String email, String password, String firstName, String lastName, String address,
      String phoneNum, LocalDateTime bornOn) {
    super(email, firstName, lastName, address, phoneNum, bornOn);
    this.password = password;
  }

  public String getPassword() {
    return this.password;
  }

  public void setPassword(String password) {
    this.password = password;
  }
}
