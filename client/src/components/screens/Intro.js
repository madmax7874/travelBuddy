import React, { useEffect, useState } from "react";
import ReactTextTransition from "react-text-transition";

import bg from "../../assets/bg.png";

const texts = ["MEMORABLE", "GREAT", "JOYFUL", "PLEASANT", "DELIGHTFUL"];

const intro = {
  backgroundImage: `url(${bg})`,
  height: "30rem",
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  minHeight: "400px"
};

function Intro() {
  const [textIndex,setTextIndex] = useState(0);


  useEffect(() => {
    const timer = setInterval(() => {
      setTextIndex(textIndex + 1);
    },3000);
      return() => clearInterval(timer);
    });

    return (
      <div style={intro}>
        <h3 style={{ fontSize:"1.7rem", paddingTop: "3rem", color: "rgba(255,255,255,1)" }}>
          MAKE YOUR TRIP{" "}
          <ReactTextTransition
            text={texts[textIndex % texts.length]}
            style={{ margin: "0px 4px" }}
            inline
          />{" "}
          WITH US!
        </h3>
      </div>
    );
  }

export default Intro;
