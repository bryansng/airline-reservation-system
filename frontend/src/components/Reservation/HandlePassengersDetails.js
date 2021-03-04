import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

const Button = styled.button.attrs({
  className: `ma2 relative w-100 b--gray ma0 br2 ba hover-bg-light-gray tc`,
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
      <h2>Handle Passengers Details</h2>
      <div>
        <Form onSubmit={(e) => handleSubmit(e)}>
          {passengerForms}
          <Link to="/">
            <Button type="button">Cancel</Button>
          </Link>
          <Button type="submit">Next</Button>
        </Form>
      </div>
    </>
  );
};

const APassengerDetailsForm = ({ index }) => {
  return (
    <>
      {index === 0 ? (
        <div>Your details:</div>
      ) : (
        <div>Passenger {index + 1}'s' details:</div>
      )}
      <Form.Group controlId={`formFirstName${index}`}>
        <Form.Label>First name</Form.Label>
        <Form.Control
          type="text"
          placeholder="John"
          defaultValue="testFirstName"
          required
        />
      </Form.Group>
      <Form.Group controlId={`formLastName${index}`}>
        <Form.Label>Surname</Form.Label>
        <Form.Control
          type="text"
          placeholder="Doe"
          defaultValue="testLastName"
          required
        />
      </Form.Group>
      <Form.Group controlId={`formEmail${index}`}>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="johndoe@gmail.com"
          defaultValue="testEmail@test.com"
          required
        />
      </Form.Group>
      <Form.Group controlId={`formMobileNumber${index}`}>
        <Form.Label>Mobile number</Form.Label>
        <Form.Control
          type="text"
          placeholder=""
          defaultValue="testMobileNumber"
          required
        />
      </Form.Group>
      <Form.Group controlId={`formAddress${index}`}>
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          placeholder=""
          defaultValue="testAddress"
          required
        />
      </Form.Group>
    </>
  );
};

export default HandlePassengersDetails;
