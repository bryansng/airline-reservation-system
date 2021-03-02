import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ user }) => {
  return (
    <div>
      <Link to="/">
        <div>Home/Search</div>
      </Link>
      <Link to={`/user/profile/${user.id}`}>
        <div>Profile</div>
      </Link>
      <Link to="/book">
        <div>Book a Reservation</div>
      </Link>
    </div>
  );
};

export default Navigation;
