import React, { useState } from "react";
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

const ShowBooking = ({
  booking,
  isConfirmation = false,
  setIsConfirmedBooking,
}) => {
  const [reservation] = useState(booking.reservation);
  // three situations using this.
  // 1. guest retrieving their reservations/booking.
  // 2. booking confirmation before paying.
  // 3. executive club members reviewing their past/future reservations.

  const cancelBooking = (evt) => {
    evt.preventDefault();

    // call cancel booking endpoint.
  };

  return (
    <>
      <div>Show Booking</div>
      {booking}

      {isConfirmation ? (
        <>
          <div>
            <div>
              {reservation.bookings.map((passenger) => (
                <PassengerDetails passenger={passenger} />
              ))}
            </div>
            <div>Total ticket price: {reservation.totalCost}</div>
          </div>
          <Link to="/">
            <Button type="button">Cancel</Button>
          </Link>
          <Button type="button" onClick={() => setIsConfirmedBooking(true)}>
            Confirm
          </Button>
        </>
      ) : (
        <>
          <Button type="button" onClick={(evt) => cancelBooking(evt)}>
            Cancel Reservation
          </Button>
          <Button type="button">Confirm</Button>
        </>
      )}
    </>
  );
};

const PassengerDetails = ({ passenger }) => {
  return <></>;
};

export default ShowBooking;
