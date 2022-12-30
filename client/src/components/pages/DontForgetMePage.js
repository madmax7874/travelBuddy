import React from "react";

import Head from "../screens/Head";
import Footer from "../screens/Footer"
import DontForgetMe from "../screens/DontForgetMe";

function DontForgetMePage() {


  return (
    <div style={{display:"flex",flexDirection:"column", minHeight:"100vh", margin:"0"}}>
      <Head />
      <DontForgetMe />
      <div style={{  marginTop:"auto" }}>
        <Footer />
      </div>
    </div>
  );
}

export default DontForgetMePage;
