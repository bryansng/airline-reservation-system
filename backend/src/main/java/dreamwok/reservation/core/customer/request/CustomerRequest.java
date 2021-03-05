package dreamwok.reservation.core.customer.request;

import java.time.LocalDateTime;

public class CustomerRequest {

    private String email;
    private String firstName;
    private String lastName;
    private String address;
    private String phoneNum;
    private LocalDateTime bornOn;

    public CustomerRequest() {

    }

    public CustomerRequest(String email, String firstName, String lastName, String address, String phoneNum,
            LocalDateTime bornOn) {
        this.setEmail(email);
        this.setFirstName(firstName);
        this.setLastName(lastName);
        this.setAddress(address);
        this.setPhoneNum(phoneNum);
        this.setBornOn(bornOn);
    }

    public LocalDateTime getBornOn() {
        return bornOn;
    }

    public void setBornOn(LocalDateTime bornOn) {
        this.bornOn = bornOn;
    }

    public String getPhoneNum() {
        return phoneNum;
    }

    public void setPhoneNum(String phoneNum) {
        this.phoneNum = phoneNum;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
