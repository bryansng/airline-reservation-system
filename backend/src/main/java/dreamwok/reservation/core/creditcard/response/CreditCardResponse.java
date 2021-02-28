package dreamwok.reservation.core.creditcard.response;

import java.util.List;

import dreamwok.reservation.model.CreditCard;

public class CreditCardResponse {
    private String message;
    private List<CreditCard> creditCards;

    public CreditCardResponse(String message, List<CreditCard> creditCards) {
        this.setMessage(message);
        this.setCreditCards(creditCards);
    }

    public List<CreditCard> getCreditCards() {
        return creditCards;
    }

    public void setCreditCards(List<CreditCard> creditCards) {
        this.creditCards = creditCards;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
