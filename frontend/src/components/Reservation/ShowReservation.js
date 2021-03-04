import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as dayjs from "dayjs";
import { rest_endpoints } from "../../config/rest_endpoints.json";
const { reservation: reservation_apis } = rest_endpoints;

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

const ShowReservation = ({ bookedReservation = null }) => {
  const [reservation, setReservation] = useState(bookedReservation);

  // three situations using this.
  // 1. guest retrieving their reservations/booking.
  // 2. booking confirmation before paying.
  // 3. executive club members reviewing their past/future reservations.

  const toggleCancelBooking = (evt) => {
    evt.preventDefault();

    // call cancel booking endpoint.
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `bearer ${token}`,
      },
      body: JSON.stringify({
        // token: `${token}`,
      }),
    };

    fetch(`${reservation_apis.cancel}/${reservation.id}`, requestOptions)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error(`${resp.status} Error cancelling a reservation.`);
      })
      .then((res) => {
        console.log(res);
        setReservation(res.reservation);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const isReservationCancelled = (reservation) => {
    return reservation.reservationStatus === "CANCELLED";
  };

  return (
    <>
      <h2>Show Booking</h2>
      {reservation && reservation.bookings && (
        <>
          <div>
            <h3>
              {`${reservation.customer.firstName} ${reservation.customer.lastName}`}
              's booking
            </h3>
            <h4
              style={
                isReservationCancelled(reservation)
                  ? { color: "red" }
                  : { color: "green" }
              }
            >
              Status: {reservation.reservationStatus}
            </h4>
            <div>
              Booking name:{" "}
              {`${reservation.customer.firstName} ${reservation.customer.lastName}`}
            </div>
            <div>Booking number: {reservation.id}</div>
            <div>{reservation.bookings.length} tickets on</div>
            <div>Flight number: {reservation.flight.flightName}</div>
            <div>{`${reservation.flight.departureAirport} - ${reservation.flight.arrivalAirport}`}</div>
            <div>{`${dayjs(reservation.flight.departureDateTime).format(
              "DD/MM/YYYY"
            )}`}</div>
            <div>{`${dayjs(reservation.flight.departureDateTime).format(
              "HH:mm"
            )} - ${dayjs(reservation.flight.arrivalDateTime).format(
              "HH:mm"
            )}`}</div>
            <h6>
              Check in before{" "}
              {dayjs(reservation.flight.departureDateTime)
                .subtract(1, "hour")
                .format("HH:mm")}
            </h6>
            <div>
              {reservation.bookings.map((currPassengerBooking, currIndex) => (
                <PassengerDetails
                  key={currIndex}
                  index={currIndex}
                  passenger={currPassengerBooking.customer}
                />
              ))}
            </div>
          </div>
          {!isReservationCancelled(reservation) && (
            <>
              <h6>
                You may cancel your flight 24 hours within the check-in date.
              </h6>
              <Button type="button" onClick={(evt) => toggleCancelBooking(evt)}>
                Cancel Reservation
              </Button>
            </>
          )}
          <Link to="/">
            <Button type="button">Back to home</Button>
          </Link>
        </>
      )}
    </>
  );
};

const PassengerDetails = ({ index, passenger }) => {
  return (
    <>
      <div>Passenger {index + 1}</div>
      <div>{`${passenger.firstName} ${passenger.lastName}`}</div>
    </>
  );
};

export default ShowReservation;
