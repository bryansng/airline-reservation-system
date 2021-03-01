package dreamwok.reservation.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import dreamwok.reservation.core.creditcard.request.CreditCardRequest;

@Entity
@Table(name = "card")
public class CreditCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private Long customerId;

    @NotEmpty
    private String nameOnCard;
    private String cardNumber;
    private String expiryDate;
    private String securityCode;

    public CreditCard() {

    }

    public CreditCard(Long customerId, String nameOnCard, String cardNumber, String expiryDate, String securityCode) {
        this.setCustomerId(customerId);
        this.setNameOnCard(nameOnCard);
        this.setCardNumber(cardNumber);
        this.setExpiryDate(expiryDate);
        this.setSecurityCode(securityCode);
    }

    public CreditCard(Long customerId, CreditCardRequest creditCardRequest) {
        this.setCustomerId(customerId);
        this.updateCard(creditCardRequest);
    }

    public Long getId() {
        return id;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
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
