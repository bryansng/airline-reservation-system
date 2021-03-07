import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "react-bootstrap/esm/Card";

import { Textbox } from "react-inputs-validation";

import { useHistory } from "react-router-dom";

import rest_endpoints from "../../../config/rest_endpoints.json";
const customerEndpoint = rest_endpoints.rest_endpoints.user.customer_profile;

const Grid = styled.div.attrs({})`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

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
const EditPersonalDetails = ({ location, setUser }) => {
  const user =
    location.state && location.state.user ? location.state.user : null;
  console.log(user);
  let history = useHistory();

  console.log(location);
  const url = customerEndpoint + "/" + location.state.user.id;
  const [isSave, setIsSave] = useState(false);

  const [isValidFirstName, setIsValidFirstName] = useState(false);
  const [isValidLastName, setIsValidLastName] = useState(false);
  const [isValidPhoneNum, setIsValidPhoneNum] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

  const [email, setEmail] = useState(location.state.user.email);
  const [lastName, setLastName] = useState(location.state.user.lastName);
  const [firstName, setFirstName] = useState(location.state.user.firstName);
  const [address, setAddress] = useState(location.state.user.address);
  const [phoneNum, setPhoneNum] = useState(location.state.user.phoneNum);

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
        .then((res) => {
          console.log(res);
          setUser(res.customer);
        })
        .catch((error) => {
          console.error(error);
        });

      history.go(-2);
    }
  }, [
    address,
    email,
    firstName,
    history,
    isSave,
    lastName,
    phoneNum,
    url,
    setUser,
  ]);
  return (
    <>
      <Card className="mv3">
        <Card.Header>Update user details</Card.Header>
        {user && (
          <Card.Body>
            <Grid>
              <Form.Group className="mh1" controlId={`formFirstName`}>
                <Form.Label className="dark-gray f5">First name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={
                    location.state.user.firstName
                      ? ""
                      : location.state.user.firstName
                  }
                  defaultValue={
                    location.state.user.firstName
                      ? ""
                      : location.state.user.firstName
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mh1" controlId={`formLastName`}>
                <Form.Label className="dark-gray f5">Surname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={
                    location.state.user.lastName
                      ? ""
                      : location.state.user.lastName
                  }
                  defaultValue={
                    location.state.user.lastName
                      ? ""
                      : location.state.user.lastName
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mh1" controlId={`formEmail`}>
                <Form.Label className="dark-gray f5">Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder={
                    location.state.user.email ? "" : location.state.user.email
                  }
                  defaultValue={
                    location.state.user.email ? "" : location.state.user.email
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mh1" controlId={`formMobileNumber`}>
                <Form.Label className="dark-gray f5">Mobile number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={
                    location.state.user.mobileNumber
                      ? ""
                      : location.state.user.mobileNumber
                  }
                  defaultValue={
                    location.state.user.mobileNumber
                      ? ""
                      : location.state.user.mobileNumber
                  }
                  required
                />
              </Form.Group>
            </Grid>
            <Form.Group className="mh1" controlId={`formAddress`}>
              <Form.Label className="dark-gray f5">Address</Form.Label>
              <Form.Control
                type="text"
                placeholder={
                  location.state.user.address ? "" : location.state.user.address
                }
                defaultValue={
                  location.state.user.address ? "" : location.state.user.address
                }
                required
              />
            </Form.Group>
          </Card.Body>
        )}
      </Card>
    </>
  );
};

export default EditPersonalDetails;
