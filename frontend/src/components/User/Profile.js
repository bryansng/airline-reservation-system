import React from "react";

// https://reactrouter.com/web/api/match
const Profile = ({ match }) => {
  // get user id from match.params.id and GET user data.

  return (
    <div>
      <div>Profile</div>
      {<div>Displaying profile of user with id: {match.params.id}</div>}
    </div>
  );
};

export default Profile;
