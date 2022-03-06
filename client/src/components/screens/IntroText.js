import React, { useEffect, useState } from "react";
import ReactTextTransition from "react-text-transition";

const texts = ["Memorable", "Great", "Joyful", "Pleasant", "Delightful"];

function IntroText() {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTextIndex(textIndex + 1);
    }, 3000);
    return () => clearInterval(timer);
  });

  return (
    <h3 style={{ padding: "2rem", color: "rgba(255,255,255,1)" }}>
      Make your trip{" "}
      <ReactTextTransition
        text={texts[textIndex % texts.length]}
        style={{ margin: "0px 4px" }}
        inline
      />{" "}
      with us!
    </h3>
  );
}

export default IntroText;
