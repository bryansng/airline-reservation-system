import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import Card from "react-bootstrap/Card";
import { rest_endpoints } from "../../../config/rest_endpoints.json";
const { credit_card: credit_card_apis } = rest_endpoints;

const Button = styled.button.attrs({
  className: `ma0 relative w-100 b--gray mh0 br2 ba hover-bg-light-gray tc`,
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

const CreditCardDetails = ({ location }) => {
  const user = location.state.user;
  const creditCard = location.state.card;
  const [isRequestSuccess, setIsRequestSuccess] = useState(false);

  const handleDelete = (evt) => {
    evt.preventDefault();

    // DELETE request using fetch with error handling
    fetch(`${credit_card_apis.get_card_by_card_id}/${creditCard.id}`, {
      method: "DELETE",
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }

        throw new Error(`${resp.status} Error deleting card.`);
      })
      .then((res) => {
        setIsRequestSuccess(true);
      })
      .catch((error) => {
        console.error(error);
      });
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

  return (
    <>
      {!user && (
        <Redirect
          push
          to={{
            pathname: `/`,
          }}
        />
      )}

      {isRequestSuccess && creditCard && (
        <Redirect
          push
          to={{
            pathname: `/user/profile/creditcards`,
            state: { user: user },
          }}
        />
      )}

      {creditCard ? (
        <>
          <Card className="mv3">
            <Card.Header>Card details</Card.Header>
            <Card.Body>
              <div className="mv2">
                <div className="gray f5">Card number</div>
                <div className="lh-copy">
                  {maskCreditCardNumber(creditCard.cardNumber)}
                </div>
              </div>
              <div className="mv2">
                <div className="gray f5">Expiry date</div>
                <div className="lh-copy">{creditCard.expiryDate}</div>
              </div>
              <div className="mv2">
                <div className="gray f5">Name on card</div>
                <div className="lh-copy">{creditCard.nameOnCard}</div>
              </div>
            </Card.Body>
          </Card>
          <div className="flex justify-end">
            <div className="mr1">
              <Link
                to={{
                  pathname: `/user/profile/creditcards/`,
                  state: { user: user },
                }}
              >
                <Button type="button">View all cards</Button>
              </Link>
            </div>
            <div className="mh1">
              <Link
                to={{
                  pathname: `/user/profile/creditcards/${creditCard.id}/creditcardsdetails/edit`,
                  state: {
                    isAddCard: false,
                    card: creditCard,
                    user: location.state.user,
                  },
                }}
              >
                <Button type="button">Edit Card</Button>
              </Link>
            </div>
            <div className="ml1">
              <Button onClick={(evt) => handleDelete(evt)}>Delete Card</Button>
            </div>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default CreditCardDetails;
