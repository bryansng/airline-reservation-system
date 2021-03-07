import React, { useState } from "react";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Redirect } from "react-router";
import { rest_endpoints } from "../../../config/rest_endpoints.json";
const { credit_card: credit_card_apis } = rest_endpoints;

const Button = styled.button.attrs({
  className: `mv2 mh0 relative w-100 b--gray br2 ba hover-bg-light-gray tc`,
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

const Grid = styled.div.attrs({})`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const EditCreditCardDetails = ({ location }) => {
  const user = location.state.user;
  const isAddCard = location.state.isAddCard;
  const [creditCard, setCreditCard] = useState(location.state.card);
  const [isRequestSuccess, setIsRequestSuccess] = useState(false);

  const limitInputSize = (input, size) => {
    return input.slice(0, size);
  };

  const sanitiseNumbersOnlyInput = (input) => {
    // if contains character '*'.
    if (input.indexOf("*") !== -1) {
      return "";
    }

    // replace all whitespace and alphabets with "".
    return input.replace(/[^0-9.]/g, "");
  };

  const getSanitisedCardNumber = (cardNumber) => {
    const currCardNumber = limitInputSize(
      sanitiseNumbersOnlyInput(cardNumber),
      19
    );

    // format card number to add space after every 4 digits.
    return currCardNumber.replace(/(\d{4})/g, "$1 ").replace(/^\s+|\s+$/, "");
  };

  const maskSecurityCode = (creditCardSecurityCode) => {
    return "*".repeat(creditCardSecurityCode.length);
  };

  const maskCreditCardNumber = (creditCardNumber) => {
    const getSanitisedCardNumber = (creditCardNumber) => {
      // format card number to add space after every 4 digits.
      return creditCardNumber
        .replace(/([/*|\d]{4})/g, "$1 ")
        .replace(/^\s+|\s+$/, "");
    };

    const redactedPrefixCardNumberLength =
      creditCardNumber.length >= 4 ? creditCardNumber.length - 4 : 0;
    const redactedPrefixCardNumber = "*".repeat(redactedPrefixCardNumberLength);

    return getSanitisedCardNumber(
      redactedPrefixCardNumber + creditCardNumber.slice(-4)
    );
  };

  const [creditCardFormDefaultInput] = useState(
    isAddCard
      ? {
          nameOnCard: "",
          cardNumber: "",
          expiryDate: "",
          securityCode: "",
        }
      : {
          ...creditCard,
          securityCode: maskSecurityCode(creditCard.securityCode),
          cardNumber: maskCreditCardNumber(creditCard.cardNumber),
        }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameOnCard = e.target.formNameOnCard.value;
    var cardNumber = sanitiseNumbersOnlyInput(e.target.formCardNumber.value);
    const expiryDate = getSanitisedExpiryDate(e.target.formExpiryDate.value);
    var securityCode = getSanitisedSecurityCode(
      e.target.formSecurityCode.value
    );

    // when editing card, if card number was not changed by user.
    // this works because '*' characters cannot be manually inputted by the user.
    if (
      !isAddCard &&
      e.target.formCardNumber.value.indexOf("*") !== -1
      // e.target.formCardNumber.value ===
      //   maskCreditCardNumber(creditCard.cardNumber)
    ) {
      cardNumber = creditCard.cardNumber;
    }

    if (!isAddCard && e.target.formSecurityCode.value.indexOf("*") !== -1) {
      securityCode = creditCard.securityCode;
    }

    const requestOptions = {
      method: isAddCard ? "POST" : "PUT",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `bearer ${token}`,
      },
      body: JSON.stringify({
        cardNumber: cardNumber,
        expiryDate: expiryDate,
        securityCode: securityCode,
        nameOnCard: nameOnCard,
      }),
    };

    fetch(
      `${credit_card_apis.get_card_by_card_id}/${
        isAddCard ? user.id : creditCard.id
      }`,
      requestOptions
    )
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }

        throw new Error(
          `${resp.status} ${
            isAddCard
              ? "Error adding new credit card."
              : "Error updating credit card details."
          }`
        );
      })
      .then((res) => {
        // redirect to show updated credit card.
        setCreditCard(res.creditCard);
        setIsRequestSuccess(true);
      })
      .catch((error) => {
        console.error(error);
      });
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

  return (
    <div>
      {isRequestSuccess && creditCard && (
        <Redirect
          push
          to={{
            pathname: `/user/profile/creditcards/${creditCard.id}`,
            state: {
              card: creditCard,
              user: user,
            },
          }}
        />
      )}
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Card className="mv3">
          <Card.Header>{isAddCard ? "Add" : "Edit"} Credit Card</Card.Header>
          <Card.Body>
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
            </Grid>
          </Card.Body>
        </Card>
        <div className="flex justify-end">
          <div className="mr1">
            <Link
              to={
                isAddCard
                  ? {
                      pathname: `/user/profile/creditcards/`,
                      state: { user: user },
                    }
                  : {
                      pathname: `/user/profile/creditcards/${creditCard.id}`,
                      state: { user: user, card: creditCard },
                    }
              }
            >
              <Button type="button">Cancel</Button>
            </Link>
          </div>
          <div className="ml1">
            <Button type="submit">Save Changes</Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default EditCreditCardDetails;
