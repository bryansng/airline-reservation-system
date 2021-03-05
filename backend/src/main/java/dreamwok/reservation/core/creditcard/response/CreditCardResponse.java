package dreamwok.reservation.core.creditcard.response;

import java.util.List;

import dreamwok.reservation.model.CreditCardDetails;

public class CreditCardResponse {
    private String message;
    private List<CreditCardDetails> creditCards;

    public CreditCardResponse(String message, List<CreditCardDetails> creditCards) {
        this.setMessage(message);
        this.setCreditCards(creditCards);
    }

    public List<CreditCardDetails> getCreditCards() {
        return creditCards;
    }

    public void setCreditCards(List<CreditCardDetails> creditCards) {
        this.creditCards = creditCards;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
