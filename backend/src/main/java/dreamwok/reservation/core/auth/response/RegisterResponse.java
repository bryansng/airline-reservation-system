package dreamwok.reservation.core.auth.response;

import dreamwok.reservation.dto.CustomerDTO;

public class RegisterResponse extends SignInResponse {
  public RegisterResponse(String msg, CustomerDTO customer) {
    super(msg, customer);
  }
}
