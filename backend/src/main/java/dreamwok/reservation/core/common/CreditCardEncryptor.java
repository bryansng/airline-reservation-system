package dreamwok.reservation.core.common;

import org.jasypt.util.text.*;
import org.springframework.stereotype.Service;

import dreamwok.reservation.core.creditcard.request.CreditCardRequest;
import dreamwok.reservation.model.CreditCardDetails;

@Service
public class CreditCardEncryptor {

    private StrongTextEncryptor textEncryptor;

    public CreditCardEncryptor() {
        textEncryptor = new StrongTextEncryptor();
        textEncryptor.setPassword("dreamwok");
    }

    public String encrypt(String input) {
        return textEncryptor.encrypt(input);
    }

    public String decrypt(String cipherText) {
        return textEncryptor.decrypt(cipherText);
    }

    public CreditCardRequest encryptCard(CreditCardRequest creditCardRequest) {
        String encryptedNameOnCard = this.encrypt(creditCardRequest.getNameOnCard());
        String encryptedCardNum = this.encrypt(creditCardRequest.getCardNumber());
        String encryptedExpiryDate = this.encrypt(creditCardRequest.getExpiryDate());
        String encryptedSecurityCode = this.encrypt(creditCardRequest.getSecurityCode());

        CreditCardRequest ccr = new CreditCardRequest(encryptedNameOnCard, encryptedCardNum, encryptedExpiryDate,
                encryptedSecurityCode);

        return ccr;
    }

    public CreditCardDetails decryptCard(CreditCardDetails card) {
        String decryptedNameOnCard = this.decrypt(card.getNameOnCard());
        String decryptedCardNum = this.decrypt(card.getCardNumber());
        String decryptedExpiryDate = this.decrypt(card.getExpiryDate());
        String decryptedSecurityCode = this.decrypt(card.getSecurityCode());

        card.setNameOnCard(decryptedNameOnCard);
        card.setCardNumber(decryptedCardNum);
        card.setExpiryDate(decryptedExpiryDate);
        card.setSecurityCode(decryptedSecurityCode);

        return card;
    }
}
