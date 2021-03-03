package dreamwok.reservation.core.customer.response;

import dreamwok.reservation.dto.CustomerDTO;

public class CustomerResponse {
    private CustomerDTO customerDTO;
    private String message;

    public CustomerResponse(String message, CustomerDTO customerDTO) {
        this.message = message;
        this.customerDTO = customerDTO;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public CustomerDTO getCustomer() {
        return this.customerDTO;
    }

    public void setCustomer(CustomerDTO customerDTO) {
        this.customerDTO = customerDTO;
    }
}
