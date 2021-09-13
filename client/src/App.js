import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

// Routing
import PrivateRoute from "./components/routing/PrivateRoute";

// Screens
import Login from "./components/screens/Login";
import Register from "./components/screens/Register";
import DontForgetMe from "./components/screens/DontForgetMe";
import ExpenseTracker from "./components/screens/ExpenseTracker";
import Home from "./components/screens/Home";
import Trips from "./components/screens/Trips";
import MyTrip from "./components/screens/MyTrip";

const App = () => {
  const options = {
    position: "bottom center",
    timeout: 2000,
    offset: "30px",
    transition: transitions.SCALE,
  };
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <Router>
        <Switch>
          <PrivateRoute exact path="/home" component={Home} />
          <PrivateRoute exact path="/list" component={DontForgetMe} />
          <PrivateRoute
            exact
            path="/expensetracker"
            component={ExpenseTracker}
          />
          <PrivateRoute exact path="/trips" component={Trips} />
          <PrivateRoute exact path="/mytrip/:id" component={MyTrip} />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </Router>
    </AlertProvider>
  );
};

export default App;
