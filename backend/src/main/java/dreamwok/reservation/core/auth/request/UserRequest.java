package dreamwok.reservation.core.auth.request;

public class UserRequest {
    private String email;
    private String username;

    public UserRequest() {

    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
