import { useState, useEffect } from "react";
import axios from "axios";
import Head from "./Head"
import Features from "./Features"

const Home = () => {
//   const [error, setError] = useState("");

  useEffect(() => {

  }, []);
  return  (
    <div>
        <Head />
        <Features />
    </div>
  );
};

export default Home;
