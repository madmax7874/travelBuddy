import React from "react"
import { Button } from 'react-bootstrap';

class Navbar extends React.Component{
    constructor(){
        super()
        this.state = [
            
        ]
    }

    render(){
        return (
            <div>
                <Button variant="primary" onClick={()=>console.log('hi')}>Primary</Button>
            </div>
        )
    }
}

export default Navbar