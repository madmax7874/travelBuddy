import React, { useEffect, useState } from "react";
import ReactTextTransition from "react-text-transition";

const texts = ["memorable", "great", "joyful", "pleasant", "delightful"];

const intro = {
  backgroundImage: `url("https://images.unsplash.com/photo-1433838552652-f9a46b332c40?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80")`,
  height: "30rem",
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
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
        <h3 style={{ paddingBottom: "7rem", color: "rgba(0,0,0,0.7)" }}>
          Make your trip{" "}
          <ReactTextTransition
            text={texts[textIndex % texts.length]}
            style={{ margin: "0px 4px" }}
            inline
          />{" "}
          with us!
        </h3>
      </div>
    );
  }

export default Intro;
