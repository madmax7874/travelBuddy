import React,{useContext} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios"

import{UserContext} from "../App"

import {useHistory} from "react-router-dom";

function SignUp() {
  const {dispatch} = useContext(UserContext);

  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    const {firstName,lastName,email,password} = e.target.elements
    axios.post("/signup", {firstName: firstName.value,lastName: lastName.value,email: email.value,password: password.value,})
      .then(() => 
      dispatch({type:"USER",payload:true}),
      history.push("/"))
      .catch((err) => {console.error(err);});
  };

  return (
    <div style={{padding: "1rem",backgroundImage : `url("https://images.unsplash.com/photo-1604147706283-d7119b5b822c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDZ8fGJhY2tncm91bmQlMjB0ZXh0dXJlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60")`}}>
      <div className="container">
      <h2>Sign Up</h2>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-lg-6">
          <label htmlFor="validationCustom01" className="form-label">First name</label>
          <input type="text" className="form-control" id="validationCustom01" name="firstName" placeholder="First Name" required />
        </div>
        <div className="col-lg-6">
          <label htmlFor="validationCustom02" className="form-label">Last name</label>
          <input type="text" className="form-control" id="validationCustom02" name="lastName" placeholder="Last Name" required />
        </div>
        <div className="col-lg-6">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" placeholder="Email" required />
        </div>
        <div className="col-lg-6">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" name="password" id="exampleInputPassword1" placeholder="Password" required />
        </div>
        <div className="col-12">
        <p> Already have an account? <Link to="/login">Login</Link></p>
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
  );
}

export default SignUp;
