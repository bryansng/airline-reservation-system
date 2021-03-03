package dreamwok.reservation.core.creditcard.response;

import java.util.List;

import dreamwok.reservation.dto.CreditCardDetailsDTO;

public class CreditCardResponse {
    private String message;
    private List<CreditCardDetailsDTO> creditCards;

    public CreditCardResponse(String message, List<CreditCardDetailsDTO> creditCards) {
        this.setMessage(message);
        this.setCreditCards(creditCards);
    }

    public List<CreditCardDetailsDTO> getCreditCards() {
        return creditCards;
    }

    public void setCreditCards(List<CreditCardDetailsDTO> creditCards) {
        this.creditCards = creditCards;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
