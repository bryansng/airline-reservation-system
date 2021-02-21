package dreamwok.reservation.core.auth.request;

public class UserByTokenRequest {
  private String token;

  public UserByTokenRequest() {

  }

  public UserByTokenRequest(String token) {
    this.token = token;
  }

  public String getToken() {
    return this.token;
  }

  public void setToken(String token) {
    this.token = token;
  }
}