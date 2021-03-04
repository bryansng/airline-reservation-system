import React from "react";
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

const HandlePaymentDetails = ({ setPaymentDetails }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const nameOnCard = e.target.formNameOnCard.value;
    const cardNumber = e.target.formCardNumber.value;
    const expiryDate = e.target.formExpiryDate.value;
    const securityCode = e.target.formSecurityCode.value;

    const paymentDetails = {
      nameOnCard: nameOnCard,
      cardNumber: cardNumber,
      expiryDate: expiryDate,
      securityCode: securityCode,
    };
    console.log(paymentDetails);
    setPaymentDetails(paymentDetails);
  };

  const sanitiseNumbersOnlyInput = (input) => {
    // replace all whitespace and alphabets with "".
    return input.replace(/[^0-9.]/g, "");
  };

  const limitInputSize = (input, size) => {
    return input.slice(0, size);
  };

  const onChangeCardNumber = (e) => {
    e.preventDefault();

    // sanitize user input.
    const currCardNumber = limitInputSize(
      sanitiseNumbersOnlyInput(e.target.value),
      19
    );

    // format card number to add space after every 4 digits.
    e.target.value = currCardNumber
      .replace(/(\d{4})/g, "$1 ")
      .replace(/^\s+|\s+$/, "");
  };

  const onChangeExpiryDate = (e) => {
    e.preventDefault();

    // sanitize user input.
    const currExpiryDate = limitInputSize(
      sanitiseNumbersOnlyInput(e.target.value),
      4
    ).replace(/\//g, "");

    // format expiry date to add forward slash after months.
    if (currExpiryDate.length < 3) {
      e.target.value = currExpiryDate;
    } else {
      e.target.value =
        currExpiryDate.substring(0, 2) + "/" + currExpiryDate.substring(2, 4);
    }
  };

  const onChangeSecurityCode = (e) => {
    e.preventDefault();

    // sanitize user input.
    const currExpiryDate = limitInputSize(
      sanitiseNumbersOnlyInput(e.target.value),
      3
    );

    e.target.value = currExpiryDate;
  };

  return (
    <>
      <h2>Handle Payment Details</h2>
      <div>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group controlId="formNameOnCard">
            <Form.Label>Name on Card</Form.Label>
            <Form.Control
              type="text"
              placeholder="John Doe"
              defaultValue="testNameOnCard"
              required
            />
          </Form.Group>
          <Form.Group controlId="formCardNumber">
            <Form.Label>Card Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="1234 5678 8765 4321"
              defaultValue="1234 5678 8765 4321"
              onChange={(evt) => onChangeCardNumber(evt)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formExpiryDate">
            <Form.Label>Expiry Date</Form.Label>
            <Form.Control
              type="text"
              placeholder="04/25"
              defaultValue="04/25"
              onChange={(evt) => onChangeExpiryDate(evt)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formSecurityCode">
            <Form.Label>CVV or Security Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="412"
              defaultValue="412"
              onChange={(evt) => onChangeSecurityCode(evt)}
              required
            />
          </Form.Group>
          <Link to="/">
            <Button type="button">Cancel</Button>
          </Link>
          <Button type="submit">Pay</Button>
        </Form>
      </div>
    </>
  );
};

export default HandlePaymentDetails;
