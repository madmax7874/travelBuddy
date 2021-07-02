import React from "react"
import { Navbar,Nav } from 'react-bootstrap'
const navbar = {backgroundColor: '#3C3577'}

class Head extends React.Component{
    constructor(){
        super()
        this.state = [
            
        ]
    }

    render(){
        return (
            <div class="container">
                <Navbar style={navbar} variant="dark" expand="lg">
                <Navbar.Brand href="#">Logo</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                    className="mr-auto my-2 my-lg-0"  
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                    >
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/features">Features</Nav.Link>
                    </Nav>
                    <Nav
                    className="ml-auto my-2 my-lg-0" 
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                    >
                    <Nav.Link href="/signup">Login</Nav.Link>
                    <Nav.Link href="/login">Sign Up</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Head
