import React from "react";
import styled from "styled-components";

import useFetch from 'react-use-fetch-hooks';
import 'react-use-fetch-hooks/dist/index.css';

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
const DeleteBtn = styled.div.attrs({
    className: `w-50 mt2 mb5 `
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
    className: `f3  gray`
})``

const DataDiv = styled.div.attrs({
    className: `mb5`
})``

const DataText = styled.p.attrs({
    className: `f4 dark-gray fw3`
})``

// https://reactrouter.com/web/api/match
const PersonalDetails = ({ match }) => {
    
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
                <Title>Personal Details</Title>
            </TitleContainer>
            <DeleteBtn>
                <Delete>
                    Delete Account
                </Delete>
            </DeleteBtn>
        </HeaderRow>
        <BodyRow>
            <BodyDiv>
                <FieldDiv>
                    <FieldText>
                        First Name
                    </FieldText>
                </FieldDiv>
                <DataDiv>
                    <DataText>
                        {testUserId.firstName}
                    </DataText>
                </DataDiv>
            </BodyDiv>
            <BodyDiv>
                <FieldDiv>
                    <FieldText>
                        Last Name
                    </FieldText>
                </FieldDiv>
                <DataDiv>
                    <DataText>
                        {testUserId.lastName}
                    </DataText>
                </DataDiv>
            </BodyDiv>
            <BodyDiv>
                <FieldDiv>
                    <FieldText>
                        Address
                    </FieldText>
                </FieldDiv>
                <DataDiv>
                    <DataText>
                        {testUserId.address}
                    </DataText>
                </DataDiv>
            </BodyDiv>
            <BodyDiv>
                <FieldDiv>
                    <FieldText>
                        Phone Number
                    </FieldText>
                </FieldDiv>
                <DataDiv>
                    <DataText>
                        {testUserId.phone}
                    </DataText>
                </DataDiv>
            </BodyDiv>
            <BodyDiv>
                <FieldDiv>
                    <FieldText>
                        Email Address
                    </FieldText>
                </FieldDiv>
                <DataDiv>
                    <DataText>
                        {testUserId.email}
                    </DataText>
                </DataDiv>
            </BodyDiv>
        </BodyRow>
    </Container>
  );
};

export default PersonalDetails;
