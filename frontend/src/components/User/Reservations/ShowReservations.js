import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import Card from "react-bootstrap/Card";
import * as dayjs from "dayjs";

import rest_endpoints from "../../../config/rest_endpoints.json";
const reservationEndpoint =
  rest_endpoints.rest_endpoints.reservation.get_all_by_customer_id;

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

const ShowReservations = ({ location }) => {
  const user = location.state.user;
  const [reservations, setReservations] = useState([]);

  const url = reservationEndpoint + "/" + user.id;

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

  const isReservationCancelled = (reservation) => {
    return reservation.reservationStatus === "CANCELLED";
  };

  return (
    <>
      {!user && (
        <Redirect
          push
          to={{
            pathname: `/`,
          }}
        />
      )}
      <h2>Show all reservations</h2>
      {reservations.length === 0 ? (
        <Card className="mv3">
          <Card.Body>No reservations</Card.Body>
        </Card>
      ) : (
        reservations.map((reservation, key) => {
          return (
            <Card key={key} className="mv3">
              <Card.Header
                style={
                  isReservationCancelled(reservation)
                    ? { color: "red" }
                    : { color: "green" }
                }
              >
                Status: {reservation.reservationStatus}
              </Card.Header>
              <Card.Body>
                <div className="flex justify-between">
                  <div>
                    <h5 className="mb-3">
                      {`${reservation.flight.departureAirport} to ${reservation.flight.arrivalAirport}`}{" "}
                      on{" "}
                      {`${dayjs(reservation.flight.departureDateTime).format(
                        "DD/MM/YYYY"
                      )}`}{" "}
                      &#8212; {reservation.flight.flightName}
                    </h5>
                    <Card.Subtitle className="text-muted">
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
                  </div>
                  <Link
                    to={{
                      pathname: "/show/reservation/" + reservation.id,
                      state: {
                        reservation: reservation,
                      },
                    }}
                  >
                    <Button type="button">View</Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          );
        })
      )}
      <div className="flex justify-end">
        <div className="">
          <Link
            to={{
              pathname: "/user/profile/",
              state: {
                user: location.state.user,
              },
            }}
          >
            <Button type="button">Back to profile dashboard</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ShowReservations;
