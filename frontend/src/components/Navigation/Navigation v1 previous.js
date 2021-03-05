import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <Link to="/">
        <div>Home/Search</div>
      </Link>
      <Link to={`/user/profile`}>
        <div>Profile</div>
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
    </div>
  );
};

export default Navigation;
