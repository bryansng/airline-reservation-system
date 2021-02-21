package dreamwok.reservation.core.auth.response;

import dreamwok.reservation.model.Customer;

public class RegisterResponse extends SignInResponse {
  public RegisterResponse(String msg, Customer customer, String token) {
    super(msg, customer, token);
  }
}
