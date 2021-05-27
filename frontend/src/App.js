import React, { useState } from "react";
import styled from "styled-components";
import useAuthentication from "./components/Authentication/Authentication";
import Navigation from "./components/Navigation/Navigation";
import Profile from "./components/User/Profile";
import BookReservation from "./components/Reservation/BookReservation";
import RetrieveBooking from "./components/Reservation/RetrieveBooking";
import ShowReservation from "./components/Reservation/ShowReservation";
import SearchFlight from "./components/Flight/SearchFlight";
import FlightForm from "./components/Flight/FlightForm";
import EditFlightForm from "./components/Flight/EditFlightForm";
import ShowAllFlights from "./components/Flight/ShowAllFlights";
import ShowPersonalDetails from "./components/User/PersonalDetails/ShowPersonalDetails";
import EditPersonalDetails from "./components/User/PersonalDetails/EditPersonalDetails";
import ShowCreditCards from "./components/User/CreditCard/ShowCreditCards";
import CreditCardDetails from "./components/User/CreditCard/ShowCreditCardDetails";
import EditCreditCardDetails from "./components/User/CreditCard/EditCreditCardDetails";
import ShowReservations from "./components/User/Reservations/ShowReservations";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Container = styled.div.attrs({
  className: `center w-60-l w-70 mv3`,
})``;

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
        {/* {authComponent} */}
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
          <Route path="/user/profile" exact component={Profile} />
          <Route
            path="/user/profile/personaldetails"
            exact
            render={(props) => (
              <ShowPersonalDetails {...props} logOut={logOut} />
            )}
          />
          <Route
            path="/user/profile/personaldetails/edit"
            exact
            render={(props) => (
              <EditPersonalDetails {...props} setUser={setAppUser} />
            )}
          />
          <Route
            path="/user/profile/creditcards"
            exact
            component={ShowCreditCards}
          />
          <Route
            path="/user/profile/creditcards/add"
            exact
            component={EditCreditCardDetails}
          />
          <Route
            path="/user/profile/creditcards/:creditcardid"
            exact
            component={CreditCardDetails}
          />
          <Route
            path="/user/profile/creditcards/:creditcardid/creditcardsdetails/edit"
            exact
            component={EditCreditCardDetails}
          />
          <Route
            path="/user/profile/reservations"
            exact
            component={ShowReservations}
          />
          <Route path="/flight" exact component={ShowAllFlights} />
          <Route path="/flight/create" exact component={FlightForm} />
          <Route
            path="/flight/edit/:flightId"
            exact
            component={EditFlightForm}
          />
          {/* <Route
            path="/admin/reservations"
            exact
            component={ShowReservations}
          /> */}
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
