import React, { useState } from "react";
import useAuthentication from "./components/Authentication/Authentication";
import Navigation from "./components/Navigation/Navigation";
import Profile from "./components/User/Profile";
import BookReservation from "./components/Reservation/BookReservation";
import RetrieveBooking from "./components/Reservation/RetrieveBooking";
import ShowReservation from "./components/Reservation/ShowReservation";
import SearchFlight from "./components/Flight/SearchFlight";
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

  return (
    <Router>
      <div>
        <Navigation />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <SearchFlight setBookFlightDetails={setBookFlightDetails} />
            )}
          />
          <Route path="/user/profile" component={Profile} />
          <Route
            path="/book/:flightId"
            exact
            render={(props) => <BookReservation {...props} user={testUserId} />}
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
      </div>
    </Router>
  );
}

export default App;
