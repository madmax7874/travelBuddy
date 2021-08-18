import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Routing
import PrivateRoute from "./components/routing/PrivateRoute";

// Screens
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/screens/ResetPasswordScreen";
import DontForgetMe from "./components/screens/DontForgetMe";
import ExpenseTracker from "./components/screens/ExpenseTracker";
import TravelDetails from "./components/screens/TravelDetails";
import Home from "./components/screens/Home";
import Trips from "./components/screens/Trips"
import MyTrip from "./components/screens/MyTrip"

const App = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <PrivateRoute exact path="/home" component={Home} />
          <PrivateRoute exact path="/list" component={DontForgetMe} />
          <PrivateRoute exact path="/expensetracker" component={ExpenseTracker} />
          <PrivateRoute exact path="/addtrip" component={TravelDetails} />
          <PrivateRoute exact path="/trips" component={Trips} />
          <PrivateRoute exact path="/mytrip/:id" component={MyTrip} />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />

          <Route
            exact
            path="/forgotpassword"
            component={ForgotPasswordScreen}
          />
          <Route
            exact
            path="/passwordreset/:resetToken"
            component={ResetPasswordScreen}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
