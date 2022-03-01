import React from "react";

import Head from "../screens/Head";
import Footer from "../screens/Footer"
import ExpenseTracker from "../screens/ExpenseTracker";

function ExpenseTrackerPage() {


  return (
    <div style={{display:"flex",flexDirection:"column", height:"100vh", margin:"0"}}>
      <Head />
      <ExpenseTracker />
      <div style={{  marginTop:"auto" }}>
        <Footer />
      </div>
    </div>
  );
}

export default ExpenseTrackerPage;
