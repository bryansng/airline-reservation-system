package dreamwok.reservation.core.customer.response;

import dreamwok.reservation.dto.CustomerDTO;

public class CustomerResponse {
    private CustomerDTO customer;
    private String statusCode;
    private String message;

    public CustomerResponse(String statusCode, String message, CustomerDTO customer) {
        this.statusCode = statusCode;
        this.message = message;
        this.customer = customer;
    }

    public CustomerResponse(String message, CustomerDTO customer) {
        this.message = message;
        this.customer = customer;
    }

    public String getStatusCode() {
        return this.statusCode;
    }

    public void setStatusCode(String statusCode) {
        this.statusCode = statusCode;
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
