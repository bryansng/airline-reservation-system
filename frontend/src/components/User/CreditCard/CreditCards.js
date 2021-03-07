import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaCreditCard } from "react-icons/fa";
import { IconContext } from "react-icons";
import { Redirect } from "react-router";

import { Link } from "react-router-dom";

import rest_endpoints from "../../../config/rest_endpoints.json";
const creditCardEndpoint =
  rest_endpoints.rest_endpoints.credit_card.get_all_by_customer_id;

const Container = styled.div.attrs({
  className: `flex flex-column pr6 pl6`,
})``;

const HeaderRow = styled.div.attrs({
  className: `flex`,
})``;

const TitleContainer = styled.div.attrs({
  className: `pa3 mb2 center`,
})``;

const Title = styled.p.attrs({
  className: `f2 measure fw1 mt3 tc`,
})``;

const Btn = styled.div.attrs({
  className: `w-50`,
})``;

const Add = styled.p.attrs({
  className: `f3 measure fw1 mt5 green pointer dim tr`,
})``;

const CardsContainer = styled.div.attrs({
  className: `flex flex-wrap pr6 pl6 justify-content-center`,
})``;

const IconContainer = styled.div.attrs({
  className: `pa3 flex`,
})``;

const Icon = styled.div.attrs({
  className: `ma4`,
})``;

const IconTitleDiv = styled.div.attrs({
  className: `mt3`,
})``;

const IconTitle = styled.p.attrs({
  className: `f4`,
})``;

const CreditCards = ({ location }) => {
  const user = location.state.user;
  const [userId] = useState(location.state.user.id);
  const [creditCards, setCreditCards] = useState([]);

  const url = creditCardEndpoint + "/" + userId;

  function parseCardNumber(cardNum) {
    return (
      "Ending with " + cardNum.substring(cardNum.length - 4, cardNum.length)
    );
  }

  useEffect(() => {
    fetch(url)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error(`${resp.status} Error retrieving customer.`);
      })
      .then((res) => {
        const cardList = res.creditCards;
        setCreditCards({
          cards: cardList,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [url]);

  return (
    <Container>
      {!user && (
        <Redirect
          push
          to={{
            pathname: `/`,
          }}
        />
      )}
      <HeaderRow>
        <TitleContainer>
          <Title>Credit Cards</Title>
        </TitleContainer>
      </HeaderRow>
      <CardsContainer>
        <IconContainer>
          {creditCards.cards &&
            creditCards.cards.length !== 0 &&
            creditCards.cards.map((card, key) => {
              return (
                <Link
                  key={key}
                  style={{ color: "dimgray" }}
                  className="ba b--silver br4 tc ma4 grow pointer dim"
                  to={{
                    pathname:
                      `/user/profile/` + userId + "/creditcards/" + card.id,
                    state: {
                      card: card,
                      user: location.state.user,
                    },
                  }}
                >
                  <IconContext.Provider value={{ size: "15em" }}>
                    <Icon>
                      <FaCreditCard />
                    </Icon>
                    <IconTitleDiv>
                      <IconTitle>{parseCardNumber(card.cardNumber)}</IconTitle>
                    </IconTitleDiv>
                  </IconContext.Provider>
                </Link>
              );
            })}
          <Link
            style={{ color: "dimgray" }}
            className="ba b--silver br4 tc ma4 grow pointer dim"
            to={{
              pathname: "/user/profile/" + userId + "/creditcards/add",
              state: {
                isPost: true,
                user: location.state.user,
              },
            }}
          >
            <IconContext.Provider value={{ size: "15em" }}>
              <Icon>
                <FaCreditCard />
              </Icon>
              <IconTitleDiv>
                <IconTitle>
                  {creditCards.cards && creditCards.cards.length === 0
                    ? "No cards on file, add new card"
                    : "Add new card"}
                </IconTitle>
              </IconTitleDiv>
            </IconContext.Provider>
          </Link>
        </IconContainer>
      </CardsContainer>
    </Container>
  );
};

export default CreditCards;
