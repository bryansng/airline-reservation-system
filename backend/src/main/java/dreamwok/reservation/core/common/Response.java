package dreamwok.reservation.core.common;

public class Response {
  private String message;
  private String statusCode;

  public Response(String message) {
    this(null, message);
  }

  public Response(String statusCode, String message) {
    this.statusCode = statusCode;
    this.message = message;
  }

  public String getMessage() {
    return this.message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public String getStatusCode() {
    return this.statusCode;
  }

  public void setStatusCode(String statusCode) {
    this.statusCode = statusCode;
  }
}
