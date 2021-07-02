import React from "react"
import { Navbar,Nav,Image } from 'react-bootstrap'
import logo from "../assets/travelbuddy.jpg"

const navbar = {backgroundColor: 'rgba(60, 53, 119,1)',padding:"0.5rem 3rem",fontSize:"1.2rem"}
const navLink = {color:"white"}
class Head extends React.Component{
    constructor(){
        super()
        this.state = [
            
        ]
    }

    render(){
        return (
            <div class="">
                <Navbar style={navbar} expand="lg" variant="dark">
                <Navbar.Brand href="/"><Image src={logo} style={{maxHeight:"5rem",maxWidth:"5rem"}}></Image></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                    className="mr-auto my-2 my-lg-0"  
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                    >
                    <Nav.Link style={navLink} href="/home">Home</Nav.Link>
                    <Nav.Link style={navLink} href="/features">Features</Nav.Link>
                    </Nav>
                    <Nav
                    className="ml-auto my-2 my-lg-0" 
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                    >
                    <Nav.Link style={navLink} href="/signup">Login</Nav.Link>
                    <Nav.Link style={navLink} href="/login">SignUp</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Head