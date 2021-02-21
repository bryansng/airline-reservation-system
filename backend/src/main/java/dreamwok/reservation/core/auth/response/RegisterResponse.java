package dreamwok.reservation.core.auth.response;

import dreamwok.reservation.model.Customer;

public class RegisterResponse extends SignInResponse {
  public RegisterResponse(String msg, Customer customer) {
    super(msg, customer);
  }
}
