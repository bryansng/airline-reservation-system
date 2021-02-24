package dreamwok.reservation.core.customer.response;

import dreamwok.reservation.model.Customer;

public class CustomerResponse {
    private Customer customer;
    private String message;

    public CustomerResponse(String message, Customer customer) {
        this.message = message;
        this.customer = customer;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Customer getCustomer() {
        return this.customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
}
