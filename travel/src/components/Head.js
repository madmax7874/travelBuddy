import React, { useContext } from "react";
import { Navbar, Nav, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/logo.PNG";

import { UserContext } from "../App";

const navbar = {
  backgroundColor: "rgba(60, 53, 119,1)",
  padding: "0.5rem 3rem",
  fontSize: "1.2rem",
};
const navLink = { color: "white" };

function Head() {
  const { state } = useContext(UserContext);
  // const loggedIn = useContext(AuthContext);
  // console.log(loggedIn);
  const RenderMenu = () => {
    if (state) {
      return (
        <Navbar style={navbar} expand="lg" variant="dark">
          <Navbar.Brand>
            <Link to="/">
              <Image
                src={logo}
                style={{ maxHeight: "5rem", maxWidth: "5rem" }}
              ></Image>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mr-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {/* <Link style={navLink} className="nav-link" aria-current="page" to="/">Home</Link> */}
              <Link
                style={navLink}
                className="nav-link"
                aria-current="page"
                to="/list"
              >
                List
              </Link>
              <Link
                style={navLink}
                className="nav-link"
                aria-current="page"
                to="/expenseTracker"
              >
                ExpenseTracker
              </Link>
            </Nav>
            <Nav
              className="ml-auto my-2 my-lg-0 pt-2"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {/* <Link style={navLink} className="nav-link" to="/login">Login</Link>
                    <Link style={navLink} className="nav-link" to="/signup">SignUp</Link> */}
              <Link style={navLink} className="nav-link" to="/logout">
                Logout
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    } else {
      return (
        <Navbar style={navbar} expand="lg" variant="dark">
          <Navbar.Brand>
            <Link to="/">
              <Image
                src={logo}
                style={{ maxHeight: "5rem", maxWidth: "5rem" }}
              ></Image>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            {/* <Nav
                    className="mr-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll>
                    <Link style={navLink} className="nav-link" aria-current="page" to="/">Home</Link>
                    <Link style={navLink} className="nav-link" aria-current="page" to="/list">List</Link>
                    <Link style={navLink} className="nav-link" aria-current="page" to="/expenseTracker">ExpenseTracker</Link>
                    </Nav> */}
            <Nav
              className="ml-auto my-2 my-lg-0 pt-2"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link style={navLink} className="nav-link" to="/login">
                Login
              </Link>
              <Link style={navLink} className="nav-link" to="/signup">
                SignUp
              </Link>
              {/* <Link style={navLink} className="nav-link" to="/logout">Logout</Link> */}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }
  };
  return (
    <div>
      <RenderMenu />
    </div>
  );
}

export default Head;
