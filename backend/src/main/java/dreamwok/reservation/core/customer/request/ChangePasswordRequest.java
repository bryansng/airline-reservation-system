package dreamwok.reservation.core.customer.request;

public class ChangePasswordRequest {
  private String email;
  private String oldPassword;
  private String newPassword;

  public ChangePasswordRequest(String email, String oldPassword, String newPassword) {
    this.email = email;
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
  }

  public String getEmail() {
    return this.email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getOldPassword() {
    return this.oldPassword;
  }

  public void setOldPassword(String oldPassword) {
    this.oldPassword = oldPassword;
  }

  public String getNewPassword() {
    return this.newPassword;
  }

  public void setNewPassword(String newPassword) {
    this.newPassword = newPassword;
  }
}
