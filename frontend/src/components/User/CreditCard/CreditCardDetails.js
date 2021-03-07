import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Redirect } from "react-router";
import Card from "react-bootstrap/Card";

import { Link, useHistory } from "react-router-dom";

import rest_endpoints from "../../../config/rest_endpoints.json";
const creditCardEndpoint =
  rest_endpoints.rest_endpoints.credit_card.get_card_by_card_id;

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
const Container = styled.div.attrs({
  className: `flex flex-column pr6 pl6`,
})``;

const HeaderRow = styled.div.attrs({
  className: `flex`,
})``;

const TitleContainer = styled.div.attrs({
  className: `pa3 mb2 w-50`,
})``;

const Title = styled.p.attrs({
  className: `f2 measure fw1 mt3 ml-5`,
})``;

const Btn = styled.div.attrs({
  className: `w-25 mt2 mb5 mr4`,
})``;

const Update = styled.p.attrs({
  className: `f4 measure fw1 mt5 blue pointer dim tr`,
})``;

const Delete = styled.p.attrs({
  className: `f4 measure fw1 mt5 dark-red pointer dim tr mr5`,
})``;

const BodyRow = styled.div.attrs({
  className: `flex flex-column items-center`,
})``;

const BodyDiv = styled.div.attrs({
  className: `w-25`,
})``;

const FieldDiv = styled.div.attrs({
  className: ``,
})``;

const FieldText = styled.p.attrs({
  className: `f3 gray`,
})``;

const DataDiv = styled.div.attrs({
  className: `mb5`,
})``;

const DataText = styled.p.attrs({
  className: `f4 dark-gray fw3`,
})``;

// https://reactrouter.com/web/api/match
const CreditCardDetails = ({ match, location }) => {
  const user = location.state.user;
  const [userId] = useState(match.params.id);
  const [card] = useState(location.state.card);
  const [isDelete, setIsDelete] = useState(false);

  let history = useHistory();

  const url = card != null ? creditCardEndpoint + "/" + card.id : "";

  useEffect(() => {
    if (isDelete && card != null) {
      // DELETE request using fetch with error handling
      fetch(url, { method: "DELETE" })
        .then(async (response) => {
          const data = await response.json();

          // check for error response
          if (!response.ok) {
            // get error message from body or default to responase status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }
        })
        .catch((error) => {
          console.error(error);
        });
      history.go(-2);
    }
  }, [isDelete, card, url, history]);

  function handleDelete() {
    setIsDelete(true);
  }

  const maskCreditCardNumber = (creditCardNunmber) => {
    const getSanitisedCardNumber = (creditCardNunmber) => {
      // format card number to add space after every 4 digits.
      return creditCardNunmber
        .replace(/([/*|\d]{4})/g, "$1 ")
        .replace(/^\s+|\s+$/, "");
    };

    const redactedPrefixCardNumberLength = creditCardNunmber.length - 4;
    const redactedPrefixCardNumber = "*".repeat(redactedPrefixCardNumberLength);

    return getSanitisedCardNumber(
      redactedPrefixCardNumber + creditCardNunmber.slice(-4)
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
      <Card className="mv3">
        <Card.Header>Card details</Card.Header>
        <Card.Body>
          <div className="mv2">
            <div className="gray f5">Card number</div>
            <div className="lh-copy">
              {card ? maskCreditCardNumber(card.cardNumber) : ""}
            </div>
          </div>
          <div className="mv2">
            <div className="gray f5">Expiry date</div>
            <div className="lh-copy">{card ? card.expiryDate : ""}</div>
          </div>
          <div className="mv2">
            <div className="gray f5">Name on card</div>
            <div className="lh-copy">{card ? card.nameOnCard : ""}</div>
          </div>
        </Card.Body>
      </Card>
      <div className="flex justify-end">
        <div className="mr1">
          <Link
            to={{
              pathname:
                "/user/profile/" +
                userId +
                "/creditcards/" +
                card.id +
                "/creditcardsdetails/edit",
              state: {
                isPost: false,
                card: card,
                user: location.state.user,
              },
            }}
          >
            <Button type="button">Update card</Button>
          </Link>
        </div>
        <div className="ml1">
          <Button onClick={handleDelete}>Delete card</Button>
        </div>
      </div>
    </>
  );
};

export default CreditCardDetails;
