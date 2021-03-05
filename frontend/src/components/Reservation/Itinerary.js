import React from "react";
import styled from "styled-components";
import * as dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import Card from "react-bootstrap/Card";
dayjs.extend(isBetween);

const Grid = styled.div.attrs({})`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Itinerary = ({ flight, numPassengers }) => {
  return (
    <>
      {flight && (
        <Card className="mv2">
          <Card.Header>Itinerary details</Card.Header>

          <Card.Body>
            <h5 className="mb-3">
              {`${flight.departureAirport} to ${flight.arrivalAirport}`} &#8212;{" "}
              {flight.flightName}
            </h5>

            <Card.Subtitle className="mb-4 text-muted">
              {`${dayjs(flight.departureDateTime).format("DD/MM/YYYY")}`}
              {", "}
              {`${dayjs(flight.departureDateTime).format(
                "HH:mm"
              )}`} &#8212;{" "}
              {`${dayjs(flight.arrivalDateTime).format("DD/MM/YYYY")}`}
              {", "}
              {`${dayjs(flight.arrivalDateTime).format("HH:mm")}`}
            </Card.Subtitle>
            <Grid>
              <div className="mv2">
                <div className="dark-gray b">Number of tickets</div>
                <div className="lh-copy">{numPassengers}</div>
              </div>

              <div className="mv2">
                <div className="dark-gray b">Total Price</div>
                <div className="lh-copy">
                  &#8364; {flight.flightPrice * numPassengers}
                </div>
              </div>
            </Grid>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default Itinerary;
