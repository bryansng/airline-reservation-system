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

const BodyRow = styled.div.attrs({
    className: `flex flex-column items-center`
})``

const BodyDiv = styled.div.attrs({
    className: ``
})``

const Form = styled.form.attrs({
    className: `w-30`
})``

const FieldDiv = styled.div.attrs({
    className: ``
})``

const FieldText = styled.p.attrs({
    className: `f3 gray`
})``

const Input = styled.input.attrs({
    className: `input-reset ba b--black-20 pa2 mb4 db w-100`,
    type: `text`,
    ariaDescribedby: `name-desc`
})``

const SaveDiv = styled.div.attrs({
    className: `lh-copy mt3 tr`
})``

const Save = styled.a.attrs({
    className: `pointer f4 mr2 link dim black db`,
    href: ``
})``

// https://reactrouter.com/web/api/match
const EditCreditCardDetails = ({ match }) => {
  // get user id from match.params.id and GET user data.
  const testUserId = { 
    id: "1",
    firstName: "Braddy",
    lastName: "Yeoh",
    phone: "123",
    address: "123 road lane",
    email: "braddy.yeoh@ucdconnect.ie"
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
                <Title>Credit Card Details</Title>
            </TitleContainer>
        </HeaderRow>
        <BodyRow>
            <Form>
                <BodyDiv>
                    <FieldDiv>
                        <FieldText>
                            Card Number
                        </FieldText>
                    </FieldDiv>
                    <Input/>
                </BodyDiv>
                <BodyDiv>
                    <FieldDiv>
                        <FieldText>
                            Expiry Date
                        </FieldText>
                    </FieldDiv>
                    <Input/>
                </BodyDiv>
                <BodyDiv>
                    <FieldDiv>
                        <FieldText>
                            CVC
                        </FieldText>
                    </FieldDiv>
                    <Input/>
                </BodyDiv>
                <BodyDiv>
                    <FieldDiv>
                        <FieldText>
                            Name
                        </FieldText>
                    </FieldDiv>
                    <Input/>
                </BodyDiv>
                <BodyDiv>
                    <FieldDiv>
                        <FieldText>
                            Billing Address
                        </FieldText>
                    </FieldDiv>
                    <Input/>
                </BodyDiv>
                <SaveDiv>
                    <Save>Save</Save>
                </SaveDiv>
            </Form>
        </BodyRow>
    </Container>
  );
};

export default EditCreditCardDetails;
