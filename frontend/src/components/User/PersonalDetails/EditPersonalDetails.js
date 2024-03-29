import React, { useState } from "react";
import styled from "styled-components";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import ErrorMessage from "../../Common/ErrorMessage";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import rest_endpoints from "../../../config/rest_endpoints.json";
const customerEndpoint = rest_endpoints.rest_endpoints.user.customer_profile;

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

const Grid = styled.div.attrs({})`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const EditPersonalDetails = ({ location, token, setUser }) => {
  const user =
    location.state && location.state.user ? location.state.user : null;
  const [updatedUser, setUpdatedUser] = useState(null);

  const url = customerEndpoint + "/" + user.id;
  const [isSave, setIsSave] = useState(null);

  const [hasFormError, setHasFormError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: e.target.formEmail.value,
        firstName: e.target.formFirstName.value,
        lastName: e.target.formLastName.value,
        address: e.target.formAddress.value,
        phoneNum: e.target.formMobileNumber.value,
      }),
    };
    // console.log(requestOptions);

    fetch(url, requestOptions)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error(`Error: Unexpected error while updating customer.`);
      })
      .then((res) => {
        // console.log(res);
        if (res.statusCode !== "200") {
          setErrorMessage(`Error: ${res.message}`);
          setHasFormError(true);
        } else {
          setHasFormError(false);
          setUser(res.customer);
          setUpdatedUser(res.customer);
          setIsSave(true);
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(error.message);
        setHasFormError(true);
      });
  };

  return (
    <>
      {!user && (
        <Redirect
          push
          to={{
            pathname: `/`,
          }}
        />
      )}
      {!isSave && (
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Card className="mv3">
            <Card.Header>Update user details</Card.Header>
            {user && (
              <Card.Body>
                <Grid>
                  <Form.Group className="mh1" controlId={`formFirstName`}>
                    <Form.Label className="dark-gray f5">First name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={user.firstName}
                      defaultValue={user.firstName}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mh1" controlId={`formLastName`}>
                    <Form.Label className="dark-gray f5">Surname</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={user.lastName}
                      defaultValue={user.lastName}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mh1" controlId={`formEmail`}>
                    <Form.Label className="dark-gray f5">
                      Email address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder={user.email}
                      defaultValue={user.email}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mh1" controlId={`formMobileNumber`}>
                    <Form.Label className="dark-gray f5">
                      Mobile number
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={user.mobileNumber}
                      defaultValue={user.mobileNumber}
                      required
                    />
                  </Form.Group>
                </Grid>
                <Form.Group className="mh1" controlId={`formAddress`}>
                  <Form.Label className="dark-gray f5">Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={user.address}
                    defaultValue={user.address}
                    required
                  />
                </Form.Group>
              </Card.Body>
            )}
          </Card>
          {hasFormError && <ErrorMessage error>{errorMessage}</ErrorMessage>}
          <div className="flex justify-end">
            <div className="mr1">
              <Link
                to={{
                  pathname: `/user/profile/personaldetails`,
                  state: { user: user },
                }}
              >
                <Button type="button">Cancel</Button>
              </Link>
            </div>
            <div className="ml1">
              <Button type="submit">Save Changes</Button>
            </div>
          </div>
        </Form>
      )}
      {isSave && (
        <Redirect
          push
          to={{
            pathname: `/user/profile/personaldetails`,
            state: { user: updatedUser },
          }}
        />
      )}
    </>
  );
};

export default EditPersonalDetails;
