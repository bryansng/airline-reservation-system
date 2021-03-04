import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import Modal from "react-bootstrap/Modal";
import { rest_endpoints } from "../../config/rest_endpoints.json";
dayjs.extend(isBetween);
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

const ShowReservation = ({ location }) => {
  console.log(location);
  const [reservation, setReservation] = useState(location.state.reservation);
  const [
    isShowCancelConfirmationModal,
    setIsShowCancelConfirmationModal,
  ] = useState(false);

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

  const isReservationWithin24HoursFlightDate = (reservation) => {
    return dayjs().isBetween(
      dayjs(reservation.flight.departureDateTime).subtract(1, "day"),
      dayjs(reservation.flight.departureDateTime)
    );
  };

  const isReservationCancelled = (reservation) => {
    return reservation.reservationStatus === "CANCELLED";
  };

  const isReservationPast = (reservation) => {
    return reservation.reservationStatus === "PAST";
  };

  return (
    <>
      <h2>Show Reservation</h2>
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
          {!isReservationPast(reservation) &&
            !isReservationCancelled(reservation) && (
              <>
                <h6>
                  You may cancel your flight 24 hours within the check-in date.
                </h6>
                <Button
                  type="button"
                  onClick={() => setIsShowCancelConfirmationModal(true)}
                  disabled={!isReservationWithin24HoursFlightDate(reservation)}
                >
                  Cancel Reservation
                </Button>
              </>
            )}
          <Link to="/">
            <Button type="button">Back to home</Button>
          </Link>
          <CancelConfirmationModal
            show={isShowCancelConfirmationModal}
            onHide={() => setIsShowCancelConfirmationModal(false)}
            toggleCancelBooking={toggleCancelBooking}
          />
        </>
      )}
    </>
  );
};

const CancelConfirmationModal = ({ show, onHide, toggleCancelBooking }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <h2>Are you sure?</h2>
      </Modal.Header>
      <Modal.Footer>
        <Button
          onClick={(evt) => {
            onHide();
            toggleCancelBooking(evt);
          }}
        >
          Yes
        </Button>
        <Button onClick={() => onHide()}>No</Button>
      </Modal.Footer>
    </Modal>
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
