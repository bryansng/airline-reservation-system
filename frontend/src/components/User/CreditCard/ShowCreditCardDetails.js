import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { rest_endpoints } from "../../../config/rest_endpoints.json";
const { credit_card: credit_card_apis } = rest_endpoints;

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
        console.log(res);
        setIsRequestSuccess(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
      {isRequestSuccess && creditCard && (
        <Redirect
          push
          to={{
            pathname: `/user/profile/creditcards`,
            state: { user: user },
          }}
        />
      )}
      <Container>
        {creditCard ? (
          <>
            <HeaderRow>
              <TitleContainer>
                <Title>Card Details</Title>
              </TitleContainer>
              <Btn>
                <Update>
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
                    Edit Card
                  </Link>
                </Update>
              </Btn>
              <Btn>
                <Delete onClick={(evt) => handleDelete(evt)}>
                  Delete Card
                </Delete>
              </Btn>
            </HeaderRow>
            <BodyRow>
              <BodyDiv>
                <FieldDiv>
                  <FieldText>Card Number</FieldText>
                </FieldDiv>
                <DataDiv>
                  <DataText>
                    {maskCreditCardNumber(creditCard.cardNumber)}
                  </DataText>
                </DataDiv>
              </BodyDiv>
              <BodyDiv>
                <FieldDiv>
                  <FieldText>Expiry Date</FieldText>
                </FieldDiv>
                <DataDiv>
                  <DataText>{creditCard.expiryDate}</DataText>
                </DataDiv>
              </BodyDiv>
              <BodyDiv>
                <FieldDiv>
                  <FieldText>Security Code</FieldText>
                </FieldDiv>
                <DataDiv>
                  <DataText>{creditCard.securityCode}</DataText>
                </DataDiv>
              </BodyDiv>
              <BodyDiv>
                <FieldDiv>
                  <FieldText>Name On Card</FieldText>
                </FieldDiv>
                <DataDiv>
                  <DataText>{creditCard.nameOnCard}</DataText>
                </DataDiv>
              </BodyDiv>
            </BodyRow>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </Container>
    </>
  );
};

export default CreditCardDetails;
