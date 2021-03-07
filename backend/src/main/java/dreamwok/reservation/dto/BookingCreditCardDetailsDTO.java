package dreamwok.reservation.dto;

import dreamwok.reservation.model.CreditCardDetails;

public class BookingCreditCardDetailsDTO {
  private Long id;
  private String nameOnCard;
  private String cardNumber;
  private String expiryDate;
  private String securityCode;
  private Boolean isSavePaymentDetails = false;
  private Long customerId;

  public BookingCreditCardDetailsDTO() {
  }

  public BookingCreditCardDetailsDTO(CreditCardDetails creditCardDetails) {
    this.id = creditCardDetails.getId();
    this.nameOnCard = creditCardDetails.getNameOnCard();
    this.cardNumber = creditCardDetails.getCardNumber();
    this.expiryDate = creditCardDetails.getExpiryDate();
    this.securityCode = creditCardDetails.getSecurityCode();
    this.customerId = creditCardDetails.getCustomerId();
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

  public Boolean getIsSavePaymentDetails() {
    return isSavePaymentDetails;
  }

  public void setIsSavePaymentDetails(Boolean isSavePaymentDetails) {
    this.isSavePaymentDetails = isSavePaymentDetails;
  }

  public Long getCustomerId() {
    return customerId;
  }

  public void setCustomerId(Long customerId) {
    this.customerId = customerId;
  }
}
