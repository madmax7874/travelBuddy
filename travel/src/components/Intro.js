import React from "react"
const intro = {
    backgroundImage: `url("https://images.unsplash.com/photo-1433838552652-f9a46b332c40?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80")`,
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat",
    height:"800px",
    backgroundSize: "cover",
    // position: "absolute",
    display: "flex",
    // flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // height: "100%",
    textAlign: "center",
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    
}



class Intro extends React.Component{
    constructor(){
        super()
        this.state = [
            
        ]
    }

    render(){
        return(
            <div style={intro}>
                <div class="row">
                    <div>
                        <h1 style={{paddingBottom : "25rem"}}>Travel with us</h1>
                    </div>
                </div>
            </div>
        )
    }
}

export default Intro