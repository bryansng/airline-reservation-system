import React, { useState } from "react";
import useAuthentication from "./components/Authentication/Authentication";
import Navigation from "./components/Navigation/Navigation";
import Profile from "./components/User/Profile";
import Reservation from "./components/Reservation/Reservation";
import RetrieveBooking from "./components/Reservation/RetrieveBooking";
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

  return (
    <Router>
      <div>
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
          <Route path="/search/booking" exact component={RetrieveBooking} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
