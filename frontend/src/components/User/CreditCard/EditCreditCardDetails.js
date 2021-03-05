import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";

import rest_endpoints from "../../../config/rest_endpoints.json";
const customerEndpoint =  rest_endpoints.rest_endpoints.user.customer;

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
const EditCreditCardDetails = ({ match, location }) => {
    const [userId] = useState(match.params.id);
    const [isPost] = useState(location.state.isPost);
    const [isSave, setIsSave] = useState(false);
    const [cardNumber, setCardNumber] = useState(location.state.card.cardNumber);
    const [expiryDate, setExpiryDate] = useState(location.state.card.expiryDate);
    const [securityCode, setSecurityCode] = useState(location.state.card.securityCode);
    const [nameOnCard, setNameOnCard] = useState(location.state.card.nameOnCard);

    let history = useHistory();

    const url = customerEndpoint + "creditcard/" + userId;

    function handleSave() {
        setIsSave(true)
    }

    useEffect(() => {
        if (isSave) {
            const requestOptions = {
                method: isPost ? "POST" : "PUT",
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: `bearer ${token}`,
                },
                body: JSON.stringify({
                    cardNumber: cardNumber,
                    expiryDate: expiryDate,
                    securityCode: securityCode,
                    nameOnCard: nameOnCard
                }),
            };
            fetch(url, requestOptions)
            .then((resp) => {
                if (resp.ok) {
                    return resp.json();
                } 

                throw new Error(`${resp.status} ${isPost ? "Error posting customer." : "Error updating customer."}`);
            })
            .then((res) => {
            })
            .catch((error) => {
                console.error(error);
            });

            history.go(-2);
        }
    }, [cardNumber, expiryDate, history, isPost, isSave, nameOnCard, securityCode, url]);

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
                    <Input onChange={e => setCardNumber(e.target.value)}/>
                </BodyDiv>
                <BodyDiv>
                    <FieldDiv>
                        <FieldText>
                            Expiry Date
                        </FieldText>
                    </FieldDiv>
                    <Input onChange={e => setExpiryDate(e.target.value)}/>
                </BodyDiv>
                <BodyDiv>
                    <FieldDiv>
                        <FieldText>
                            Security Code
                        </FieldText>
                    </FieldDiv>
                    <Input onChange={e => setSecurityCode(e.target.value)}/>
                </BodyDiv>
                <BodyDiv>
                    <FieldDiv>
                        <FieldText>
                            Name On Card
                        </FieldText>
                    </FieldDiv>
                    <Input onChange={e => setNameOnCard(e.target.value)}/>
                </BodyDiv>
                <SaveDiv>
                    <Save onClick={handleSave}>Save</Save>
                </SaveDiv>
            </Form>
        </BodyRow>
    </Container>
  );
};

export default EditCreditCardDetails;
