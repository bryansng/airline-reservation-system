import React, { useState } from "react";
import * as dayjs from "dayjs";
import styled from "styled-components";
import { Link } from "react-router-dom";

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

const ConfirmItineraryDetails = ({
  confirmationBooking,
  setIsConfirmedBooking,
}) => {
  const [reservation] = useState(confirmationBooking.reservation);

  return (
    <>
      <h2>Confirm Itinerary Details</h2>
      <div>
        {reservation.bookings.map((currPassenger, currInd) => (
          <div
            key={currInd}
          >{`${currPassenger.firstName} ${currPassenger.lastName}`}</div>
        ))}
        {`${dayjs(reservation.flight.departureDateTime).format(
          "DD/MM/YYYY"
        )}  ${reservation.flight.departureAirport} - ${
          reservation.flight.arrivalAirport
        }`}
        {`${dayjs(reservation.flight.departureDateTime).format(
          "HH:mm"
        )} - ${dayjs(reservation.flight.arrivalDateTime).format("HH:mm")}`}
        <div>Total ticket price: EUR {reservation.totalCost}</div>
      </div>
      <Link to="/">
        <Button type="button">Cancel</Button>
      </Link>
      <Button type="button" onClick={() => setIsConfirmedBooking(true)}>
        Confirm
      </Button>
    </>
  );
};

export default ConfirmItineraryDetails;
