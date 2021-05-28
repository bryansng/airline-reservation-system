import React from "react";
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
// import ReservationForm from "./components/Reservation/ReservationForm";
// import EditReservationForm from "./components/Reservation/EditReservationForm";
import ShowAllReservations from "./components/Reservation/ShowAllReservations";
import ShowPersonalDetails from "./components/User/PersonalDetails/ShowPersonalDetails";
import EditPersonalDetails from "./components/User/PersonalDetails/EditPersonalDetails";
import EditPassword from "./components/User/PersonalDetails/EditPassword";
import ShowCreditCards from "./components/User/CreditCard/ShowCreditCards";
import CreditCardDetails from "./components/User/CreditCard/ShowCreditCardDetails";
import EditCreditCardDetails from "./components/User/CreditCard/EditCreditCardDetails";
import ShowReservations from "./components/User/Reservations/ShowReservations";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Container = styled.div.attrs({
  className: `center w-60-l w-70 mv3`,
})``;

function App() {
  // const [user, setAppUser] = useState(null);
  // const [user, setAppUser] = useState({
  //   id: 9,
  //   email: "pog@pog.com",
  //   firstName: "pog",
  //   lastName: "pog",
  //   mobileNumber: "42069",
  //   address: "pog address",
  // });
  // const [token, setAppToken] = useState(null);
  // const [isAuthenticated, setAppIsAuthenticated] = useState(null);

  const {
    isAuthenticated,
    token,
    user,
    setUser,
    signIn,
    logOut,
    register,
    // authComponent,
  } = useAuthentication();

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
                token={token}
                user={user}
                isAuthenticated={isAuthenticated}
              />
            )}
          />
          <Route
            path="/reservation/edit/:reservationId/passenger"
            exact
            render={(props) => (
              <BookReservation
                {...props}
                token={token}
                user={user}
                isAuthenticated={isAuthenticated}
              />
            )}
          />
          <Route
            path="/reservation/edit/:reservationId"
            exact
            render={(props) => <SearchFlight {...props} />}
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
              <ShowPersonalDetails {...props} token={token} logOut={logOut} />
            )}
          />
          <Route
            path="/user/profile/personaldetails/edit"
            exact
            render={(props) => (
              <EditPersonalDetails {...props} token={token} setUser={setUser} />
            )}
          />
          <Route
            path="/user/profile/personaldetails/password/edit"
            exact
            render={(props) => (
              <EditPassword {...props} token={token} setUser={setUser} />
            )}
          />
          <Route
            path="/user/profile/creditcards"
            exact
            // component={ShowCreditCards}
            render={(props) => <ShowCreditCards {...props} token={token} />}
          />
          <Route
            path="/user/profile/creditcards/add"
            exact
            // component={EditCreditCardDetails}
            render={(props) => (
              <EditCreditCardDetails {...props} token={token} />
            )}
          />
          <Route
            path="/user/profile/creditcards/:creditcardid"
            exact
            // component={CreditCardDetails}
            render={(props) => <CreditCardDetails {...props} token={token} />}
          />
          <Route
            path="/user/profile/creditcards/:creditcardid/creditcardsdetails/edit"
            exact
            // component={EditCreditCardDetails}
            render={(props) => (
              <EditCreditCardDetails {...props} token={token} />
            )}
          />
          <Route
            path="/user/profile/reservations"
            exact
            render={(props) => <ShowReservations {...props} token={token} />}
          />
          <Route
            path="/flight"
            exact
            render={(props) => <ShowAllFlights {...props} token={token} />}
          />
          <Route
            path="/flight/create"
            render={(props) => <FlightForm {...props} token={token} />}
          />
          <Route
            path="/flight/edit/:flightId"
            exact
            render={(props) => <EditFlightForm {...props} token={token} />}
          />
          <Route
            path="/reservation"
            exact
            render={(props) => <ShowAllReservations {...props} token={token} />}
          />
          <Route
            path="/reservation/create"
            exact
            render={(props) => <SearchFlight {...props} token={token} />}
          />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
