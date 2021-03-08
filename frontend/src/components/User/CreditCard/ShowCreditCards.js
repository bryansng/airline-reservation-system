import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaCreditCard } from "react-icons/fa";
import { IconContext } from "react-icons";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

import rest_endpoints from "../../../config/rest_endpoints.json";
const creditCardEndpoint =
  rest_endpoints.rest_endpoints.credit_card.get_all_by_customer_id;

const Button = styled.button.attrs({
  className: `ma0 relative w-100 b--gray center br2 ba hover-bg-light-gray tc`,
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
  className: `pa3 mb2 center`,
})``;

const Title = styled.p.attrs({
  className: `f2 measure fw1 mt3 tc`,
})``;

const CardsContainer = styled.div.attrs({
  className: `flex flex-wrap justify-center w-100 mh0 mb3 pa0`,
})``;

const IconContainer = styled.div.attrs({
  className: `pa3 flex`,
})``;

const Icon = styled.div.attrs({
  className: `mh2 mv4`,
})``;

const IconTitleDiv = styled.div.attrs({
  className: `mt3`,
})``;

const IconTitle = styled.p.attrs({
  className: `f4`,
})``;

const ShowCreditCards = ({ location }) => {
  const user = location.state.user;
  const [creditCards, setCreditCards] = useState([]);

  function parseCardNumber(cardNum) {
    return (
      "Ending with " + cardNum.substring(cardNum.length - 4, cardNum.length)
    );
  }

  useEffect(() => {
    fetch(`${creditCardEndpoint}/${user.id}`)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error(
          `${resp.status} Error retrieving customer's credit cards.`
        );
      })
      .then((res) => {
        setCreditCards(res.creditCards);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user]);

  return (
    <>
      {/* <Container> */}
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
        {/* <IconContainer> */}
        {creditCards &&
          creditCards.length !== 0 &&
          creditCards.map((card, key) => {
            return (
              <Link
                key={key}
                style={{ color: "dimgray" }}
                className="ba b--silver br4 tc ma2 grow pointer dim"
                to={{
                  pathname: `/user/profile/creditcards/${card.id}`,
                  state: {
                    card: card,
                    user: location.state.user,
                  },
                }}
              >
                <IconContext.Provider value={{ size: "80%" }}>
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
          className="ba b--silver br4 tc ma2 grow pointer dim"
          to={{
            pathname: `/user/profile/creditcards/add`,
            state: {
              isAddCard: true,
              user: location.state.user,
            },
          }}
        >
          <IconContext.Provider value={{ size: "80%" }}>
            <Icon>
              <FaCreditCard />
            </Icon>
            <IconTitleDiv>
              <IconTitle>
                {creditCards && creditCards.length === 0
                  ? "No saved cards. Add new card"
                  : "Add new card"}
              </IconTitle>
            </IconTitleDiv>
          </IconContext.Provider>
        </Link>
        {/* </IconContainer> */}
      </CardsContainer>
      {/* </Container> */}
      <div className="flex justify-end">
        <div className="">
          <Link
            to={{
              pathname: "/user/profile/",
              state: {
                user: location.state.user,
              },
            }}
          >
            <Button type="button">Back to profile dashboard</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ShowCreditCards;
