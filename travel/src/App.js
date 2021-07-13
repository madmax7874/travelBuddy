import React from "react"
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Head from "./components/Head"
import Features from "./components/Features"
import Intro from "./components/Intro"
import DontForgetMe from "./components/DontForgetMe"

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
            <Router>
                <Switch>
                    <Route path="/list">
                        <Head />
                        <DontForgetMe />
                    </Route>
                    <Route path="/">
                        <Head />
                        <Intro />
                        <Features />
                    </Route>
                </Switch>
            </Router>    
        </div>
        )
    }
}

export default App