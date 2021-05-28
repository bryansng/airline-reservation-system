import React, { useState } from "react";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import * as dayjs from "dayjs";
import { Link } from "react-router-dom";
import { rest_endpoints } from "../../config/rest_endpoints.json";
const { flight: flight_apis } = rest_endpoints;

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

const Grid = styled.div.attrs({})`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const ResultGrid = styled.div.attrs({})`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
`;

const SearchFlight = ({ location }) => {
  /*
  1. search flights
  2. display flights */
  const [flights, setFlights] = useState(null);
  const [numberOfPassengers, setNumberOfPassengers] = useState(0);
  const isEditMode = location ? location.state.isEditMode : false;
  const reservation = location ? location.state.reservation : false;
  // const reservationId = location ? location.state.reservation.id : false;

  const handleSubmit = (e) => {
    e.preventDefault();

    const origin = e.target.formOrigin.value;
    const destination = e.target.formDestination.value;
    const departureDate = e.target.formDepartDate.value;
    const numPassengers = e.target.formNumberOfPassengers.value;

    // GET reservation by customer last name and reservation id.
    fetch(
      `${
        flight_apis.search
      }?departureAirport=${origin}&arrivalAirport=${destination}&departureDate=${departureDate}&numOfPassengers=${numPassengers}&pageNum=${0}&fromDepartureDate=${1}`
    )
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error(
          `${resp.status} Error retrieving search result for flights.`
        );
      })
      .then((res) => {
        const flights = res.flight;
        setFlights(flights);
        setNumberOfPassengers(numPassengers);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const sanitiseNumbersOnlyInput = (input) => {
    // replace all whitespace and alphabets with "".
    return input.replace(/[^0-9.]/g, "");
  };

  const onChangeNumPassengers = (e) => {
    e.preventDefault();

    // sanitize user input.
    const currNumPassengers = sanitiseNumbersOnlyInput(e.target.value);
    e.target.value = currNumPassengers;
  };

  return (
    <>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Card className="mv3">
          <Card.Header>Search Flights</Card.Header>
          <Card.Body>
            <Grid>
              <Form.Group className="mh1" controlId="formOrigin">
                <Form.Label className="dark-gray f5">Origin</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type a city or airport"
                  defaultValue="KUL"
                  required
                />
              </Form.Group>
              <Form.Group className="mh1" controlId="formDestination">
                <Form.Label className="dark-gray f5">Destination</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type a city or airport"
                  defaultValue="KCH"
                  required
                />
              </Form.Group>
              <Form.Group className="mh1" controlId="formDepartDate">
                <Form.Label className="dark-gray f5">Departure Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Date"
                  // defaultValue="2021-04-16"
                  defaultValue={dayjs().format("YYYY-MM-DD")}
                  required
                />
              </Form.Group>
              <Form.Group className="mh1" controlId="formNumberOfPassengers">
                <Form.Label className="dark-gray f5">
                  Number of passengers
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="1"
                  defaultValue="1"
                  onChange={(evt) => onChangeNumPassengers(evt)}
                  required
                />
              </Form.Group>
            </Grid>
          </Card.Body>
        </Card>
        <div className="flex justify-end">
          {/* <div className="mr1">
            <Link to={`/flight/create`}>
              <Button type="button">Create flight</Button>
            </Link>
          </div> */}
          <div className="ml1">
            <Button type="submit">Search flights</Button>
          </div>
        </div>
      </Form>
      {flights != null && flights.length !== 0 && (
        <Card className="mv2">
          <Card.Header>Select a flight</Card.Header>
          <ListGroup variant="flush">
            {flights.map((currFlight, currIndex) => {
              const flightDuration = dayjs(currFlight.arrivalDateTime).diff(
                dayjs(currFlight.departureDateTime)
              );

              return (
                <Link
                  key={currIndex}
                  to={
                    isEditMode
                      ? {
                          pathname: `/reservation/edit/${reservation.id}/passenger`,
                          state: {
                            flightId: currFlight.id,
                            numPassengers: numberOfPassengers,
                            isEditMode: true,
                            reservation: reservation,
                          },
                        }
                      : {
                          pathname: `/book/${currFlight.id}`,
                          state: {
                            flightId: currFlight.id,
                            numPassengers: numberOfPassengers,
                          },
                        }
                  }
                  style={{ textDecoration: "none", color: "#212529" }}
                >
                  <ListGroup.Item
                    key={currIndex}
                    className="hover-bg-light-gray"
                    style={{
                      transition: "all 0.15s ease-out",
                    }}
                  >
                    <div className="flex justify-between flex-wrap">
                      <div>
                        <h5 className="mb-3">
                          {`${currFlight.departureAirport} to ${currFlight.arrivalAirport}`}{" "}
                          &#8212; {currFlight.flightName}
                        </h5>

                        <Card.Subtitle className="mb-4 text-muted">
                          {`${dayjs(currFlight.departureDateTime).format(
                            "DD/MM/YYYY"
                          )}`}
                          {", "}
                          {`${dayjs(currFlight.departureDateTime).format(
                            "HH:mm"
                          )}`}{" "}
                          &#8212;{" "}
                          {`${dayjs(currFlight.arrivalDateTime).format(
                            "DD/MM/YYYY"
                          )}`}
                          {", "}
                          {`${dayjs(currFlight.arrivalDateTime).format(
                            "HH:mm"
                          )}`}
                        </Card.Subtitle>
                      </div>
                      {/* <div>
                        <div className="mv2">
                          <div className="dark-gray">Duration</div>
                          <div className="lh-copy">
                            {dayjs(flightDuration).format("HH:mm")}
                          </div>
                        </div>
                      </div> */}
                    </div>

                    <ResultGrid>
                      <div className="mv2">
                        <div className="dark-gray">Duration</div>
                        <div className="lh-copy">
                          {dayjs(flightDuration).format("HH:mm")}
                        </div>
                      </div>
                      <div className="mv2">
                        <div className="dark-gray">Price per ticket</div>
                        <div className="lh-copy">{currFlight.flightPrice}</div>
                      </div>
                      <div className="mv2">
                        <div className="dark-gray">Number of tickets</div>
                        <div className="lh-copy">{numberOfPassengers}</div>
                      </div>

                      <div className="mv2">
                        <div className="dark-gray">Total Price</div>
                        <div className="lh-copy">
                          &#8364; {currFlight.flightPrice * numberOfPassengers}
                        </div>
                      </div>
                      {/* <div>
                        <Link
                          to={{
                            pathname: `/book/${currFlight.id}`,
                            state: {
                              flightId: currFlight.id,
                              numPassengers: numberOfPassengers,
                            },
                          }}
                        >
                          <Button type="button">Select Flight</Button>
                        </Link>
                      </div> */}
                    </ResultGrid>

                    {/* <div>{`${dayjs(currFlight.departureDateTime).format(
                    "HH:mm"
                  )} - ${dayjs(currFlight.arrivalDateTime).format(
                    "HH:mm"
                  )}`}</div>

                  <div>
                    {dayjs(currFlight.departureDateTime).format("ddd, MMM DD")}
                  </div>

                  <div>{`${currFlight.departureAirport} - ${currFlight.arrivalAirport}`}</div>

                  <div>{`Duration: ${dayjs(flightDuration).format(
                    "HH:mm"
                  )}`}</div> */}

                    {/* <div>{`EUR ${
                    currFlight.flightPrice * numberOfPassengers
                  } (EUR ${
                    currFlight.flightPrice
                  }*${numberOfPassengers})`}</div> */}
                  </ListGroup.Item>
                </Link>
              );
            })}
          </ListGroup>
        </Card>
      )}
      {flights == null ||
        (flights.length === 0 && (
          <Card>
            <Card.Body>No flights available.</Card.Body>
          </Card>
        ))}
    </>
  );
};

export default SearchFlight;
