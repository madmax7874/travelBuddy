import React from "react"
import Head from "./components/Head"
import Features from "./components/Features"
import Intro from "./components/Intro"

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
            <Intro />
            <Features />
        </div>
        )
    }
}

export default App