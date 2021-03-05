package dreamwok.reservation.core.customer.response;

import dreamwok.reservation.dto.CustomerDTO;

public class CustomerResponse {
    private CustomerDTO customer;
    private String message;

    public CustomerResponse(String message, CustomerDTO customer) {
        this.message = message;
        this.customer = customer;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public CustomerDTO getCustomer() {
        return this.customer;
    }

    public void setCustomer(CustomerDTO customer) {
        this.customer = customer;
    }
}
