import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Head from "./Head";
import "bootstrap/dist/css/bootstrap.min.css";

const axios = require("axios");

function MyTrip(props) {
  const { id } = useParams();
  const _id = id;

  const [trip, setTrip] = useState({});

  const fetchPrivateData = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    const url = `/api/private/mytrip/${_id}`

    try {
      const { data } = await axios.get(url, config);
      data.startDate = data.startDate.split("T")[0];
      data.endDate = data.endDate.split("T")[0];
      setTrip(data)
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    fetchPrivateData();
  }, []);

  return (
    <div>
      <Head />
      <div
        className="app"
        style={{
          padding: "1rem",
          backgroundImage: `url("https://images.unsplash.com/photo-1604937455095-ef2fe3d46fcd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")`,
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
            Your trip
          </span>
        </div>
        <div>
            <h1>{trip.destination}</h1>
            <h4 style={{textAlign:"center"}}>{trip.startDate}</h4>
            <h4 style={{textAlign:"center"}}>{trip.endDate}</h4>
        </div>
      </div>
    </div>
  );
}

export default MyTrip;
