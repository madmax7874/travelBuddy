import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios"
import {useHistory} from "react-router-dom";

function SignUp() {
  // const [word, setword] = useState("");
  // const fetchworldData = () => {
  //   fetch("/api")
  //     .then((response) => response.json())
  //     .then((data) => setword((word) => (word = data)));
  // };

  // useEffect(() => {
  //   fetchworldData();
  // }, [word]);
 
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    const firstName = e.target.elements.firstName.value;
    const lastName = e.target.elements.lastName.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    axios
      .post("/signup", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      })
      .then(() => history.push("/"))
      .catch((err) => {
        console.error(err);
      });
  };


  return (
    <div style={{padding: "1rem",backgroundImage : `url("https://images.unsplash.com/photo-1604147706283-d7119b5b822c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDZ8fGJhY2tncm91bmQlMjB0ZXh0dXJlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60")`}}>
    <div className="container">
    <h2>Sign Up</h2>
    <form className="row g-3" onSubmit={handleSubmit}>
      <div className="col-lg-6">
        <label for="validationCustom01" className="form-label">First name</label>
        <input type="text" className="form-control" id="validationCustom01" name="firstName" placeholder="First Name" required />
      </div>
      <div className="col-lg-6">
        <label for="validationCustom02" className="form-label">Last name</label>
        <input type="text" className="form-control" id="validationCustom02" name="lastName" placeholder="Last Name" required />
      </div>
      <div className="col-lg-6">
        <label for="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" placeholder="Email" required />
      </div>
      <div className="col-lg-6">
        <label for="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" className="form-control" name="password" id="exampleInputPassword1" placeholder="Password" required />
      </div>
      <div className="col-12">
      <p> Already have an account? <a href="/login">Login</a></p>
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
