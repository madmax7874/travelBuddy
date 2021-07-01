import React from "react"
import { Navbar,Nav } from 'react-bootstrap';

class Head extends React.Component{
    constructor(){
        super()
        this.state = [
            
        ]
    }

    render(){
        return (
            <div>
                <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                    className="mr-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                    >
                    <Nav.Link href="/signup">Home</Nav.Link>
                    <Nav.Link href="/login">Link</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Head