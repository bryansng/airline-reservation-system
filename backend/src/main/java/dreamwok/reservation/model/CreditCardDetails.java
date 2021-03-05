package dreamwok.reservation.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import dreamwok.reservation.core.creditcard.request.CreditCardRequest;

@Entity
@Table(name = "credit_card_details")
public class CreditCardDetails {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotNull
  private Long customerId;

  private String nameOnCard;
  private String cardNumber;
  private String expiryDate;
  private String securityCode;
  private Boolean isSavePaymentDetails = false;

  // @ManyToOne(fetch = FetchType.LAZY)
  // private Customer customer;

  public CreditCardDetails() {
  }

  public CreditCardDetails(Long customerId, String nameOnCard, String cardNumber, String expiryDate,
      String securityCode) {
    this.customerId = customerId;
    this.nameOnCard = nameOnCard;
    this.cardNumber = cardNumber;
    this.expiryDate = expiryDate;
    this.securityCode = securityCode;
  }

  public CreditCardDetails(Long customerId, CreditCardRequest creditCardRequest) {
    this.setCustomerId(customerId);
    this.updateCard(creditCardRequest);
  }

  public void updateCard(CreditCardRequest newCard) {
    this.cardNumber = newCard.getCardNumber();
    this.nameOnCard = newCard.getNameOnCard();
    this.securityCode = newCard.getSecurityCode();
    this.expiryDate = newCard.getExpiryDate();
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getCustomerId() {
    return customerId;
  }

  public void setCustomerId(Long customerId) {
    this.customerId = customerId;
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

  // public Customer getCustomer() {
  //   return customer;
  // }

  // public void setCustomer(Customer customer) {
  //   this.customer = customer;
  // }
}
