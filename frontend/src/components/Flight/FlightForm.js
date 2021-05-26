import React, { useState } from "react";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import * as dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import ErrorMessage from "../Common/ErrorMessage";
import { Redirect } from "react-router";
import { rest_endpoints } from "../../config/rest_endpoints.json";
const { flight: flight_apis } = rest_endpoints.admin;
dayjs.extend(isBetween);

const Grid = styled.div.attrs({})`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Button = styled.button.attrs({
  className: `relative w-100 b--gray mh0 mb2 br2 ba hover-bg-light-gray tc`,
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

const FlightForm = () => {
  const [hasFormError, setHasFormError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newFlightId, setNewFlightId] = useState("");

  function isNewFlightResponseCorrect(requestBody, responseBody) {
    requestBody = JSON.parse(requestBody);
    if (
      requestBody.flightName === responseBody.flightName &&
      requestBody.flightPrice.toString() ===
        responseBody.flightPrice.toString() &&
      requestBody.departureAirport === responseBody.departureAirport &&
      requestBody.arrivalAirport === responseBody.arrivalAirport &&
      dayjs(requestBody.departureDateTime, "YYYY-MM-DDThh:mm").isSame(
        dayjs(responseBody.departureDateTime, "YYYY-MM-DDThh:mm:ss")
      ) &&
      dayjs(requestBody.arrivalDateTime, "YYYY-MM-DDThh:mm").isSame(
        dayjs(responseBody.arrivalDateTime, "YYYY-MM-DDThh:mm:ss")
      )
    )
      return true;
    return false;
  }

  const handleCreateSubmit = (e) => {
    e.preventDefault();

    const flightName = e.target.formFlightName.value;
    const flightPrice = e.target.formFlightPrice.value;
    const departureAirport = e.target.formDepartureAirport.value;
    const arrivalAirport = e.target.formArrivalAirport.value;
    const departureDateTime = e.target.formDepartureDateTime.value;
    const arrivalDateTime = e.target.formArrivalDateTime.value;

    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `bearer ${token}`,
      },
      body: JSON.stringify({
        // token: `${token}`,
        flightName: flightName,
        flightPrice: flightPrice,
        departureAirport: departureAirport,
        arrivalAirport: arrivalAirport,
        departureDateTime: departureDateTime,
        arrivalDateTime: arrivalDateTime,
        numOfSeats: 100,
      }),
    };

    fetch(flight_apis.create, request)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error(`Error creating flight.`);
      })
      .then((resp) => {
        if (isNewFlightResponseCorrect(request.body, resp.flight))
          setNewFlightId(resp.flight.id);
        else throw new Error(`Flight response incorrect.`);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(`Error: ${error.message}`);
        setHasFormError(true);
      });
  };
  return (
    <>
      {hasFormError && <ErrorMessage error>{errorMessage}</ErrorMessage>}
      <Form onSubmit={(e) => handleCreateSubmit(e)}>
        <Card className="mv2">
          <Card.Header>Create flight</Card.Header>

          <Card.Body>
            <Grid>
              <Form.Group className="mh1" controlId="formFlightName">
                <Form.Label className="dark-gray f5">Flight Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Flight Name"
                  defaultValue="TST 0000"
                  required
                />
              </Form.Group>
              <Form.Group className="mh1" controlId="formFlightPrice">
                <Form.Label className="dark-gray f5">
                  Price per ticket
                </Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">&#8364;</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="number"
                    placeholder="0.00"
                    step=".01"
                    defaultValue="66"
                    required
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group className="mh1" controlId="formDepartureAirport">
                <Form.Label className="dark-gray f5">Origin</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type a city or airport"
                  defaultValue="KUL"
                  required
                />
              </Form.Group>
              <Form.Group className="mh1" controlId="formArrivalAirport">
                <Form.Label className="dark-gray f5">Destination</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type a city or airport"
                  defaultValue="KCH"
                  required
                />
              </Form.Group>
              <Form.Group className="mh1" controlId="formDepartureDateTime">
                <Form.Label className="dark-gray f5">
                  Departure Date &amp; Time
                </Form.Label>
                <Form.Control
                  type="datetime-local"
                  placeholder="Datetime"
                  defaultValue={dayjs()
                    .add(1, "day")
                    .add(1, "hour")
                    .startOf("hour")
                    .format("YYYY-MM-DDTHH:mm")}
                  required
                />
              </Form.Group>
              <Form.Group className="mh1" controlId="formArrivalDateTime">
                <Form.Label className="dark-gray f5">
                  Arrival Date &amp; Time
                </Form.Label>
                <Form.Control
                  type="datetime-local"
                  placeholder="Datetime"
                  defaultValue={dayjs()
                    .add(1, "day")
                    .add(3, "hour")
                    .startOf("hour")
                    .format("YYYY-MM-DDTHH:mm")}
                  required
                />
              </Form.Group>
            </Grid>
          </Card.Body>
        </Card>
        <div className="flex justify-end">
          <div className="mr1">
            <Link to={`/`}>
              <Button type="button">Cancel</Button>
            </Link>
          </div>
          <div className="ml1">
            <Button type="submit">Create flight</Button>
          </div>
        </div>
      </Form>
      {newFlightId && (
        <Redirect
          push
          to={{
            pathname: `/flight`,
          }}
        />
      )}
    </>
  );
};
export default FlightForm;
