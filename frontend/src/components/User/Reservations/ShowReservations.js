import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import * as dayjs from "dayjs";

import rest_endpoints from "../../../config/rest_endpoints.json";
const reservationEndpoint =
  rest_endpoints.rest_endpoints.reservation.get_all_by_customer_id;

const View = styled.p.attrs({
  className: `f3 dim pointer fw3`,
})``;

const ShowReservations = ({ location }) => {
  const [reservations, setReservations] = useState([]);

  const url = reservationEndpoint + "/" + location.state.user.id;

  useEffect(() => {
    fetch(url)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error(`${resp.status} Error retrieving customer.`);
      })
      .then((res) => {
        setReservations(res.reservations);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [url]);

  return (
    <>
      <h2>Show Reservation</h2>
      <Accordion defaultActiveKey="0">
        {reservations.length === 0 ? (
          <Card>
            <Card.Body>No reservations</Card.Body>
          </Card>
        ) : (
          reservations.map((reservation, key) => {
            return (
              <Card>
                <Card.Header>
                  <Accordion.Toggle
                    as={Card.Header}
                    variant="link"
                    eventKey={key}
                  >
                    {`${reservation.flight.departureAirport} to ${reservation.flight.arrivalAirport}`}{" "}
                    on{" "}
                    {`${dayjs(reservation.flight.departureDateTime).format(
                      "DD/MM/YYYY"
                    )}`}
                    &#8212; {reservation.flight.flightName}
                    <Link
                      to={{
                        pathname: `/show/reservation/${reservation.id}`,
                        state: {
                          reservation: reservation,
                        },
                      }}
                    >
                      <View>View</View>
                    </Link>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={key}>
                  <Card.Body>
                    <h5 className="mb-3">
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
                      {`${dayjs(reservation.flight.arrivalDateTime).format(
                        "HH:mm"
                      )}`}
                    </Card.Subtitle>

                    <div className="mv2">
                      <div className="gray f5">Booking number</div>
                      <div className="lh-copy">{reservation.id}</div>
                    </div>
                    <div className="mv2">
                      <div className="gray f5">Booking name</div>
                      <div className="lh-copy">{`${reservation.customer.lastName}`}</div>
                    </div>
                    <div className="mv2">
                      <div className="gray f5">Number of tickets</div>
                      <div className="lh-copy">
                        {reservation.bookings.length}
                      </div>
                    </div>
                    <div className="mv2">
                      <div className="gray f5">Flight number</div>
                      <div className="lh-copy">
                        {reservation.flight.flightName}
                      </div>
                    </div>
                    <div className="mv2">
                      <div className="gray f5">Check in before</div>
                      <div className="lh-copy">
                        {dayjs(reservation.flight.departureDateTime)
                          .subtract(1, "hour")
                          .format("HH:mm")}
                      </div>
                    </div>
                    {reservation.bookings.map(
                      (currPassengerBooking, currIndex) => (
                        <div className="mv2">
                          <div className="gray f5">
                            Passenger {currIndex + 1}
                          </div>
                          <div className="lh-copy">{`${currPassengerBooking.firstName} ${currPassengerBooking.lastName}`}</div>
                        </div>
                      )
                    )}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            );
          })
        )}
      </Accordion>
    </>
  );
};

export default ShowReservations;
