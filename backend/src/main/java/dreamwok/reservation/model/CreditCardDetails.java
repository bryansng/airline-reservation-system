package dreamwok.reservation.model;

import javax.persistence.*;

@Entity
@Table(name = "credit_card_details")
public class CreditCardDetails {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String nameOnCard;
  private String cardNumber;
  private String expiryDate;
  private String securityCode;
  private Boolean isSavePaymentDetails = false;

  @ManyToOne(fetch = FetchType.LAZY)
  private Customer customer;

  public CreditCardDetails() {
  }

  public CreditCardDetails(String nameOnCard, String cardNumber, String expiryDate, String securityCode) {
    this.nameOnCard = nameOnCard;
    this.cardNumber = cardNumber;
    this.expiryDate = expiryDate;
    this.securityCode = securityCode;
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

  public Customer getCustomer() {
    return customer;
  }

  public void setCustomer(Customer customer) {
    this.customer = customer;
  }
}
