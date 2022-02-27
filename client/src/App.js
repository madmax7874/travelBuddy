import { BrowserRouter, Routes, Route } from "react-router-dom";
import { transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

// Routing
import PrivateRoute from "./components/routing/PrivateRoute";

// Screens
import Login from "./components/screens/Login";
import Register from "./components/screens/Register";
import DontForgetMe from "./components/pages/DontForgetMePage";
import ExpenseTracker from "./components/pages/ExpenseTrackerPage";
import Home from "./components/pages/HomePage";
import AllTrips from "./components/pages/AllTripsPage";
import Trip from "./components/pages/TripPage";
import NotFound from "./components/screens/NotFound";

// css files
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/screens/styles.scss"
import "./components/screens/buttonslider.scss"

const App = () => {
  const options = {
    position: "bottom center",
    timeout: 2000,
    offset: "30px",
    transition: transitions.FADE,
  };
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />

          <Route path="/list" element={<PrivateRoute><DontForgetMe/></PrivateRoute>} />
          <Route path="/expensetracker" element={<PrivateRoute><ExpenseTracker/></PrivateRoute>}/>
          <Route path="/trips" element= {<PrivateRoute><AllTrips/></PrivateRoute>} />
          <Route path="/mytrip/:id" element={<PrivateRoute><Trip/></PrivateRoute>} />

          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </AlertProvider>
  );
};

export default App;
