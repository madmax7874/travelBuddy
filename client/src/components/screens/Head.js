import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container, Image } from "react-bootstrap";

import logo from "../../assets/newlogo.svg";

const navbar = {
  padding: "0.4rem 1rem",
  fontSize: "1.2rem",
  borderBottom: "1px solid rgba(0,0,0,0.2)"
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
    <Fragment>
      <Navbar style={navbar} expand="lg" variant="light">
        <Container>
          <Navbar.Brand>
            <NavLink to="/">
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
                  color: isActive ? "#5FA054" : "#141850",
                  fontWeight: isActive ?"600" : "500",
                  borderBottom:  isActive ? "2px solid #5FA054" : ""
                })}
                className="nav-link"
                aria-current="page"
                to="/list"
              >
                List
              </NavLink>
              <NavLink
                style={({isActive}) => ({
                  color: isActive ? "#5FA054" : "#141850",
                  fontWeight: isActive ?"600" : "500",
                  borderBottom:  isActive ? "2px solid #5FA054" : ""
                })}
                className="nav-link"
                aria-current="page"
                to="/trips"
              >
                Trips
              </NavLink>
              <NavLink
                style={({isActive}) => ({
                  color: isActive ? "#5FA054" : "#141850",
                  fontWeight: isActive ?"600" : "500",
                  borderBottom:  isActive ? "2px solid #5FA054" : ""
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
              className="my-2 my-lg-0"
              style={{ maxHeight: "100px", marginLeft: "auto" }}
            >
              <NavLink
                onClick={() => logoutHandler()}
                style={({isActive}) => ({
                  color: isActive ? "#5FA054" : "#141850",
                  fontWeight: isActive ?"700" : "500"
                })}
                className="nav-link"
                aria-current="page"
                to="/login"
              >
                Logout
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  ) : (
    <Fragment>
      <Navbar style={navbar} expand="lg" variant="light">
        <Container>
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
                  color: isActive ? "#5FA054" : "#141850",
                  fontWeight: isActive ?"600" : "500",
                  borderBottom:  isActive ? "2px solid #5FA054" : ""
                })}
                className="nav-link"
                aria-current="page"
                to="/login"
              >
                Login
              </NavLink>
              <NavLink
                style={({isActive}) => ({
                  color: isActive ? "#5FA054" : "#141850",
                  fontWeight: isActive ?"600" : "500",
                  borderBottom:  isActive ? "2px solid #5FA054" : ""
                })}
                className="nav-link"
                aria-current="page"
                to="/register"
              >
                SignUp
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
}

export default Head;
