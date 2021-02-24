package dreamwok.reservation.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "customers")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    @NotEmpty
    private String email;
    private String firstName;
    private String lastName;
    private String address;
    private String phoneNum;
    // private Membership membershipType;
    private String roles = "USER";

    @Column(nullable = true)
    private String type = "member";

    @OneToOne(cascade = CascadeType.ALL)
    private Auth auth;

    public Customer() {

    }

    public Customer(String email, String firstName, String lastName, String address, String phoneNum, String type) {
        this.setEmail(email);
        this.setFirstName(firstName);
        this.setLastName(lastName);
        this.setAddress(address);
        this.setPhoneNum(phoneNum);
        this.setType(type);
        // this.setMembershipType(membershipType);
    }

    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @JsonIgnore
    public Auth getAuth() {
        return auth;
    }

    public void setAuth(Auth auth) {
        this.auth = auth;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNum() {
        return phoneNum;
    }

    public void setPhoneNum(String phoneNum) {
        this.phoneNum = phoneNum;
    }

    // public Membership getMembershipType() {
    //     return membershipType;
    // }

    // public String getMembershipTypeToString() {
    //     return membershipType.toString();
    // }

    // public void setMembershipType(Membership membershipType) {
    //     this.membershipType = membershipType;
    // }

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

    public void setAll(Customer newCustomer) {
        this.setEmail(newCustomer.getEmail());
        this.setFirstName(newCustomer.getFirstName());
        this.setLastName(newCustomer.getLastName());
        this.setAddress(newCustomer.getAddress());
        this.setPhoneNum(newCustomer.getPhoneNum());
        this.setType(type);
        this.setAuth(this.auth);

        switch (type.toLowerCase()) {
            case "member":
                this.setRoles("USER");
                break;
            case "librarian":
                this.setRoles("ADMIN");
                break;

        }
    }

    // public Boolean isExecutive() {
    //     return membershipType.equals(Membership.EXECUTIVE_CLUB);
    // }

    // public Boolean isGuest() {
    //     return membershipType.equals(Membership.GUEST);
    // }

    public String getInitials() {
        String fullName = this.firstName + " " + this.lastName;
        String[] words = fullName.split(" ");
        String initials = "";
        for (int i = 0; i < words.length && i != 5; i++) {
            String word = words[i];
            initials += String.valueOf(word.charAt(0)).toUpperCase();
        }
        return initials;
    }
}