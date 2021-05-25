package dreamwok.reservation.core.auth.request;

public class TestRequest {
  private String message;

  public TestRequest(String message) {
    this.message = message;
  }

  public String getMessage() {
    return this.message;
  }

  public void setMessage(String message) {
    this.message = message;
  }
}