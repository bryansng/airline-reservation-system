import React from "react";
import styled from "styled-components";
import Logo from "./Logo.js";
import Account from "./Account.js";
import { Link } from "react-router-dom";

const Container = styled.div.attrs({
  className: `center w-75-l w-80 flex flex-wrap flex-row justify-between items-center mt3 mb3`,
})``;

function Navigation({
  token,
  user,
  signIn,
  register,
  logOut,
  isAuthenticated,
}) {
  return (
    <Container>
      <Logo />
      <Container>
        <Link to="/">
          <div>Search Flights</div>
        </Link>
        <Link
          to={{ pathname: `/book/5`, state: { flightId: 5, numPassengers: 2 } }}
        >
          <div>Book a Reservation</div>
        </Link>
        <Link to={`/retrieve/booking`}>
          <div>Retrieve Booking</div>
        </Link>
        {/* <Link to={`/show/reservation/1`}>
        <div>Show Reservation</div>
        </Link> */}
        <Account
          user={user}
          signIn={signIn}
          register={register}
          logOut={logOut}
          isAuthenticated={isAuthenticated}
        />
      </Container>
    </Container>
  );
}

export default Navigation;
