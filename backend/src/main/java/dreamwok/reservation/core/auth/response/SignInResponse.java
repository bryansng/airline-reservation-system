package dreamwok.reservation.core.auth.response;

import dreamwok.reservation.core.customer.response.CustomerResponse;
import dreamwok.reservation.model.Customer;

public class SignInResponse extends CustomerResponse {
  public SignInResponse(String msg, Customer customer) {
    super(msg, customer);
  }
}
