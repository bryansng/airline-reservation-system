import useAuthentication from "./components/Authentication/Authentication";
import Navigation from "./components/Navigation/Navigation";
import Profile from "./components/User/Profile";
import Reservation from "./components/Reservation/Reservation";
import Search from "./components/Flight/Search";
import PersonalDetails from "./components/User/PersonalDetails/PersonalDetails";
import EditPersonalDetails from "./components/User/PersonalDetails/EditPersonalDetails";
import CreditCards from "./components/User/CreditCard/CreditCards";
import CreditCardDetails from "./components/User/CreditCard/CreditCardDetails";
import EditCreditCardDetails from "./components/User/CreditCard/EditCreditCardDetails";
import ReservationDetails from "./components/User/Reservations/ReservationDetails";
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

  const testUserId = { 
    id: "1"
  };
 
  return (
    <Router>
      <div>
        <Navigation user={testUserId} />
        <Switch>
          <Route path="/" exact component={Search} />
          <Route path="/user/profile/:id" exact component={Profile} />
          <Route path="/book" exact component={Reservation} />
          <Route path="/user/profile/:id/personaldetails" exact component={PersonalDetails}/>
          <Route path="/user/profile/:id/personaldetails/edit" exact component={EditPersonalDetails}/>
          <Route path="/user/profile/:id/creditcards" exact component={CreditCards}/>
          <Route path="/user/profile/:id/creditcards/add" exact component={EditCreditCardDetails}/>
          <Route path="/user/profile/:id/creditcards/:creditcardid" exact component={CreditCardDetails}/>
          <Route path="/user/profile/:id/creditcards/:creditcardid/creditcardsdetails/edit" exact component={EditCreditCardDetails}/>
          <Route path="/user/profile/:id/reservations" exact component={ReservationDetails}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
