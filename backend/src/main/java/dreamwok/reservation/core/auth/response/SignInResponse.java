package dreamwok.reservation.core.auth.response;

import dreamwok.reservation.core.customer.response.CustomerResponse;
import dreamwok.reservation.dto.CustomerDTO;

public class SignInResponse extends CustomerResponse {
  private String token;

  public SignInResponse(String statusCode, String msg, CustomerDTO customer, String token) {
    super(statusCode, msg, customer);
    this.token = token;
  }

  public SignInResponse(String msg, CustomerDTO customer) {
    super(msg, customer);
  }

  public String getToken() {
    return this.token;
  }

  public void setToken(String token) {
    this.token = token;
  }
}
