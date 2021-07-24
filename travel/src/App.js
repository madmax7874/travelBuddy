import React,{createContext,useReducer} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Head from "./components/Head";
import Features from "./components/Features";
import Intro from "./components/Intro";
import DontForgetMe from "./components/DontForgetMe";
import ExpenseTracker from "./components/ExpenseTracker";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Logout from "./components/Logout";

import { initialState,reducer } from "./reducer/UseReducer";

export const UserContext = createContext();

function App() {
    const [state,dispatch] = useReducer(reducer,initialState)

  return (
    <div className={""}> 
    <UserContext.Provider value = {{state,dispatch}}>
      <Router>
        <Switch>
          <Route path="/list">
            <Head />
            <DontForgetMe />
          </Route>
          {/* <Route path="/features">
                        <Head />
                        <DontForgetMe />
                        <ExpenseTracker />
                    </Route> */}
          <Route path="/expenseTracker">
            <Head />
            <ExpenseTracker />
          </Route>
          <Route path="/signup">
            <Head />
            <SignUp />
          </Route>
          <Route path="/login">
            <Head />
            <Login />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/">
            <Head />
            <Intro />
            <Features />
          </Route>
        </Switch>
      </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
