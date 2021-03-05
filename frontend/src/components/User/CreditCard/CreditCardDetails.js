import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Link, useHistory } from "react-router-dom";

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

const Btn = styled.div.attrs({
    className: `w-25 mt2 mb5 mr4`
})``

const Update = styled.p.attrs({
    className: `f3 measure fw1 mt5 blue pointer dim tr`
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
const CreditCardDetails = ({ match, location }) => {

    const [userId] = useState(match.params.id);
    const [card] = useState(location.state.card);
    const [isDelete, setIsDelete] = useState(false);

    let history = useHistory();

    const url = card != null ? customerEndpoint + "creditcard/" + card.id : "";

    useEffect(() => {
        if (isDelete && card != null) {
            // DELETE request using fetch with error handling
            fetch(url, { method: 'DELETE' })
                .then(async response => {
                    const data = await response.json();
    
                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to responase status
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }
                })
                .catch(error => {
                    console.error(error);
                });
                history.go(-2);
        }
    }, [isDelete, card, url, history]);

    function handleDelete() {
        setIsDelete(true)
    }
    
    return (
        <Container>
            <HeaderRow>
                <TitleContainer>
                    <Title>Card Details</Title>
                </TitleContainer>
                <Btn>
                    <Update>
                        <Link to={{
                            pathname: "/user/profile/" + userId + "/creditcards/" + card.id + "/creditcardsdetails/edit",
                            state: {
                                isPost: false,
                                card: card
                            }
                        }}>
                            Update Card
                        </Link>
                    </Update>
                </Btn>
                <Btn>
                    <Delete onClick={handleDelete}>
                        Delete Card
                    </Delete>
                </Btn>
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
                            {card != null ? card.cardNumber : ""}
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
                            {card != null ? card.expiryDate : ""}
                        </DataText>
                    </DataDiv>
                </BodyDiv>
                <BodyDiv>
                    <FieldDiv>
                        <FieldText>
                            Security Code
                        </FieldText>
                    </FieldDiv>
                    <DataDiv>
                        <DataText>
                            {card != null ? card.securityCode : ""}
                        </DataText>
                    </DataDiv>
                </BodyDiv>
                <BodyDiv>
                    <FieldDiv>
                        <FieldText>
                            Name On Card
                        </FieldText>
                    </FieldDiv>
                    <DataDiv>
                        <DataText>
                            {card != null ? card.nameOnCard : ""}
                        </DataText>
                    </DataDiv>
                </BodyDiv>
            </BodyRow>
        </Container>
    );
};

export default CreditCardDetails;
