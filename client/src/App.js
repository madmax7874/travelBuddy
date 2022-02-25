import { BrowserRouter, Routes, Route } from "react-router-dom";
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
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />

          <Route path="/list" element={<PrivateRoute><DontForgetMe/></PrivateRoute>} />
          <Route path="/expensetracker" element={<PrivateRoute><ExpenseTracker/></PrivateRoute>}/>
          <Route path="/trips" element= {<PrivateRoute><Trips/></PrivateRoute>} />
          <Route path="/mytrip/:id" element={<PrivateRoute><MyTrip/></PrivateRoute>} />

          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </AlertProvider>
  );
};

export default App;
