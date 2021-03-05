import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Textbox } from "react-inputs-validation";

import { useHistory } from "react-router-dom";

import rest_endpoints from "../../../config/rest_endpoints.json";
const customerEndpoint =  rest_endpoints.rest_endpoints.user.customer_profile;

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

const BodyRow = styled.div.attrs({
  className: `flex flex-column items-center`,
})``;

const BodyDiv = styled.div.attrs({
  className: ``,
})``;

const Form = styled.form.attrs({
  className: `w-30`,
})``;

const FieldDiv = styled.div.attrs({
  className: `mt4`,
})``;

const FieldText = styled.p.attrs({
  className: `f3 gray`,
})``;

const Input = styled.input.attrs({
  className: `input-reset ba b--black-20 pa2 mb4 db w-100`,
  type: `text`,
  ariaDescribedby: `name-desc`,
})``;

const SaveDiv = styled.div.attrs({
  className: `lh-copy mt3 tr`,
})``;

const Save = styled.a.attrs({
  className: `pointer f4 mr2 link dim black db`,
  href: ``,
})``;

// https://reactrouter.com/web/api/match
const PersonalDetails = ({ location }) => {
  let history = useHistory();

  console.log(location)
  const url = customerEndpoint + "/" + location.state.customer.id
  const [isSave, setIsSave] = useState(false);

  const [isValidFirstName, setIsValidFirstName] = useState(false);
  const [isValidLastName, setIsValidLastName] = useState(false);
  const [isValidPhoneNum, setIsValidPhoneNum] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

  const [email, setEmail] = useState(location.state.customer.email);
  const [lastName, setLastName] = useState(location.state.customer.lastName);
  const [firstName, setFirstName] = useState(location.state.customer.firstName);
  const [address, setAddress] = useState(location.state.customer.address);
  const [phoneNum, setPhoneNum] = useState(location.state.customer.phoneNum);

  function handleSave() {
    if (
      isValidFirstName &&
      isValidLastName &&
      isValidPhoneNum &&
      isValidEmail
    ) {
      setIsSave(true);
    } else {
      alert(
        "Cannot update personal details\n\nPlease fill in fields appropriately"
      );
    }
  }

  useEffect(() => {
    if (isSave) {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({
          email: email,
          firstName: firstName,
          lastName: lastName,
          address: address,
          phoneNum: phoneNum,
          bornOn: "2018-03-29T13:34:00.000",
          auth: "member",
        }),
      };

      fetch(url, requestOptions)
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
          throw new Error(`${resp.status} Error updating customer.`);
        })
        .then((res) => {})
        .catch((error) => {
          console.error(error);
        });

      history.go(-2);
    }
  }, [address, email, firstName, history, isSave, lastName, phoneNum, url]);
  return (
    <Container>
      <HeaderRow>
        <TitleContainer>
          <Title>Personal Details</Title>
        </TitleContainer>
      </HeaderRow>
      <BodyRow>
        <Form>
          <BodyDiv>
            <FieldDiv>
              <FieldText>First Name</FieldText>
            </FieldDiv>
            <Textbox
              classNameInput="input-reset ba b--black-20 pa2 db w-100"
              onBlur={(e) => {
                console.log(e);
              }}
              validationOption={{
                name: "First Name",
                check: true,
                required: true,
                customFunc: (name) => {
                  const reg = /^[a-zA-Z]+$/;
                  if (reg.test(name)) {
                    setIsValidFirstName(true);
                    return true;
                  } else {
                    return "is not a valid name";
                  }
                },
              }}
              onChange={(name, e) => setFirstName(name)}
            />
          </BodyDiv>
          <BodyDiv>
            <FieldDiv>
              <FieldText>Last Name</FieldText>
            </FieldDiv>
            <Textbox
              classNameInput="input-reset ba b--black-20 pa2 db w-100"
              onBlur={(e) => {
                console.log(e);
              }}
              validationOption={{
                name: "Last Name",
                check: true,
                required: true,
                customFunc: (name) => {
                  const reg = /^[a-zA-Z]+$/;
                  if (reg.test(name)) {
                    setIsValidLastName(true);
                    return true;
                  } else {
                    return "is not a valid name";
                  }
                },
              }}
              onChange={(name, e) => setLastName(name)}
            />
          </BodyDiv>
          <BodyDiv>
            <FieldDiv>
              <FieldText>Address</FieldText>
            </FieldDiv>
            <Input onChange={(e) => setAddress(e.target.value)} />
          </BodyDiv>
          <BodyDiv>
            <FieldDiv>
              <FieldText>Phone Number</FieldText>
            </FieldDiv>
            <Textbox
              classNameInput="input-reset ba b--black-20 pa2 db w-100"
              onBlur={(e) => {
                console.log(e);
              }}
              validationOption={{
                name: "Phone Number",
                check: true,
                required: true,
                customFunc: (num) => {
                  const reg = /^\d+$/;
                  if (reg.test(num)) {
                    setIsValidPhoneNum(true);
                    return true;
                  } else {
                    return "is not a valid phone number";
                  }
                },
              }}
              onChange={(name, e) => setPhoneNum(name)}
            />
          </BodyDiv>
          <BodyDiv>
            <FieldDiv>
              <FieldText>Email Address</FieldText>
            </FieldDiv>
            <Textbox
              classNameInput="input-reset ba b--black-20 pa2 db w-100"
              onBlur={(e) => {
                console.log(e);
              }}
              validationOption={{
                name: "Email",
                check: true,
                required: true,
                customFunc: (email) => {
                  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                  if (reg.test(email)) {
                    setIsValidEmail(true);
                    return true;
                  } else {
                    return "is not a valid email";
                  }
                },
              }}
              onChange={(name, e) => setEmail(name)}
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

export default PersonalDetails;
