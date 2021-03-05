import React, { useState } from "react";
import * as dayjs from "dayjs";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

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

const Grid = styled.div.attrs({})`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const ConfirmItineraryDetails = ({
  confirmationBooking,
  setIsConfirmedBooking,
}) => {
  const [reservation] = useState(confirmationBooking.reservation);

  return (
    <>
      {/* <h3 className="lh-copy mb2">Confirm Itinerary Details</h3> */}
      <Card className="mv2">
        <Card.Header>Confirm itinerary details</Card.Header>

        <Card.Body>
          {/* <h5 className="mb-3">
            {`${reservation.flight.departureAirport} to ${reservation.flight.arrivalAirport}`}{" "}
            &#8212; {reservation.flight.flightName}
          </h5>

          <Card.Subtitle className="mb-4 text-muted">
            {`${dayjs(reservation.flight.departureDateTime).format(
              "DD/MM/YYYY"
            )}`}
            {", "}
            {`${dayjs(reservation.flight.departureDateTime).format(
              "HH:mm"
            )}`}{" "}
            &#8212;{" "}
            {`${dayjs(reservation.flight.arrivalDateTime).format(
              "DD/MM/YYYY"
            )}`}
            {", "}
            {`${dayjs(reservation.flight.arrivalDateTime).format("HH:mm")}`}
          </Card.Subtitle> */}

          {/* <div className="mv2 ">
              <div className="gray f5">Departure airport</div>
              <div className="lh-copy f4">
                {reservation.flight.departureAirport}
              </div>
            </div>

            <div className="mv2 ">
              <div className="gray f5">Arrival airport</div>
              <div className="lh-copy f4">
                {reservation.flight.arrivalAirport}
              </div>
            </div>

            <div className="mv2 ">
              <div className="gray f5">Time of departure</div>
              <div className="lh-copy f4">
                {`${dayjs(reservation.flight.departureDateTime).format(
                  "DD/MM/YYYY"
                )}`}
                {", "}
                {`${dayjs(reservation.flight.departureDateTime).format(
                  "HH:mm"
                )}`}
              </div>
            </div>

            <div className="mv2 ">
              <div className="gray f5">Time of arrival</div>
              <div className="lh-copy f4">
                {`${dayjs(reservation.flight.arrivalDateTime).format(
                  "DD/MM/YYYY"
                )}`}
                {", "}
                {`${dayjs(reservation.flight.arrivalDateTime).format("HH:mm")}`}
              </div>
            </div> */}

          {reservation.bookings.map((currPassenger, currInd) => (
            <div key={currInd}>
              <div>Passenger {currInd + 1}</div>
              <Grid>
                <div className="mv2">
                  <div className="gray f5">Full name</div>
                  <div className="lh-copy">{`${currPassenger.firstName} ${currPassenger.lastName}`}</div>
                </div>
                <div className="mv2">
                  <div className="gray f5">Email address</div>
                  <div className="lh-copy">{`${currPassenger.email}`}</div>
                </div>
                <div className="mv2">
                  <div className="gray f5">Mobile number</div>
                  <div className="lh-copy">{`${currPassenger.mobileNumber}`}</div>
                </div>
                <div className="mv2">
                  <div className="gray f5">Address</div>
                  <div className="lh-copy">{`${currPassenger.address}`}</div>
                </div>
              </Grid>
            </div>
          ))}

          {/* <div className="mv2 ">
              <div className="dark-gray f5">Number of tickets</div>
              <div className="lh-copy f4 b">
                &#8364; {reservation.bookings.length}
              </div>
            </div>

            <div className="mv2 ">
              <div className="dark-gray f5">Total Price</div>
              <div className="lh-copy f4 b">
                &#8364; {reservation.totalCost}
              </div>
            </div> */}

          {/* {`${dayjs(reservation.flight.departureDateTime).format(
            "DD/MM/YYYY"
          )}  ${reservation.flight.departureAirport} - ${
            reservation.flight.arrivalAirport
          }`}
          {`${dayjs(reservation.flight.departureDateTime).format(
            "HH:mm"
          )} - ${dayjs(reservation.flight.arrivalDateTime).format("HH:mm")}`} */}
        </Card.Body>
      </Card>

      <div className="flex justify-end mv2">
        <div className="mr1">
          <Link to="/">
            <Button type="button">Cancel</Button>
          </Link>
        </div>
        <div className="ml1">
          <Button type="button" onClick={() => setIsConfirmedBooking(true)}>
            Confirm
          </Button>
        </div>
      </div>
    </>
  );
};

export default ConfirmItineraryDetails;
