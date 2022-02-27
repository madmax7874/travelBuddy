import React from "react";

import Head from "../screens/Head";
import Footer from "../screens/Footer"
import Trip from "../screens/Trip";

function TripPage() {
  return (
    <div style={{display:"flex",flexDirection:"column", height:"100vh", margin:"0"}}>
      <Head />
      <Trip />
      <div style={{  marginTop:"auto" }}>
        <Footer />
      </div>
    </div>
  );
}

export default TripPage;
