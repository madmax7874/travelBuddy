import React from "react";

import Head from "../screens/Head";
import Footer from "../screens/Footer"
import AllTrips from "../screens/AllTrips";

function AllTripsPage() {


  return (
    <div style={{display:"flex",flexDirection:"column", minHeight:"100vh", margin:"0"}}>
      <Head />
      <AllTrips />
      <div style={{  marginTop:"auto" }}>
        <Footer />
      </div>
    </div>
  );
}

export default AllTripsPage;
