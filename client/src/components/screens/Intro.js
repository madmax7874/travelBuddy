import React, { useEffect, useState } from "react";
import ReactTextTransition from "react-text-transition";
import Particles from "react-tsparticles";

import bg from "../../assets/cb.png";

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
  minHeight: "500px"
};

function Intro() {
  const [textIndex,setTextIndex] = useState(0);
  const particlesInit = (main) => {
    console.log(main);
  };
  const particlesLoaded = (container) => {
    console.log(container);
  };

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTextIndex(textIndex + 1);
  //   },3000);
  //   return() => clearInterval(timer);
  // });

    return (
      <div style={intro}>
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          style={{position:"absolute",top:80,left:0}}
          // width={"auto"}
          height={500}
          options={{
            fullScreen: {
              enable: false,
              zIndex: 0
            },
            
            // background: {
            //   color: {
            //     value: "#0d47a1",
            //   },
            // },
            fpsLimit: 600,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "pause",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                bubble: {
                  distance: 400,
                  duration: 2,
                  opacity: 0.8,
                  size: 40,
                },
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#fff",
              },
              links: {
                color: "#fff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              collisions: {
                enable: true,
              },
              move: {
                direction: "none",
                enable: true,
                outMode: "bounce",
                random: false,
                speed: 3,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 600,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                random: true,
                value: 5,
              },
            },
            detectRetina: true,
          }}
        />

        <h3 style={{ fontSize:"1.7rem", paddingTop: "3rem", color: "rgba(0,0,0,1)" }}>
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
