package dreamwok.reservation.core.auth.response;

import dreamwok.reservation.model.Customer;

public class SignInResponse extends CustomerResponse {
  private String token;

  public SignInResponse(String msg, Customer customer, String token) {
    super(msg, customer);
    this.token = token;
  }

  public String getToken() {
    return this.token;
  }

  public void setToken(String token) {
    this.token = token;
  }
}
