import useAuthentication from "./components/Authentication/Authentication";
import Navigation from "./components/Navigation/Navigation";
import Profile from "./components/User/Profile";
import Reservation from "./components/Reservation/Reservation";
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

  const testUserId = { id: "1" };

  return (
    <Router>
      <div>
        <Navigation user={testUserId} />
        <Switch>
          <Route path="/" exact component={Search} />
          <Route path="/user/profile/:id" component={Profile} />
          <Route path="/book" exact component={Reservation} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
