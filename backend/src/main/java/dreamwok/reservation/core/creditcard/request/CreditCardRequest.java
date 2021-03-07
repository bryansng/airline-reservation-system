package dreamwok.reservation.core.creditcard.request;

import dreamwok.reservation.dto.BookingCreditCardDetailsDTO;
import dreamwok.reservation.model.CreditCardDetails;

public class CreditCardRequest {

    private String nameOnCard;
    private String cardNumber;
    private String expiryDate;
    private String securityCode;

    public CreditCardRequest() {

    }

    public CreditCardRequest(BookingCreditCardDetailsDTO creditCardDetails) {
        this(creditCardDetails.getNameOnCard(), creditCardDetails.getCardNumber(), creditCardDetails.getExpiryDate(),
                creditCardDetails.getSecurityCode());
    }

    public CreditCardRequest(CreditCardDetails creditCardDetails) {
        this(creditCardDetails.getNameOnCard(), creditCardDetails.getCardNumber(), creditCardDetails.getExpiryDate(),
                creditCardDetails.getSecurityCode());
    }

    public CreditCardRequest(String nameOnCard, String cardNumber, String expiryDate, String securityCode) {
        this.nameOnCard = nameOnCard;
        this.cardNumber = cardNumber;
        this.expiryDate = expiryDate;
        this.securityCode = securityCode;
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
