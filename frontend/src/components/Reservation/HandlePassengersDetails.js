import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/esm/Card";

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

const HandlePassengersDetails = ({
  setPassengersDetails,
  numPassengers,
  loggedInUser,
  isAuthenticated,
}) => {
  const [passengerForms, setPassengerForms] = useState(null);

  useEffect(() => {
    const forms = [];

    for (var ind = 0; ind < numPassengers; ind++) {
      forms.push(
        <APassengerDetailsForm
          key={ind}
          index={ind}
          loggedInUser={loggedInUser}
          isAuthenticated={isAuthenticated}
        />
      );
    }

    setPassengerForms(forms);
  }, [numPassengers, loggedInUser, isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // on submit, parse details from all forms and setPassengersDetails.
    const passengerDetails = [];
    for (var ind = 0; ind < numPassengers; ind++) {
      const firstName = e.target[`formFirstName${ind}`].value;
      const lastName = e.target[`formLastName${ind}`].value;
      const email = e.target[`formEmail${ind}`].value;
      const mobileNumber = e.target[`formMobileNumber${ind}`].value;
      const address = e.target[`formAddress${ind}`].value;

      passengerDetails.push({
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobileNumber: mobileNumber,
        address: address,
      });
    }
    setPassengersDetails(passengerDetails);
  };

  return (
    <>
      {/* <h3 className="mb2">Please input passenger details</h3> */}
      <div>
        <Form onSubmit={(e) => handleSubmit(e)}>
          {passengerForms}
          <div className="flex justify-end">
            <div className="mr1">
              <Link to="/">
                <Button type="button">Cancel</Button>
              </Link>
            </div>
            <div className="ml1">
              <Button type="submit">Confirm</Button>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

const APassengerDetailsForm = ({ index, loggedInUser, isAuthenticated }) => {
  const isFirstUserAndIsAuthenticatedAndIsLoggedInUser = () => {
    return !!(
      index === 0 &&
      isAuthenticated &&
      loggedInUser &&
      loggedInUser.id
    );
  };

  const sanitiseNumbersOnlyInput = (input) => {
    // replace all whitespace and alphabets with "".
    return input.replace(/[^/+0-9.]/g, "");
  };

  const onChangeMobileNumber = (e) => {
    e.preventDefault();

    // sanitize user input.
    e.target.value = sanitiseNumbersOnlyInput(e.target.value);
  };

  const ActualFormComponent = () => {
    return (
      <Card className="mv3">
        <Card.Header>
          {index === 0 ? (
            <div>Please input your details</div>
          ) : (
            <div>Please input passenger {index + 1}'s details</div>
          )}
        </Card.Header>
        <Card.Body>
          <Grid>
            <Form.Group className="mh1" controlId={`formFirstName${index}`}>
              <Form.Label className="dark-gray f5">First name</Form.Label>
              <Form.Control
                type="text"
                placeholder="John"
                defaultValue={
                  isFirstUserAndIsAuthenticatedAndIsLoggedInUser()
                    ? loggedInUser.firstName
                    : "testFirstName"
                }
                required
              />
            </Form.Group>
            <Form.Group className="mh1" controlId={`formLastName${index}`}>
              <Form.Label className="dark-gray f5">Surname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Doe"
                defaultValue={
                  isFirstUserAndIsAuthenticatedAndIsLoggedInUser()
                    ? loggedInUser.lastName
                    : "testLastName"
                }
                required
              />
            </Form.Group>
            <Form.Group className="mh1" controlId={`formEmail${index}`}>
              <Form.Label className="dark-gray f5">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="johndoe@gmail.com"
                defaultValue={
                  isFirstUserAndIsAuthenticatedAndIsLoggedInUser()
                    ? loggedInUser.email
                    : "testEmail@test.com"
                }
                required
              />
            </Form.Group>
            <Form.Group className="mh1" controlId={`formMobileNumber${index}`}>
              <Form.Label className="dark-gray f5">Mobile number</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                defaultValue={
                  isFirstUserAndIsAuthenticatedAndIsLoggedInUser()
                    ? loggedInUser.mobileNumber
                    : "testMobileNumber"
                }
                onChange={(evt) => onChangeMobileNumber(evt)}
                required
              />
            </Form.Group>
          </Grid>
          <Form.Group className="mh1" controlId={`formAddress${index}`}>
            <Form.Label className="dark-gray f5">Address</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              defaultValue={
                isFirstUserAndIsAuthenticatedAndIsLoggedInUser()
                  ? loggedInUser.address
                  : "testAddress"
              }
              required
            />
          </Form.Group>
        </Card.Body>
      </Card>
    );
  };

  return <ActualFormComponent />;
};

export default HandlePassengersDetails;
