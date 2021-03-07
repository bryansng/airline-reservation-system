package dreamwok.reservation.core.creditcard.response;

import dreamwok.reservation.dto.CreditCardDetailsDTO;

public class GetCreditCardResponse {
  private String message;
  private CreditCardDetailsDTO creditCard;

  public GetCreditCardResponse(String message, CreditCardDetailsDTO creditCard) {
    this.setMessage(message);
    this.setCreditCard(creditCard);
  }

  public CreditCardDetailsDTO getCreditCard() {
    return creditCard;
  }

  public void setCreditCard(CreditCardDetailsDTO creditCard) {
    this.creditCard = creditCard;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }
}
