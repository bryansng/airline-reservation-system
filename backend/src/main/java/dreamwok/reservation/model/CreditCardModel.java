package dreamwok.reservation.model;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;

public class CreditCardModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    @NotEmpty
    private String customerIDd;
    private String nameOnCard;
    private String cardNumber;
    private String expiryDate;
    private String securityCode;

    public CreditCardModel(@NotEmpty String customerIDd, String nameOnCard, String cardNumber, String expiryDate,
            String securityCode) {
        this.customerIDd = customerIDd;
        this.setNameOnCard(nameOnCard);
        this.setCardNumber(cardNumber);
        this.setExpiryDate(expiryDate);
        this.setSecurityCode(securityCode);
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
}
