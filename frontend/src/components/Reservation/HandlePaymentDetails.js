import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
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

const CreditCardButton = styled.button.attrs({
  className: `w-100 b--transparent mb2 br2 bg-light-gray hover-bg-light-silver tl pv2 ph3`,
})`
  transition: 0.15s ease-out;
  &:hover {
    transition: 0.15s ease-in;
  }
`;

const Grid = styled.div.attrs({})`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const HandlePaymentDetails = ({
  setPaymentDetails,
  loggedInUser,
  isAuthenticated,
}) => {
  const [selectedCard, setSelectedCard] = useState([]);
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
    const theSelectedCard = savedCreditCards[savedCreditCardIndex];
    setCreditCardFormDefaultInput({
      nameOnCard: theSelectedCard.nameOnCard,
      cardNumber: maskCreditCardNumber(theSelectedCard.cardNumber),
      expiryDate: getSanitisedExpiryDate(theSelectedCard.expiryDate),
      securityCode: "",
    });
    setSelectedCard(theSelectedCard);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameOnCard = e.target.formNameOnCard.value;
    var cardNumber = sanitiseNumbersOnlyInput(e.target.formCardNumber.value);
    const expiryDate = getSanitisedExpiryDate(e.target.formExpiryDate.value);
    const securityCode = getSanitisedSecurityCode(
      e.target.formSecurityCode.value
    );
    const isSavePaymentDetails = isAuthenticated
      ? e.target.formIsSavePaymentDetails.checked
      : false;

    // if card number is the selected card.
    if (e.target.formCardNumber.value.indexOf("*") !== -1) {
      cardNumber = selectedCard.cardNumber;
    }

    const paymentDetails = {
      nameOnCard: nameOnCard,
      cardNumber: cardNumber,
      expiryDate: expiryDate,
      securityCode: securityCode,
      isSavePaymentDetails: isSavePaymentDetails,
      customerId: isAuthenticated && loggedInUser ? loggedInUser.id : null,
    };
    setPaymentDetails(paymentDetails);
  };

  const sanitiseNumbersOnlyInput = (input) => {
    // if contains character '*'.
    if (input.indexOf("*") !== -1) {
      return "";
    }

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

  const maskCreditCardNumber = (creditCardNumber) => {
    const getSanitisedCardNumber = (creditCardNumber) => {
      // format card number to add space after every 4 digits.
      return creditCardNumber
        .replace(/([/*|\d]{4})/g, "$1 ")
        .replace(/^\s+|\s+$/, "");
    };

    const redactedPrefixCardNumberLength = creditCardNumber.length - 4;
    const redactedPrefixCardNumber = "*".repeat(redactedPrefixCardNumberLength);

    return getSanitisedCardNumber(
      redactedPrefixCardNumber + creditCardNumber.slice(-4)
    );
  };

  const ActualFormComponent = () => {
    return (
      <>
        {/* <h3 className="mb2">Please input</h3> */}
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Card className="mv">
            <Card.Header>
              {isAuthenticated
                ? "Please choose and enter your credit card details"
                : "Please enter your credit card details"}
            </Card.Header>
            <Card.Body>
              {isAuthenticated && (
                <div className="mb2">
                  {savedCreditCards.map((currCreditCard, currIndex) => (
                    <SavedCreditCard
                      key={currIndex}
                      creditCard={currCreditCard}
                      onClickPaymentMethod={onClickPaymentMethod}
                      index={currIndex}
                      maskCreditCardNumber={maskCreditCardNumber}
                    />
                  ))}
                </div>
              )}
              <Grid>
                <Form.Group className="mh1" controlId="formNameOnCard">
                  <Form.Label className="dark-gray f5">Name on Card</Form.Label>
                  <Form.Control
                    type="text"
                    // placeholder="John Doe"
                    defaultValue={creditCardFormDefaultInput.nameOnCard}
                    required
                  />
                </Form.Group>
                <Form.Group className="mh1" controlId="formCardNumber">
                  <Form.Label className="dark-gray f5">Card Number</Form.Label>
                  <Form.Control
                    type="text"
                    // placeholder="1234 5678 8765 4321"
                    defaultValue={creditCardFormDefaultInput.cardNumber}
                    onChange={(evt) => onChangeCardNumber(evt)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mh1" controlId="formExpiryDate">
                  <Form.Label className="dark-gray f5">Expiry Date</Form.Label>
                  <Form.Control
                    type="text"
                    // placeholder="04/25"
                    defaultValue={creditCardFormDefaultInput.expiryDate}
                    onChange={(evt) => onChangeExpiryDate(evt)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mh1" controlId="formSecurityCode">
                  <Form.Label className="dark-gray f5">
                    CVV or Security Code
                  </Form.Label>
                  <Form.Control
                    type="text"
                    // placeholder="412"
                    defaultValue={creditCardFormDefaultInput.securityCode}
                    onChange={(evt) => onChangeSecurityCode(evt)}
                    required
                  />
                </Form.Group>
                {isAuthenticated && (
                  <Form.Group
                    className="mh1"
                    controlId="formIsSavePaymentDetails"
                  >
                    <Form.Check type="checkbox" label="Save payment details" />
                  </Form.Group>
                )}
              </Grid>
            </Card.Body>
          </Card>
          <div className="flex justify-end">
            <div className="mr1">
              <Link to="/">
                <Button type="button">Cancel</Button>
              </Link>{" "}
            </div>
            <div className="ml1">
              <Button type="submit">Pay</Button>
            </div>
          </div>
        </Form>
      </>
    );
  };

  return <ActualFormComponent />;
};

const SavedCreditCard = ({
  creditCard,
  index,
  onClickPaymentMethod,
  maskCreditCardNumber,
}) => {
  return (
    <CreditCardButton onClick={(evt) => onClickPaymentMethod(evt, index)}>
      <div className="dark-gray">
        {`${maskCreditCardNumber(creditCard.cardNumber)}`}
      </div>
      <div>Exp: {creditCard.expiryDate}</div>
    </CreditCardButton>
  );
};

export default HandlePaymentDetails;
