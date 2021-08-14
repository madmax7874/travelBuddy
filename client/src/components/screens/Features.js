import React, { Component } from "react";
import ReactCardCarousel from "react-card-carousel";

// import React from "react";

// function Features() {
//     return(
//         <div style={{backgroundColor:"#293241",paddingBottom:"3rem"}}>
//             <div className="" style={{textAlign:"center",padding:" 0rem 1.5rem",margin:"0rem 3rem"}}>
//                 <h1 style={{padding:"1rem",color:"#FFFFFF"}}>Features</h1>
//                  <div className="row">
//                     <div className="col-lg-4 my-1" >
//                         <div style={{border:"1px solid rgba(0,0,0,0.5)",borderRadius:"0.8rem",backgroundColor: "#98c1d9"}}>
//                             <div style={{fontSize:"1.8rem",fontWeight:"400",margin:"1.5rem 1.5rem 0rem 1.5rem"}}><span>Dont forget me!</span></div>
//                             <p style={{padding:"1rem",fontSize:"1.1rem"}}>Ok, so it sounds a little boring, but making lists are the
//                             gateway to a a stress-free holiday. So what are you waiting for?
//                             Note down your essentials!</p>
//                         </div>
//                     </div>
//                     <div className="col-lg-4 my-1" >
//                         <div style={{border:"1px solid rgba(0,0,0,0.5)",borderRadius:"0.8rem",backgroundColor: "#98c1d9"}}>
//                             <div style={{fontSize:"1.8rem",fontWeight:"400",margin:"1.5rem 1.5rem 0rem 1.5rem"}}><span>Add your travel details systematically!</span></div>
//                             <p style={{padding:"1rem",fontSize:"1.1rem"}}>Track all your past trips and add/update your present ones. Save
//                         all your travel experiences, share it with others and keep
//                         travelling!</p>
//                         </div>
//                     </div>
//                     <div className="col-lg-4 my-1">
//                         <div style={{border:"1px solid rgba(0,0,0,0.5)",borderRadius:"0.8rem",backgroundColor: "#98c1d9"}}>
//                             <div style={{fontSize:"1.8rem",fontWeight:"400",margin:"1.5rem 1.5rem 0rem 1.5rem"}}><span>Track your expenses!</span></div>
//                             <p style={{padding:"1rem",fontSize:"1.1rem"}}>Going on a business trip? Keep a track of how much you earn!
//                         Going on a trip for leisure? Keep a track of where and how much
//                         you spend! Track your expenses here!</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Features

class Features extends Component {
  static get CONTAINER_STYLE() {
    return {
      position: "relative",
      height: "48vh",
      width: "100%",
      display: "flex",
      flex: 1,
      justifyContent: "center",
      alignItems: "middle",
    };
  }

  static get CARD_STYLE() {
    return {
      height: "250px",
      width: "600px",
      paddingTop: "50px",
      textAlign: "center",
      borderRadius:"0.8rem",
      background: "#98c1d9",
      fontSize: "20px",
    };
  }

  render() {
    return (
      <div style={{ backgroundColor: "#293241", paddingBottom: "3rem" }}>
        <div
          className=""
          style={{
            textAlign: "center",
            padding: " 0rem 1.5rem",
            margin: "0rem 3rem",
          }}
        >
          <h1 style={{ padding: "1rem", color: "#FFFFFF" }}>Features</h1>
          <div style={Features.CONTAINER_STYLE}>
            <ReactCardCarousel autoplay={true} autoplay_speed={2500}>
              <div style={Features.CARD_STYLE}>
                <span style={{ fontSize: "1.8rem" }}>Dont forget me!</span>
                <p style={{ padding: "1rem", fontSize: "1.1rem" }}>
                  Ok, so it sounds a little boring, but making lists are the
                  gateway to a a stress-free holiday. So what are you waiting
                  for? Note down your essentials!
                </p>
              </div>
              <div style={Features.CARD_STYLE}>
                <span style={{ fontSize: "1.8rem" }}>
                  Add your travel details systematically!
                </span>
                <p style={{ padding: "1rem", fontSize: "1.1rem" }}>
                  Track all your past trips and add/update your present ones.
                  Save all your travel experiences, share it with others and
                  keep travelling!
                </p>
              </div>
              <div style={Features.CARD_STYLE}>
                <span style={{ fontSize: "1.8rem" }}>
                  Track your expenses!
                </span>
                <p style={{ padding: "1rem", fontSize: "1.1rem" }}>
                  Going on a trip for leisure? Keep a track of where and how
                  much you spend! Track your expenses here!
                </p>
              </div>
            </ReactCardCarousel>
          </div>
        </div>
      </div>
    );
  }
}

export default Features;