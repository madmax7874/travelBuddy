import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {Table } from "react-bootstrap";
import Head from "./Head";
// import Swal from 'sweetalert2'

import "bootstrap/dist/css/bootstrap.min.css";
const axios = require("axios");

function Trips(props) {

  const [trips, setTrips] = useState([]);

  const fetchPrivateData = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }; 

    try {
      const { data } = await axios.get("/api/private/trips", config);
      setTrips(data)
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    fetchPrivateData();
  }, []);

  const TripComponents = trips.map((trip, index) => {
    return (
      <tr key={trip._id} index={index} id={trip._id}>
        <td>{trip.destination}</td>
        <td>{trip.startDate}</td>
        <td>
          <Link to={`/mytrip/${trip._id}`}>View</Link> <Link to="#"onClick={() => {console.log(trip._id)}}>Delete</Link>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <Head />
      <div
        className="app"
        style={{
          padding: "1rem",
        //   backgroundImage: `url("https://images.unsplash.com/photo-1604937455095-ef2fe3d46fcd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")`,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <span
            className="text-center mb-4"
            style={{
              backgroundColor: "rgba(255,255,255,0.6)",
              fontWeight: "500",
              fontSize: "2rem",
              padding: "0.5rem",
              borderRadius: "1rem",
            }}
          >
            Your trips 
          </span>
        </div>
        <div style={{ textAlign: "center" }}>
          <Table>
            <thead>
              <tr>
                <th>Place</th>
                <th>Departure</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {TripComponents}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}



export default Trips;
