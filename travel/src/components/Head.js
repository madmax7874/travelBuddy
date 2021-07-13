import React from "react"
import { Navbar,Nav,Image } from 'react-bootstrap'
import { Link } from "react-router-dom";
import logo from "../assets/logo.PNG"

const navbar = {backgroundColor: 'rgba(60, 53, 119,1)',padding:"0.5rem 3rem",fontSize:"1.2rem"}
const navLink = {color:"white"}
class Head extends React.Component{
    // constructor(){
    //     super()
    //     this.state = {

    //     }
    // }

    render(){
        return (
            <div>
                <Navbar style={navbar} expand="lg" variant="dark">
                <Navbar.Brand href="/"><Image src={logo} style={{maxHeight:"5rem",maxWidth:"5rem"}}></Image></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                    className="mr-auto my-2 my-lg-0"  
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                    >
                    {/* <Nav.Link style={navLink} href="/home">Home</Nav.Link>
                    <Nav.Link style={navLink} href="/features">Features</Nav.Link> */}
                    {/* <Nav.Link style={navLink} href="/list">List</Nav.Link> */}
                    <Link style={navLink} className="nav-link" aria-current="page" to="/">Home</Link>
                    <Link style={navLink} className="nav-link" aria-current="page" to="/features">Features</Link>
                    <Link style={navLink} className="nav-link" aria-current="page" to="/list">List</Link>
                    </Nav>
                    <Nav
                    className="ml-auto my-2 my-lg-0" 
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                    >
                    <Nav.Link style={navLink} href="/login">Login</Nav.Link>
                    <Nav.Link style={navLink} href="/signup">SignUp</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Head