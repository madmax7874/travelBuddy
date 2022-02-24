import React from "react";
import { Navbar, Nav, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/logo.png";

const navbar = {
  backgroundColor: "rgba(60, 53, 119,1)",
  padding: "0.5rem 1rem",
  fontSize: "1.2rem",
};

function Head() {
  function logoutHandler() {
    try {
      localStorage.removeItem("authToken");
    } catch (err) {
      console.log(err);
    }
  }

  return localStorage.getItem("authToken") ? (
    <div>
      <Navbar style={navbar} expand="lg" variant="dark">
        <Navbar.Brand>
          <NavLink to="/home">
            <Image
              src={logo}
              style={{ maxHeight: "5rem", maxWidth: "5rem" }}
            ></Image>
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
          >
            <NavLink
              style={({isActive}) => ({
                color: isActive ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.7)",
                fontFamily: isActive ? "sans-serif" :"",
                fontWeight: isActive ?"700" : ""
              })}
              className="nav-link"
              aria-current="page"
              to="/list"
            >
              List
            </NavLink>
            <NavLink
              style={({isActive}) => ({
                color: isActive ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.7)",
                fontFamily: isActive ? "sans-serif" :"",
                fontWeight: isActive ?"700" : ""
              })}
              className="nav-link"
              aria-current="page"
              to="/trips"
            >
              MyTrips
            </NavLink>
            <NavLink
              style={({isActive}) => ({
                color: isActive ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.7)",
                fontFamily: isActive ? "sans-serif" :"",
                fontWeight: isActive ?"700" : ""
              })}
              className="nav-link"
              aria-current="page"
              to="/expenseTracker"
            >
              ExpenseTracker
            </NavLink>
          </Nav>
          <br/>
          <Nav
            className="my-2 my-lg-0 pt-2"
            style={{ maxHeight: "100px", marginLeft: "auto" }}
          >
            <NavLink
              onClick={() => logoutHandler()}
              style={({isActive}) => ({
                color: isActive ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.7)",
                fontFamily: isActive ? "sans-serif" :"",
                fontWeight: isActive ?"700" : ""
              })}
              className="nav-link"
              aria-current="page"
              to="/login"
            >
              Logout
            </NavLink>
          </Nav>
          </Navbar.Collapse>
      </Navbar>
    </div>
  ) : (
    <div>
      <Navbar style={navbar} expand="lg" variant="dark">
        <Navbar.Brand>
          <NavLink to="/">
            <Image
              src={logo}
              style={{ maxHeight: "5rem", maxWidth: "5rem" }}
            ></Image>
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse >
          <Nav
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
          ></Nav>
          <Nav
            className="my-2 my-lg-0 pt-2"
            style={{ maxHeight: "100px", marginLeft: "auto" }}
          >
            <NavLink
              style={({isActive}) => ({
                color: isActive ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.7)",
                fontFamily: isActive ? "sans-serif" :"",
                fontWeight: isActive ?"700" : ""
              })}
              className="nav-link"
              aria-current="page"
              to="/login"
            >
              Login
            </NavLink>
            <NavLink
              style={({isActive}) => ({
                color: isActive ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.7)",
                fontFamily: isActive ? "sans-serif" :"",
                fontWeight: isActive ?"700" : ""
              })}
              className="nav-link"
              aria-current="page"
              to="/register"
            >
              SignUp
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Head;
