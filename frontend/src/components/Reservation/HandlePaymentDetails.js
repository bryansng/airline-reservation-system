import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { rest_endpoints } from "../../config/rest_endpoints.json";
const { credit_card: credit_card_apis } = rest_endpoints;

const Button = styled.button.attrs({
  className: `ma2 relative w-100 b--gray ma0 br2 ba hover-bg-light-gray tc`,
})`
  padding: 6px 20px;
  transition: 0.15s ease-out;
  background-color: transparent;
  min-width: 100px;
  &:hover {
    border-color: #505050;
    transition: 0.15s ease-in;
  }
  ${(props) => props.disabled && `pointer-events: none;`}
`;

const HandlePaymentDetails = ({
  setPaymentDetails,
  loggedInUser,
  isAuthenticated,
}) => {
  const [savedCreditCards, setSavedCreditCards] = useState([]);
  const [creditCardFormDefaultInput, setCreditCardFormDefaultInput] = useState({
    nameOnCard: "",
    cardNumber: "",
    expiryDate: "",
    securityCode: "",
  });
  // const [creditCardFormDefaultInput, setCreditCardFormDefaultInput] = useState({
  //   nameOnCard: "testNameOnCard",
  //   cardNumber: "1234 5678 8765 4321",
  //   expiryDate: "04/25",
  //   securityCode: "412",
  // });

  useEffect(() => {
    if (isAuthenticated && loggedInUser && loggedInUser.id) {
      // GET customer's credit card details.
      console.log(
        `${credit_card_apis.get_all_by_customer_id}/${loggedInUser.id}`
      );
      fetch(`${credit_card_apis.get_all_by_customer_id}/${loggedInUser.id}`)
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
          throw new Error(
            `${resp.status} Error retrieving saved credit cards.`
          );
        })
        .then((res) => {
          console.log(res);
          const creditCards = res.creditCards;
          setSavedCreditCards(creditCards);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [isAuthenticated, loggedInUser]);

  const onClickPaymentMethod = (evt, savedCreditCardIndex) => {
    evt.preventDefault();

    // get card index.
    // set default input to this new card.
    const selectedCard = savedCreditCards[savedCreditCardIndex];
    setCreditCardFormDefaultInput({
      nameOnCard: selectedCard.nameOnCard,
      cardNumber: getSanitisedCardNumber(selectedCard.cardNumber),
      expiryDate: getSanitisedExpiryDate(selectedCard.expiryDate),
      securityCode: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameOnCard = e.target.formNameOnCard.value;
    const cardNumber = getSanitisedCardNumber(e.target.formCardNumber.value);
    const expiryDate = getSanitisedExpiryDate(e.target.formExpiryDate.value);
    const securityCode = getSanitisedSecurityCode(
      e.target.formSecurityCode.value
    );
    const isSavePaymentDetails = e.target.formIsSavePaymentDetails.value;

    const paymentDetails = {
      nameOnCard: nameOnCard,
      cardNumber: cardNumber,
      expiryDate: expiryDate,
      securityCode: securityCode,
      isSavePaymentDetails: isSavePaymentDetails,
      customer: isAuthenticated ? loggedInUser : null,
    };
    console.log(paymentDetails);
    setPaymentDetails(paymentDetails);
  };

  const sanitiseNumbersOnlyInput = (input) => {
    // replace all whitespace and alphabets with "".
    return input.replace(/[^0-9.]/g, "");
  };

  const limitInputSize = (input, size) => {
    return input.slice(0, size);
  };

  const getSanitisedCardNumber = (cardNumber) => {
    const currCardNumber = limitInputSize(
      sanitiseNumbersOnlyInput(cardNumber),
      19
    );

    // format card number to add space after every 4 digits.
    return currCardNumber.replace(/(\d{4})/g, "$1 ").replace(/^\s+|\s+$/, "");
  };

  const onChangeCardNumber = (e) => {
    e.preventDefault();

    // sanitize user input.
    e.target.value = getSanitisedCardNumber(e.target.value);
  };

  const getSanitisedExpiryDate = (expiryDate) => {
    const currExpiryDate = limitInputSize(
      sanitiseNumbersOnlyInput(expiryDate),
      4
    ).replace(/\//g, "");

    // format expiry date to add forward slash after months.
    if (currExpiryDate.length < 3) {
      return currExpiryDate;
    }
    return (
      currExpiryDate.substring(0, 2) + "/" + currExpiryDate.substring(2, 4)
    );
  };

  const onChangeExpiryDate = (e) => {
    e.preventDefault();

    // sanitize user input.
    e.target.value = getSanitisedExpiryDate(e.target.value);
  };

  const getSanitisedSecurityCode = (securityCode) => {
    const currSecurityCode = limitInputSize(
      sanitiseNumbersOnlyInput(securityCode),
      3
    );
    return currSecurityCode;
  };

  const onChangeSecurityCode = (e) => {
    e.preventDefault();

    // sanitize user input.
    e.target.value = getSanitisedSecurityCode(e.target.value);
  };

  const ActualFormComponent = () => {
    return (
      <>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group controlId="formNameOnCard">
            <Form.Label>Name on Card</Form.Label>
            <Form.Control
              type="text"
              // placeholder="John Doe"
              defaultValue={creditCardFormDefaultInput.nameOnCard}
              required
            />
          </Form.Group>
          <Form.Group controlId="formCardNumber">
            <Form.Label>Card Number</Form.Label>
            <Form.Control
              type="text"
              // placeholder="1234 5678 8765 4321"
              defaultValue={creditCardFormDefaultInput.cardNumber}
              onChange={(evt) => onChangeCardNumber(evt)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formExpiryDate">
            <Form.Label>Expiry Date</Form.Label>
            <Form.Control
              type="text"
              // placeholder="04/25"
              defaultValue={creditCardFormDefaultInput.expiryDate}
              onChange={(evt) => onChangeExpiryDate(evt)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formSecurityCode">
            <Form.Label>CVV or Security Code</Form.Label>
            <Form.Control
              type="text"
              // placeholder="412"
              defaultValue={creditCardFormDefaultInput.securityCode}
              onChange={(evt) => onChangeSecurityCode(evt)}
              required
            />
          </Form.Group>
          {isAuthenticated && (
            <Form.Group controlId="formIsSavePaymentDetails">
              <Form.Check type="checkbox" label="Save payment details" />
            </Form.Group>
          )}
          <Link to="/">
            <Button type="button">Cancel</Button>
          </Link>
          <Button type="submit">Pay</Button>
        </Form>
      </>
    );
  };

  return (
    <>
      {isAuthenticated ? (
        <h2>Payment details</h2>
      ) : (
        <h2>Enter payment details</h2>
      )}
      {isAuthenticated && (
        <>
          <h3>Choose your payment method</h3>
          <div>
            {savedCreditCards.map((currCreditCard, currIndex) => (
              <SavedCreditCard
                key={currIndex}
                creditCard={currCreditCard}
                onClickPaymentMethod={onClickPaymentMethod}
                index={currIndex}
              />
            ))}
          </div>
        </>
      )}

      {isAuthenticated && <h3>Enter payment details</h3>}
      <ActualFormComponent />
    </>
  );
};

const SavedCreditCard = ({ creditCard, index, onClickPaymentMethod }) => {
  const redactedPrefixCardNumberLength = creditCard.cardNumber.length - 4;
  const redactedPrefixCardNumber = "*".repeat(redactedPrefixCardNumberLength);

  const getSanitisedCardNumber = (cardNumber) => {
    // format card number to add space after every 4 digits.
    return cardNumber.replace(/([/*|\d]{4})/g, "$1 ").replace(/^\s+|\s+$/, "");
  };

  return (
    <div className="ba" onClick={(evt) => onClickPaymentMethod(evt, index)}>
      <div>{`${getSanitisedCardNumber(
        redactedPrefixCardNumber + creditCard.cardNumber.slice(-4)
      )}`}</div>
      <div>Exp: {creditCard.expiryDate}</div>
    </div>
  );
};

export default HandlePaymentDetails;
