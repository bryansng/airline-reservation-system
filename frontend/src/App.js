import React, { useState } from "react";
import styled from "styled-components";
import useAuthentication from "./components/Authentication/Authentication";
import Navigation from "./components/Navigation/Navigation";
import Profile from "./components/User/Profile";
import Reservation from "./components/Reservation/Reservation";
import RetrieveBooking from "./components/Reservation/RetrieveBooking";
import ShowReservation from "./components/Reservation/ShowReservation";
import Search from "./components/Flight/Search";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const {
    isAuthenticated,
    token,
    user,
    signIn,
    logOut,
    register,
    // authComponent,
  } = useAuthentication();

  const [bookFlightDetails, setBookFlightDetails] = useState({
    flightId: 5,
    numPassengers: 2,
  });

  const testUserId = { id: "1" };

  const Container = styled.div.attrs({
    className: `center w-60-l w-70 mv3`,
  })``;

  return (
    <Router>
      <Container>
        <Navigation />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <Search setBookFlightDetails={setBookFlightDetails} />
            )}
          />
          <Route path="/user/profile" component={Profile} />
          <Route
            path="/book/:flightId"
            exact
            render={(props) => (
              <Reservation
                {...props}
                user={testUserId}
                bookFlightDetails={bookFlightDetails}
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
