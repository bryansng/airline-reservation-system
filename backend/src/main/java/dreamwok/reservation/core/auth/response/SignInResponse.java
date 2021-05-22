package dreamwok.reservation.core.auth.response;

import dreamwok.reservation.core.customer.response.CustomerResponse;
import dreamwok.reservation.dto.CustomerDTO;

public class SignInResponse extends CustomerResponse {
  public SignInResponse(String statusCode, String msg, CustomerDTO customer) {
    super(statusCode, msg, customer);
  }

  public SignInResponse(String msg, CustomerDTO customer) {
    super(msg, customer);
  }
}
