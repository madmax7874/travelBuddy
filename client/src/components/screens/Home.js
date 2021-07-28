import React,{useEffect } from "react";
// import axios from "axios";
import Head from "./Head"
import Intro from "./Intro"
import Features from "./Features"

const Home = () => {

  useEffect(() => {

  }, []);
  return  (
    <div>
        <Head />
        <Intro />
        <Features />
    </div>
  );
};

export default Home;
