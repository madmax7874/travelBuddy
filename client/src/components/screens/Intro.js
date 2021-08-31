import React, { Component } from "react";
import ReactTextTransition, { presets } from "react-text-transition";

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

const texts = ["memorable", "great", "joyful", "pleasant", "delightful"];

class Intro extends Component {
  state = {
    textIndex: 0,
  };

  componentDidMount() {
    setInterval(() => {
      this.setState({
        textIndex: this.state.textIndex + 1,
      });
    }, 3000);
  }

  render() {
    return (
      <div style={intro}>
        <h3 style={{ paddingBottom: "7rem", color: "rgba(0,0,0,0.7)" }}>
          Make your trip{" "}
          <ReactTextTransition
            text={texts[this.state.textIndex % texts.length]}
            springConfig={presets.gentle}
            style={{ margin: "0px 4px" }}
            inline
          />{" "}
          with us!
        </h3>
      </div>
    );
  }
}

export default Intro;
