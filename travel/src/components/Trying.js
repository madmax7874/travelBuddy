import { response } from "express"
import React, {useState} from "react"

// class Trying extends React.Component{
//     constructor() {
//         super()
//         this.state = {
//             charac : ""
//         }
//     }

//     componentDidMount(){
//         fetch("/api")
//             .then(response => response.json())
//             .then(data => {
//                 this.setState(
//                     {charac : data}
//                 )
//             })
//     }

//     render(){
//         return(
//             <div>
//                 {this.state.charac}
//             </div>
//         )
//     }
// }


function Trying(){
    const [word, setword] = useState(0)
    const fetchworldData = () => {
        fetch("/api")
            .then(response => response.json())
            .then(data => setword(word => word = data))
    }

    return (
        <div>

        </div>
    )
}

export default Trying