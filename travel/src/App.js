import React from "react"
import Navbar from "./components/Navbar"

class App extends React.Component{
    constructor(){
        super()
        this.state = [

        ]
    }

    render(){
        return (
        <div className= {"container"}>
            <Navbar />
            <h1>hi</h1>
        </div>
        )
    }
}

export default App