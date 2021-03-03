package dreamwok.reservation.model;

import javax.persistence.*;

import dreamwok.reservation.core.creditcard.request.CreditCardRequest;

@Entity
@Table(name = "credit_card_details")
public class CreditCardDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Customer customer;

    private String nameOnCard;
    private String cardNumber;
    private String expiryDate;
    private String securityCode;

    public CreditCardDetails() {
    }

    public CreditCardDetails(Customer customer, String nameOnCard, String cardNumber, String expiryDate,
            String securityCode) {
        this.customer = customer;
        this.nameOnCard = nameOnCard;
        this.cardNumber = cardNumber;
        this.expiryDate = expiryDate;
        this.securityCode = securityCode;
    }

    public CreditCardDetails(Customer customer, CreditCardRequest creditCardRequest) {
        this.setCustomer(customer);
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

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
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

    public String customerToString() {
        return "derp: " + this.customer.getFirstName();
    }

    public String toString1() {
        return "id: " + this.id + "\ncustomer: " + this.customer.toString() + "\nnameOnCard: " + this.nameOnCard
                + "\ncardNumber: " + this.cardNumber + "\nexpiryDate: " + this.expiryDate + "\nsecurityCode: "
                + this.securityCode;

    }

    public String toString2() {
        return "id: " + this.id + "\nnameOnCard: " + this.nameOnCard + "\ncardNumber: " + this.cardNumber
                + "\nexpiryDate: " + this.expiryDate + "\nsecurityCode: " + this.securityCode;

    }
}
