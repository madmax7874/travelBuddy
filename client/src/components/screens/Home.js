import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Head from "./Head";
import Intro from "./Intro";
import Features from "./Features";

const axios = require("axios");

const Home = () => {
  const navigate = useNavigate()
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
      navigate("/login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      checkAuthToken();
    }
  });

  return (
    <Fragment>
      <Head />
      <Intro />
      <Features />
    </Fragment>
  );
};
export default Home;
