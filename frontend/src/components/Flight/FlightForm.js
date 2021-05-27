import React, { useState } from "react";
import isNewFlightResponseCorrect from "./isNewFlightResponseCorrect";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import * as dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import ErrorMessage from "../Common/ErrorMessage";
import Button from "../Common/Button";
import { Redirect } from "react-router";
import { rest_endpoints } from "../../config/rest_endpoints.json";
const { flight: flight_apis } = rest_endpoints.admin;
dayjs.extend(isBetween);

const Grid = styled.div.attrs({})`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const FlightForm = ({
  handleSubmit,
  isEditMode,
  originalFlight,
  hasEditFormError = false,
  editErrorMessage = "",
}) => {
  const [hasFormError, setHasFormError] = useState(false);
  const [isErrorResponse, setIsErrorResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [newFlightId, setNewFlightId] = useState("");

  const defaultNewFlight = {
    flightName: "TST 0000",
    flightPrice: 66,
    departureAirport: "KUL",
    arrivalAirport: "KCH",
    departureDateTime: dayjs()
      .add(1, "day")
      .add(1, "hour")
      .startOf("hour")
      .format("YYYY-MM-DDTHH:mm"),
    arrivalDateTime: dayjs()
      .add(1, "day")
      .add(3, "hour")
      .startOf("hour")
      .format("YYYY-MM-DDTHH:mm"),
  };

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
        if (isNewFlightResponseCorrect(request.body, resp.flight)) {
          setResponseMessage(`Created flight ${resp.flight.id} successfully.`);
          setIsErrorResponse(false);
          setNewFlightId(resp.flight.id);
        } else throw new Error(`Flight response incorrect.`);
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
      {hasEditFormError && (
        <ErrorMessage error>{editErrorMessage}</ErrorMessage>
      )}

      <Form
        onSubmit={(e) => {
          isEditMode ? handleSubmit(e) : handleCreateSubmit(e);
        }}
      >
        <Card className="mv2">
          <Card.Header>
            {isEditMode ? "Edit flight" : "Create flight"}
          </Card.Header>

          <Card.Body>
            <Grid>
              <Form.Group className="mh1" controlId="formFlightName">
                <Form.Label className="dark-gray f5">Flight Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Flight Name"
                  defaultValue={
                    isEditMode
                      ? originalFlight.flightName
                      : defaultNewFlight.flightName
                  }
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
                    defaultValue={
                      isEditMode
                        ? originalFlight.flightPrice
                        : defaultNewFlight.flightPrice
                    }
                    required
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group className="mh1" controlId="formDepartureAirport">
                <Form.Label className="dark-gray f5">Origin</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type a city or airport"
                  defaultValue={
                    isEditMode
                      ? originalFlight.departureAirport
                      : defaultNewFlight.departureAirport
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mh1" controlId="formArrivalAirport">
                <Form.Label className="dark-gray f5">Destination</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type a city or airport"
                  defaultValue={
                    isEditMode
                      ? originalFlight.arrivalAirport
                      : defaultNewFlight.arrivalAirport
                  }
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
                  defaultValue={
                    isEditMode
                      ? originalFlight.departureDateTime
                      : defaultNewFlight.departureDateTime
                  }
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
                  defaultValue={
                    isEditMode
                      ? originalFlight.arrivalDateTime
                      : defaultNewFlight.arrivalDateTime
                  }
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
            <Button type="submit">
              {isEditMode ? "Edit flight" : "Create flight"}
            </Button>
          </div>
        </div>
      </Form>
      {newFlightId && (
        <Redirect
          push
          to={{
            pathname: `/flight`,
            state: {
              responseMessage: responseMessage,
              isErrorResponse: isErrorResponse,
            },
          }}
        />
      )}
    </>
  );
};

export default FlightForm;
