import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAlert } from "react-alert";
import "./Login.css";
import Head from "./Head";
import signup from "../../assets/signup.jpg";

const Login = ({ history }) => {
  const alert = useAlert();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const onSubmit = async (data) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post("/api/auth/login", data, config);
      localStorage.setItem("authToken", response.data.token);
      history.push("/");
    } catch (error) {
      alert.show(`${error.response.data.error}`, { type: "error" });
    }
  };

  return (
    <div>
      <Head />
      <div
        className="login-screen"
        style={{ backgroundImage: `url(${signup})` }}
      >
        <Form
          className="login-screen__form"
          onSubmit={handleSubmit(onSubmit)}
          style={{
            maxHeight: "100vH",
            verticalAlign: "middle",
          }}
        >
          <h3 className="login-screen__title">Login</h3>
          <Form.Group controlId="email">
            <Form.Label style={{ fontSize: "1rem" }}>
              Email address{" "}
              <span style={{ color: "#d00000", fontSize: "1rem" }}>*</span>
            </Form.Label>
            <Form.Control
              type="tel"
              name="email"
              placeholder="Enter Email"
              {...register("email", { required: true })}
              className={`${errors.email ? "input-error" : ""}`}
            />
            <p style={{ color: "red" }}>
              {errors.email?.type === "required" && "Email address is required"}
            </p>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label style={{ fontSize: "1rem" }}>
              Password{" "}
              <span style={{ color: "#d00000", fontSize: "1rem" }}>*</span>
            </Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              autoComplete="off"
              {...register("password", { required: true })}
              className={`${errors.password ? "input-error" : ""}`}
            />
            <p style={{ color: "red" }}>
              {errors.password?.type === "required" && "Password is required"}
            </p>
          </Form.Group>
          <p>
            {" "}
            Don't have an account? <Link to="/register">Register</Link>
          </p>
          <div style={{ textAlign: "center" }}>
            <Button
              variant="primary"
              type="submit"
              style={{ marginTop: "1rem" }}
            >
              Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
