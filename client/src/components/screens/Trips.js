import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Form, Table } from "react-bootstrap";
import Head from "./Head";

import "bootstrap/dist/css/bootstrap.min.css";
const axios = require("axios");
const Swal = require("sweetalert2");

function Trips(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
      setTrips(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPrivateData();
  }, []);

  const onSubmit = async (data) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      const response = await axios.post("/api/private/traveldetails",data,config);
      if (response.data) {
        Swal.fire("Item added!", "List updated successfully", "success");
        props.history.push(`/mytrip/${response.data}/${trips.length}`)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const TripComponents = trips.map((trip, index) => {

    trip.startDate = trip.startDate.split("T")[0];
    trip.endDate = trip.endDate.split("T")[0];
    return (
      <tr key={trip._id} index={index} id={trip._id}>
        <td>{trip.destination}</td>
        <td>{trip.startDate}</td>
        <td>{trip.endDate}</td>
        <td><Link to={`/mytrip/${trip._id}/${index}`}>View</Link></td>
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
          backgroundImage: `url("https://images.unsplash.com/photo-1604937455095-ef2fe3d46fcd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")`,
        }}
      >
        <div>
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
              Going on a new trip?
            </span>
          </div>
          <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-lg-6">
                <Form.Group
                  controlId="start_date"
                  style={{ paddingTop: "1rem" }}
                >
                  <Form.Label style={{ fontWeight: "600", fontSize: "0.9rem" }}>Start date</Form.Label>
                  <Form.Control
                    type="date"
                    name="start_date"
                    placeholder="Enter start date"
                    autoComplete="off"
                    {...register("start_date", { required: true })}
                  />
                  {errors.start_date && (
                    <p className="">Start Date is required</p>
                  )}
                </Form.Group>
              </div>
              <div className="col-lg-6">
                <Form.Group controlId="end_date" style={{ paddingTop: "1rem" }}>
                  <Form.Label style={{ fontWeight: "600", fontSize: "0.9rem" }}>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="end_date"
                    placeholder="Enter End Date"
                    autoComplete="off"
                    {...register("end_date", { required: true })}
                  />
                  {errors.floor && <p className="">End Date is required</p>}
                </Form.Group>
              </div>
              <div className="col-lg-12">
                <Form.Group
                  controlId="destination"
                  style={{ paddingTop: "1rem" }}
                >
                  <Form.Label style={{ fontWeight: "600", fontSize: "0.9rem" }}>Destination</Form.Label>
                  <Form.Control
                    type="text"
                    name="destination"
                    placeholder="Enter Destination"
                    autoComplete="off"
                    {...register("destination", { required: true })}
                  />
                  {errors.floor && <p className="">Destination is required</p>}
                </Form.Group>
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <Button
                variant="primary"
                type="submit"
                style={{ marginTop: "1rem" }}
              >
                New trip 
              </Button>
            </div>
          </Form>
        </div>

        <br />
        <hr />
        <br />

        <div>
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
              Your Past trips
            </span>
          </div>
          <div style={{ textAlign: "center" }}>
            <Table>
              <thead>
                <tr>
                  <th>Place</th>
                  <th>Departure</th>
                  <th>Arrival</th>
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>{TripComponents}</tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trips;
