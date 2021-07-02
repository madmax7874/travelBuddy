import React from "react"
import Head from "./components/Head"
import ListIntro from "./components/ListIntro"
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
            <ListIntro />
        </div>
        )
    }
}

export default App