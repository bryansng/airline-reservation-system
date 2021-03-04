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
      <Link to={`/book/5`}>
        <div>Book a Reservation</div>
      </Link>
    </div>
  );
};

export default Navigation;
