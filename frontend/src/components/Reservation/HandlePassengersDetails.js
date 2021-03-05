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

const HandlePassengersDetails = ({ setPassengersDetails, numPassengers }) => {
  const [passengerForms, setPassengerForms] = useState(null);

  useEffect(() => {
    const forms = [];

    for (var ind = 0; ind < numPassengers; ind++) {
      forms.push(<APassengerDetailsForm key={ind} index={ind} />);
    }

    setPassengerForms(forms);
  }, [numPassengers]);

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
    console.log(passengerDetails);
    setPassengersDetails(passengerDetails);
  };

  return (
    <>
      <h3 className="mb2">Please input passenger details</h3>
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
              <Button type="submit">Go to payment</Button>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

const APassengerDetailsForm = ({ index }) => {
  return (
    <Card className="mv3">
      {/* {index === 0 ? (
        <div>Your details:</div>
      ) : (
        <div>Passenger {index + 1}'s' details:</div>
      )} */}
      <Card.Header>Passenger {index + 1}</Card.Header>
      <Card.Body>
        <Form.Group className="mb1" controlId={`formFirstName${index}`}>
          <Form.Label className="gray f6">First name</Form.Label>
          <Form.Control
            type="text"
            placeholder="John"
            defaultValue="testFirstName"
            required
          />
        </Form.Group>
        <Form.Group className="mb1" controlId={`formLastName${index}`}>
          <Form.Label className="gray f6">Surname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Doe"
            defaultValue="testLastName"
            required
          />
        </Form.Group>
        <Form.Group className="mb1" controlId={`formEmail${index}`}>
          <Form.Label className="gray f6">Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="johndoe@gmail.com"
            defaultValue="testEmail@test.com"
            required
          />
        </Form.Group>
        <Form.Group className="mb1" controlId={`formMobileNumber${index}`}>
          <Form.Label className="gray f6">Mobile number</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            defaultValue="testMobileNumber"
            required
          />
        </Form.Group>
        <Form.Group className="mb1" controlId={`formAddress${index}`}>
          <Form.Label className="gray f6">Address</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            defaultValue="testAddress"
            required
          />
        </Form.Group>
      </Card.Body>
    </Card>
  );
};

export default HandlePassengersDetails;
