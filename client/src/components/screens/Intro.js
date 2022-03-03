import React, { useEffect, useState } from "react";
import ReactTextTransition from "react-text-transition";
import Particles from "react-tsparticles";

const texts = ["Memorable", "GREAT", "JOYFUL", "PLEASANT", "DELIGHTFUL"];

const intro = {
  background:" rgb(20,24,80)",
  background: "linear-gradient(180deg, rgba(20,24,80,1) 25%, rgba(95,160,84,1) 100%)",
  display: "flex",
  flexDirection:"column",
  justifyContent: "space-evenly",
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
        <h1 style={{color: "rgba(255,255,255,1)" }}>
          TRAVEL BUDDY
        </h1>
        <br/>

        <h3 style={{ padding: "2rem", color: "rgba(255,255,255,1)" }}>
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
