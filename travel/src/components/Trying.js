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

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/postreq' , {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(e.madmax.value)
            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="madmax"/>
            </form>
        </div>
    )
}

export default Trying