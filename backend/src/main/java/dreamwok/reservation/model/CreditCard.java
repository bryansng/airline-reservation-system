package dreamwok.reservation.model;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;

import dreamwok.reservation.core.creditcard.request.CreditCardRequest;

public class CreditCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    @NotEmpty
    private String customerId;
    private String nameOnCard;
    private String cardNumber;
    private String expiryDate;
    private String securityCode;

    public CreditCard(@NotEmpty String customerId, String nameOnCard, String cardNumber, String expiryDate,
            String securityCode) {
        this.customerId = customerId;
        this.setNameOnCard(nameOnCard);
        this.setCardNumber(cardNumber);
        this.setExpiryDate(expiryDate);
        this.setSecurityCode(securityCode);
    }

    public String getId() {
        return id;
    }

    public String getSecurityCode() {
        return securityCode;
    }

    public void setSecurityCode(String securityCode) {
        this.securityCode = securityCode;
    }

    public String getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(String expiryDate) {
        this.expiryDate = expiryDate;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getNameOnCard() {
        return nameOnCard;
    }

    public void setNameOnCard(String nameOnCard) {
        this.nameOnCard = nameOnCard;
    }

    public void updateCard(CreditCardRequest newCard) {
        this.cardNumber = newCard.getCardNumber();
        this.nameOnCard = newCard.getNameOnCard();
        this.securityCode = newCard.getSecurityCode();
        this.expiryDate = newCard.getExpiryDate();
    }
}
