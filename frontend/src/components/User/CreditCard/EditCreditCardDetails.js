import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";

import { Textbox } from "react-inputs-validation";

import rest_endpoints from "../../../config/rest_endpoints.json";
const creditCardEndpoint =  rest_endpoints.rest_endpoints.credit_card.get_card_by_card_id;

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
    className: `mt4`
})``

const FieldText = styled.p.attrs({
    className: `f3 gray`
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

    const [isValidCardNumber, setIsValidCardNumber] = useState(false);
    const [isValidExpiryDate, setIsValidExpiryDate] = useState(false);
    const [isValidSecurityCode, setIsValidSecurityCode] = useState(false);
    const [isValidNameOnCard, setIsValidNameOnCard] = useState(false);

    const [cardNumber, setCardNumber] = useState(location.state.card == null ? null : location.state.card.cardNumber);
    const [expiryDate, setExpiryDate] = useState(location.state.card == null ? null : location.state.card.expiryDate);
    const [securityCode, setSecurityCode] = useState(location.state.card == null ? null : location.state.card.securityCode);
    const [nameOnCard, setNameOnCard] = useState(location.state.card == null ? null : location.state.card.nameOnCard);

    let history = useHistory();

    const url = creditCardEndpoint + "/" + userId;
    console.log("url: " + url)

    function handleSave() {
        if (isValidCardNumber && isValidExpiryDate && isValidSecurityCode && isValidNameOnCard) {
            setIsSave(true)
        } else {
            let msg = isPost ? "Cannot add new card" : "Cannot update card" ;
            alert(msg + "\n\nPlease fill in fields appropriately");
        }
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
                    <Textbox 
                        classNameInput="input-reset ba b--black-20 pa2 db w-100"
                        onBlur={(e) => {console.log(e)}} 
                        validationOption={{
                            name: "Card Number",
                            check: true,
                            required: true,
                            customFunc: num => {
                                const reg = /^\d+$/
                                if (num.length === 16 && reg.test(num)) {
                                    setIsValidCardNumber(true)
                                    return true;
                                } else {
                                    return "is not a valid card number"
                                }
                            }
                        }}
                        onChange={(name, e) => setCardNumber(name)}
                    />
                </BodyDiv>
                <BodyDiv>
                    <FieldDiv>
                        <FieldText>
                            Expiry Date
                        </FieldText>
                    </FieldDiv>
                    <Textbox 
                        classNameInput="input-reset ba b--black-20 pa2 db w-100"
                        onBlur={(e) => {console.log(e)}} 
                        validationOption={{
                            name: "Expiry Date",
                            check: true,
                            required: true,
                            customFunc: date => {
                                const reg = /^(0[1-9]|1[0-2])\/([0-9]{2})$/
                                if (reg.test(date)) {
                                    setIsValidExpiryDate(true)
                                    return true;
                                } else {
                                    return "is not a valid expiry date"
                                }
                            }
                        }}
                        onChange={(name, e) => setExpiryDate(name)}
                    />
                </BodyDiv>
                <BodyDiv>
                    <FieldDiv>
                        <FieldText>
                            Security Code
                        </FieldText>
                    </FieldDiv>
                    <Textbox 
                        classNameInput="input-reset ba b--black-20 pa2 db w-100"
                        onBlur={(e) => {console.log(e)}} 
                        validationOption={{
                            name: "Security Code",
                            check: true,
                            required: true,
                            customFunc: num => {
                                const reg = /^\d+$/
                                if (num.length === 3 && reg.test(num)) {
                                    setIsValidSecurityCode(true)
                                    return true;
                                } else {
                                    return "is not a valid security code"
                                }
                            }
                        }}
                        onChange={(name, e) => setSecurityCode(name)}
                    />
                </BodyDiv>
                <BodyDiv>
                    <FieldDiv>
                        <FieldText>
                            Name On Card
                        </FieldText>
                    </FieldDiv>
                    <Textbox 
                        classNameInput="input-reset ba b--black-20 pa2 db w-100"
                        onBlur={(e) => {console.log(e)}} 
                        validationOption={{
                            name: "Name On Card",
                            check: true,
                            required: true,
                            customFunc: name => {
                                const reg = /^[a-zA-Z]+$/
                                if (reg.test(name)) {
                                    setIsValidNameOnCard(true)
                                    return true;
                                } else {
                                    return "is not a valid name"
                                }
                            }
                        }}
                        onChange={(name, e) => setNameOnCard(name)}
                    />
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
