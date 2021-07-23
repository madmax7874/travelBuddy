import React,{useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import {useHistory} from "react-router-dom";

function Login() {
  // const {loggedIn} = useContext(AuthContext);
  // const handleSubmit = (e) => {
  //   console.log(loggedIn);
  //   e.preventDefault();
  //   const email = e.target.elements.email.value;
  //   const password = e.target.elements.password.value;
  //   axios
  //     .post("/login", {
  //       email: email,
  //       password: password,
  //     })
  //     .then(() => console.log("done"))
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };
  const history = useHistory();
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const myData = await axios.post("/login", {email: email,password: password})
      console.log(myData.data)

      if(myData.data){
        history.push('/');
      }
    };

    
 
  return (
      <div style={{padding: "1rem",backgroundImage : `url("https://images.unsplash.com/photo-1604147706283-d7119b5b822c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDZ8fGJhY2tncm91bmQlMjB0ZXh0dXJlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60")`}}>
        <div className="container">
        <h2>Login</h2>
        <form method="POST" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" name="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-describedby="emailHelp" required />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name="password" value={password} onChange={(e) => setPassword(e.target.value)} id="exampleInputPassword1" required />
          </div>
            <p> Don't have an account? <a href="/signup">Signup</a></p>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
        </div>
      </div>
    
  );
}

export default Login
