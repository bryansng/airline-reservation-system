import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaCreditCard } from "react-icons/fa";
import { IconContext } from "react-icons";

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
  className: `pa3 mb2 w-50`,
})``;

const Title = styled.p.attrs({
  className: `f2 measure fw1 mt3 ml-5`,
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

const ShowCreditCards = ({ location }) => {
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
      <HeaderRow>
        <TitleContainer>
          <Title>Credit Cards</Title>
        </TitleContainer>
        <Btn>
          <Link
            style={{ color: "green" }}
            to={{
              pathname: `/user/profile/creditcards/add`,
              state: {
                isPost: true,
                user: location.state.user,
              },
            }}
          >
            <Add>Add Card</Add>
          </Link>
        </Btn>
      </HeaderRow>
      <CardsContainer>
        <IconContainer>
          {creditCards.length === 0 ? (
            <div>No Cards</div>
          ) : (
            creditCards.cards.map((card, key) => {
              return (
                <Link
                  key={key}
                  style={{ color: "dimgray" }}
                  className="ba b--silver br4 tc ma4 grow pointer dim"
                  to={{
                    pathname: `/user/profile/creditcards/${card.id}`,
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
            })
          )}
        </IconContainer>
      </CardsContainer>
    </Container>
  );
};

export default ShowCreditCards;
