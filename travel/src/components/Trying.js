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
        const firstName = e.target.elements.firstName.value;
        const lastName = e.target.elements.lastName.value;
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        axios
          .post('/postreq', 
          {
            FirstName : firstName,
            LastName : lastName,
            Email : email,
            Password : password
        })
          .then(() => console.log('done'))
          .catch(err => {
            console.error(err);
          });
      };

    return (
        <div>

            <h1>{word}</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="firstName" placeholder="First Name" />
                <input type="text" name="lastName" placeholder="Last Name" />
                <input type="text" name="email" placeholder="Email address" />
                <input type="password" name="password" placeholder="Password" />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Trying