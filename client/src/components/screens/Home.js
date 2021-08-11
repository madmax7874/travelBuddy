import React from "react";
import Head from "./Head"
// import Intro from "./Intro"
import Features from "./Features"
import Sliders from "./Sliders";

const Home = () => {

  return  (
    <div>
        <Head />
        <Sliders />
        <Features />
        {/* <Sliders /> */}
    </div>
  );
};

export default Home;
