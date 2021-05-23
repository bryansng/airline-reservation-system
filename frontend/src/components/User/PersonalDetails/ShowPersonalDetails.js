import React, { useState } from "react";
import styled from "styled-components";
import Card from "react-bootstrap/Card";
import { Redirect } from "react-router";
import { Link, useHistory } from "react-router-dom";
import ErrorMessage from "../../Common/ErrorMessage";
import rest_endpoints from "../../../config/rest_endpoints.json";
const customerEndpoint = rest_endpoints.rest_endpoints.user.customer_profile;

const Button = styled.button.attrs({
  className: `ma0 relative w-100 b--gray mh0 br2 ba hover-bg-light-gray tc`,
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

const ShowPersonalDetails = ({ location, logOut }) => {
  const DELETE_REDIRECT_DELAY = 3000;
  const user = location.state.user;
  const [isDeleted, setIsDeleted] = useState(false);
  const [redirectTimer, setRedirectTimer] = useState(
    DELETE_REDIRECT_DELAY / 1000
  );
  let history = useHistory();

  const handleDelete = (evt) => {
    evt.preventDefault();

    // DELETE request using fetch with error handling
    fetch(`${customerEndpoint}/${user.id}`, { method: "DELETE" })
      .then(async (response) => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
      })
      .then(() => {
        logOut();

        setIsDeleted(true);

        // update delete timer.
        const deleteTimerInterval = setInterval(() => {
          setRedirectTimer((oldVal) => {
            return oldVal - 1;
          });
        }, 1000);

        // redirects after a delay.
        setTimeout(() => {
          clearInterval(deleteTimerInterval);
          history.push("/");
        }, DELETE_REDIRECT_DELAY + 1000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {!user && (
        <Redirect
          push
          to={{
            pathname: `/`,
          }}
        />
      )}
      <Card className="mv3">
        <Card.Header>Personal details</Card.Header>
        <Card.Body>
          <div className="mv2">
            <div className="gray f5">First name</div>
            <div className="lh-copy">{user.firstName}</div>
          </div>
          <div className="mv2">
            <div className="gray f5">Last Name</div>
            <div className="lh-copy">{user.lastName}</div>
          </div>
          <div className="mv2">
            <div className="gray f5">Email address</div>
            <div className="lh-copy">{user.email}</div>
          </div>
          <div className="mv2">
            <div className="gray f5">Mobile Number</div>
            <div className="lh-copy">{user.mobileNumber}</div>
          </div>
          <div className="mv2">
            <div className="gray f5">Address</div>
            <div className="lh-copy">{user.address}</div>
          </div>
        </Card.Body>
      </Card>
      {isDeleted && (
        <ErrorMessage success>
          Your account has been deleted successfully. Redirecting to homepage in{" "}
          {redirectTimer} seconds...
        </ErrorMessage>
      )}
      <div className="flex justify-end">
        <div className="mr1">
          <Link
            to={{
              pathname: "/user/profile/",
              state: {
                user: location.state.user,
              },
            }}
          >
            <Button type="button">Back to profile dashboard</Button>
          </Link>
        </div>
        <div className="mh1">
          <Link
            to={{
              pathname: "/user/profile/personaldetails/password/edit",
              state: {
                user: location.state.user,
              },
            }}
          >
            <Button type="button">Change Password</Button>
          </Link>
        </div>
        <div className="mh1">
          <Link
            to={{
              pathname: "/user/profile/personaldetails/edit",
              state: {
                user: location.state.user,
              },
            }}
          >
            <Button type="button">Edit Account</Button>
          </Link>
        </div>
        <div className="ml1">
          <Button onClick={(evt) => handleDelete(evt)}>Delete Account</Button>
        </div>
      </div>
    </>
  );
};

export default ShowPersonalDetails;
