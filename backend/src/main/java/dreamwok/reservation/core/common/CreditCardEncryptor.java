package dreamwok.reservation.core.common;

import org.jasypt.util.text.*;
import org.springframework.stereotype.Service;

@Service
public class CreditCardEncryptor {

    private StrongTextEncryptor textEncryptor;

    public CreditCardEncryptor() {
        textEncryptor = new StrongTextEncryptor();
        textEncryptor.setPassword("returntomonke1234");
    }

    public String encrypt(String input) {
        return textEncryptor.encrypt(input);
    }

    public String decrypt(String cipherText) {
        return textEncryptor.decrypt(cipherText);
    }
}
