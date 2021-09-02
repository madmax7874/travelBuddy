import React, { useEffect } from "react";
import Head from "./Head";
import Intro from "./Intro";
import Features from "./Features";

const axios = require("axios");

const Home = (props) => {

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      console.log("vidholi")
      const checkAuthToken = async () => {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        };
        try {
          await axios.get("/api/private", config);
        } catch (error) {
          localStorage.removeItem("authToken");
          props.history.push("/login");
        }
      };
      checkAuthToken();
    }
  }, [props.history]);

  return (
    <div>
      <Head />
      <Intro />
      <Features />
    </div>
  );
};

export default Home;
