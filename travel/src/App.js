import React from "react"
import Head from "./components/Head"

class App extends React.Component{
    constructor(){
        super()
        this.state = {
            isLoggedIn : false
        }
    }

    render(){
        return (
        <div className= {""}>
            <Head />
        </div>
        )
    }
}

export default App