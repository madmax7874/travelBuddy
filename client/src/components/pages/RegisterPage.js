import React from "react";

import Head from "../screens/Head";
import Footer from "../screens/Footer"
import Register from "../screens/Register";

function TripPage() {
  return (
    <div style={{display:"flex",flexDirection:"column", minHeight:"100vh", margin:"0"}}>
      <Head />
      <Register />
      <div style={{  marginTop:"auto" }}>
        <Footer />
      </div>
    </div>
  );
}

export default TripPage;
