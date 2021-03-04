import React from "react";
import styled from "styled-components";

const Container = styled.div.attrs({
    className: `flex flex-column pr6 pl6`
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

const DeleteBtn = styled.div.attrs({
    className: `w-50 mt2 mb5 mr6`
})``

const Delete = styled.p.attrs({
    className: `f3 measure fw1 mt5 dark-red pointer dim tr mr7`
})``

const BodyRow = styled.div.attrs({
    className: `flex flex-column items-center`
})``

const BodyDiv = styled.div.attrs({
    className: `w-25`
})``

const FieldDiv = styled.div.attrs({
    className: ``
})``

const FieldText = styled.p.attrs({
    className: `f3 gray`
})``

const DataDiv = styled.div.attrs({ 
    className: `mb5`
})``

const DataText = styled.p.attrs({
    className: `f4 dark-gray fw3`
})``
 
// https://reactrouter.com/web/api/match
const CreditCardDetails = ({ match }) => {
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
    id: "1",
    firstName: "Braddy",
    lastName: "Yeoh",
    email: "braddy.yeoh@ucdconnect.ie"
  };


  return (
    <Container>
        <HeaderRow>
            <TitleContainer>
                <Title>Card Details</Title>
            </TitleContainer>
            <DeleteBtn>
                <Delete>
                    Delete Card
                </Delete>
            </DeleteBtn>
        </HeaderRow>
        <BodyRow>
            <BodyDiv>
                <FieldDiv>
                    <FieldText>
                        Card Number
                    </FieldText>
                </FieldDiv>
                <DataDiv>
                    <DataText>
                        {testUserId.cardNumber}
                    </DataText>
                </DataDiv>
            </BodyDiv>
            <BodyDiv>
                <FieldDiv>
                    <FieldText>
                        Expiry Date
                    </FieldText>
                </FieldDiv>
                <DataDiv>
                    <DataText>
                        {testUserId.expiryDate}
                    </DataText>
                </DataDiv>
            </BodyDiv>
            <BodyDiv>
                <FieldDiv>
                    <FieldText>
                        CVC
                    </FieldText>
                </FieldDiv>
                <DataDiv>
                    <DataText>
                        {testUserId.cvc}
                    </DataText>
                </DataDiv>
            </BodyDiv>
            <BodyDiv>
                <FieldDiv>
                    <FieldText>
                        Name
                    </FieldText>
                </FieldDiv>
                <DataDiv>
                    <DataText>
                        {testUserId.name}
                    </DataText>
                </DataDiv>
            </BodyDiv>
            <BodyDiv>
                <FieldDiv>
                    <FieldText>
                        Billing Address
                    </FieldText>
                </FieldDiv>
                <DataDiv>
                    <DataText>
                        {testUserId.billingAddress}
                    </DataText>
                </DataDiv>
            </BodyDiv>
        </BodyRow>
    </Container>
  );
};

export default CreditCardDetails;
