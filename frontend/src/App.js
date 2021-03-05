import React, { useState } from "react";
import styled from "styled-components";
import useAuthentication from "./components/Authentication/Authentication";
import Navigation from "./components/Navigation/Navigation";
import Profile from "./components/User/Profile";
import BookReservation from "./components/Reservation/BookReservation";
import RetrieveBooking from "./components/Reservation/RetrieveBooking";
import ShowReservation from "./components/Reservation/ShowReservation";
import SearchFlight from "./components/Flight/SearchFlight";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [user, setAppUser] = useState(null);
  // const [user, setAppUser] = useState({
  //   id: 9,
  //   email: "pog@pog.com",
  //   firstName: "pog",
  //   lastName: "pog",
  //   mobileNumber: "42069",
  //   address: "pog address",
  // });
  const [token, setAppToken] = useState(null);
  const [isAuthenticated, setAppIsAuthenticated] = useState(null);

  const { signIn, logOut, register, authComponent } = useAuthentication({
    isAuthenticated,
    token,
    user,
    setAppIsAuthenticated,
    setAppToken,
    setAppUser,
  });

  const Container = styled.div.attrs({
    className: `center w-60-l w-70 mv3`,
  })``;

  return (
    <Router>
      <Container>
        <Navigation
          token={token}
          user={user}
          signIn={signIn}
          register={register}
          logOut={logOut}
          isAuthenticated={isAuthenticated}
        />
        {authComponent}
        <Switch>
          <Route path="/" exact render={(props) => <SearchFlight />} />
          <Route
            path="/user/profile"
            exact
            render={(props) => <Profile {...props} user={user} />}
          />
          <Route
            path="/book/:flightId"
            exact
            render={(props) => (
              <BookReservation
                {...props}
                user={user}
                isAuthenticated={isAuthenticated}
              />
            )}
          />
          <Route
            path="/retrieve/booking"
            exact
            render={(props) => <RetrieveBooking {...props} />}
          />
          <Route
            path="/show/reservation/:reservationId"
            exact
            component={ShowReservation}
          />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
