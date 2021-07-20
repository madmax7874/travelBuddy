import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
const axios = require("axios");

function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    axios
      .post("/login", {
        email: email,
        password: password,
      })
      .then(() => console.log("done"))
      .catch((err) => {
        console.error(err);
      });
  };

  return (
      <div style={{padding: "1rem",backgroundImage : `url("https://images.unsplash.com/photo-1604147706283-d7119b5b822c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDZ8fGJhY2tncm91bmQlMjB0ZXh0dXJlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60")`}}>
        <div className="container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" required />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" name="password" id="exampleInputPassword1" required />
          </div>
            <p> Don't have an account? <a href="/signup">Signup</a></p>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
        </div>
      </div>
    
  );
}

export default Login
