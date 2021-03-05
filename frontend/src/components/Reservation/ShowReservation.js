import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { rest_endpoints } from "../../config/rest_endpoints.json";
dayjs.extend(isBetween);
const { reservation: reservation_apis } = rest_endpoints;

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
      <h3 className="lh-copy mb2">
        {`${reservation.customer.firstName} ${reservation.customer.lastName}`}
        's booking
      </h3>
      {reservation && reservation.bookings && (
        <>
          <Card className="mv3">
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
                {`${dayjs(reservation.flight.arrivalDateTime).format("HH:mm")}`}
              </Card.Subtitle>

              <div className="mv2">
                <div className="gray f6">Booking number</div>
                <div className="lh-copy">{reservation.id}</div>
              </div>
              <div className="mv2">
                <div className="gray f6">Booking name</div>
                <div className="lh-copy">{`${reservation.customer.lastName}`}</div>
              </div>
              <div className="mv2">
                <div className="gray f6">Number of tickets</div>
                <div className="lh-copy">{reservation.bookings.length}</div>
              </div>
              <div className="mv2">
                <div className="gray f6">Flight number</div>
                <div className="lh-copy">{reservation.flight.flightName}</div>
              </div>
              <div className="mv2">
                <div className="gray f6">Check in before</div>
                <div className="lh-copy">
                  {dayjs(reservation.flight.departureDateTime)
                    .subtract(1, "hour")
                    .format("HH:mm")}
                </div>
              </div>

              <div className="mv2">
                {reservation.bookings.map((currPassengerBooking, currIndex) => (
                  <PassengerDetails
                    key={currIndex}
                    index={currIndex}
                    passenger={currPassengerBooking.customer}
                  />
                ))}
              </div>
            </Card.Body>
          </Card>

          <div className="flex justify-end mt3">
            <div className="mr1">
              {!isReservationPast(reservation) &&
                !isReservationCancelled(reservation) && (
                  <>
                    <OverlayTrigger
                      overlay={
                        <Tooltip>
                          You may cancel your flight 24 hours within the
                          check-in date.
                        </Tooltip>
                      }
                    >
                      <div>
                        <Button
                          type="button"
                          onClick={() => setIsShowCancelConfirmationModal(true)}
                          disabled={
                            !isReservationWithin24HoursFlightDate(reservation)
                          }
                        >
                          Cancel Reservation
                        </Button>
                      </div>
                    </OverlayTrigger>
                  </>
                )}
            </div>
            <div className="ml1">
              <Link to="/">
                <Button type="button">Back to home</Button>
              </Link>
            </div>
          </div>
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
    <div className="mv2">
      <div className="gray f6">Passenger {index + 1}</div>
      <div className="lh-copy">{`${passenger.firstName} ${passenger.lastName}`}</div>
    </div>
  );
};

export default ShowReservation;
