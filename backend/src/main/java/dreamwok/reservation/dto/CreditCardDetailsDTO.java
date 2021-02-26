package dreamwok.reservation.dto;

import dreamwok.reservation.model.CreditCardDetails;

public class CreditCardDetailsDTO {
  private Long id;
  private String nameOnCard;
  private String cardNumber;
  private String expiryDate;
  private String securityCode;

  public CreditCardDetailsDTO(CreditCardDetails creditCardDetails) {
    this.id = creditCardDetails.getId();
    this.nameOnCard = creditCardDetails.getNameOnCard();
    this.cardNumber = creditCardDetails.getCardNumber();
    this.expiryDate = creditCardDetails.getExpiryDate();
    this.securityCode = creditCardDetails.getSecurityCode();
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getNameOnCard() {
    return nameOnCard;
  }

  public void setNameOnCard(String nameOnCard) {
    this.nameOnCard = nameOnCard;
  }

  public String getCardNumber() {
    return cardNumber;
  }

  public void setCardNumber(String cardNumber) {
    this.cardNumber = cardNumber;
  }

  public String getExpiryDate() {
    return expiryDate;
  }

  public void setExpiryDate(String expiryDate) {
    this.expiryDate = expiryDate;
  }

  public String getSecurityCode() {
    return securityCode;
  }

  public void setSecurityCode(String securityCode) {
    this.securityCode = securityCode;
  }
}
