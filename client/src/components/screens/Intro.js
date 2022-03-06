import React from "react";
import Particles from "react-tsparticles";
import IntroText from "./IntroText";

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
  const particlesInit = (main) => {
    // console.log(main);
  };
  const particlesLoaded = (container) => {
    // console.log(container);
  };

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

        <IntroText/>
      </div>
    );
  }

export default Intro;
