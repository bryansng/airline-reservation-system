import React from "react";
import styled from "styled-components";
import { FaCreditCard } from "react-icons/fa";
import { IconContext } from "react-icons";

const Container = styled.div.attrs({
    className: `flex flex-column`
})``

const HeaderRow = styled.div.attrs({
    className: `flex`
})``

const TitleContainer = styled.div.attrs({
    className: `pa3 mb2 w-50`
})``
  
const Title = styled.p.attrs({
    className: `f2 measure fw1 mt3 ml-5`
})``

const CardsContainer = styled.div.attrs({
    className: `flex flex-wrap pr6 pl6 justify-content-center`
})``

const IconContainer = styled.div.attrs({
    className: `pa3 flex`
})``

const IconDiv = styled.div.attrs({
    className: `ba b--silver br4 tc ma4 grow pointer dim`
})``

const Icon = styled.div.attrs({
    className: `ma4`
})``

const IconTitleDiv = styled.div.attrs({
    className: `mt3`
})``

const IconTitle = styled.p.attrs({
    className: `f4`
})``

const CreditCards = ({ match }) => {
    // get user id from match.params.id and GET user data.
    const testUserId = { 
      id: "1",
      cardNumber: "1231435667657567",
      expiryDate: "12/23",
      cvc: "123",
      name: "Valentina Pan",
      billingAddress: "33 Calle de "
    };
  
    const testUserId2 = { 
        id: "2",
        cardNumber: "238756239569",
        expiryDate: "11/25",
        cvc: "945",
        name: "Braddy Yeoh",
        billingAddress: "123 Boobies"
    };
  
    const cards = [testUserId, testUserId2]
  
    return (
      <Container>
            <HeaderRow>
                <TitleContainer>
                    <Title>Credit Cards</Title>
                </TitleContainer>
            </HeaderRow>
            <CardsContainer>
                <IconContainer>
                    {
                        cards.map(card => {
                            return (
                                <IconDiv>
                                    <IconContext.Provider value={{size: "15em"}}>
                                        <Icon>
                                        <FaCreditCard/>
                                        </Icon>
                                        <IconTitleDiv>
                                        <IconTitle>
                                            {card.cardNumber}
                                        </IconTitle>
                                        </IconTitleDiv>
                                    </IconContext.Provider>
                                </IconDiv>
                            )
                        })
                    }
                </IconContainer>
            </CardsContainer>
      </Container>
    );
  };
  
  export default CreditCards;
  