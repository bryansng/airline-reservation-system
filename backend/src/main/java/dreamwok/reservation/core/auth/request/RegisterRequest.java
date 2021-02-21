package dreamwok.reservation.core.auth.request;

public class RegisterRequest {
  private String email;
  private String password;
  private String username;

  public RegisterRequest(String email, String password, String username) {
    this.email = email;
    this.password = password;
    this.username = username;
  }

  public String getEmail() {
    return this.email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return this.password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getUsername() {
    return this.username;
  }

  public void setUsername(String username) {
    this.username = username;
  }
}
