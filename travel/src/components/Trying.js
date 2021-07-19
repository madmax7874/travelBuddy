import React, {useEffect, useState} from "react"
const axios = require('axios');

function Trying(){
    const [word, setword] = useState("")
    const fetchworldData = () => {
        fetch("/api")
            .then(response => response.json())
            .then(data => setword(word => word = data))
    }

    useEffect(()=>{
        fetchworldData()
    },[word])

    const handleSubmit = e => {
        e.preventDefault();
        const myvalue = e.target.elements.madmax.value;
        axios
          .post('/postreq', {myname : myvalue})
          .then(() => console.log('done'))
          .catch(err => {
            console.error(err);
          });
      };

    return (
        <div>

            <h1>{word}</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="madmax"/>
                <button type="submit">sub</button>
            </form>
        </div>
    )
}

export default Trying