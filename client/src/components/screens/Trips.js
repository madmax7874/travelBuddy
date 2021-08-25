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

  useEffect(() => {
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
      const response = await axios.post(
        "/api/private/traveldetails",
        data,
        config
      );
      if (response.data) {
        Swal.fire(
          "Trip added!",
          "Travel history updated successfully",
          "success"
        );
        props.history.push(`/mytrip/${response.data}/${trips.length}`);
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
        <td>
          <Link
            style={{
              color: "#f3722c",
              textDecoration: "none",
              fontWeight: "600",
            }}
            to={`/mytrip/${trip._id}/${index}`}
          >
            View
          </Link>
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
          backgroundColor: "#ddbea9",
        }}
      >
        <div>
          <div style={{ textAlign: "center" }}>
            <span
              className="text-center mb-4"
              style={{
                color: "#f1faee",
                fontWeight: "700",
                fontSize: "2rem",
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
                  <Form.Label style={{ fontWeight: "600", fontSize: "0.9rem" }}>
                    Start date
                  </Form.Label>
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
                  <Form.Label style={{ fontWeight: "600", fontSize: "0.9rem" }}>
                    End Date
                  </Form.Label>
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
                  <Form.Label style={{ fontWeight: "600", fontSize: "0.9rem" }}>
                    Destination
                  </Form.Label>
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
                style={{
                  marginTop: "2rem",
                  border: "1px solid #fbd1a2",
                  borderRadius: "2rem",
                  width: "200px",
                  backgroundColor: "#faedcb",
                  fontWeight: "600",
                  fontSize: "18px",
                  color: "#000",
                }}
              >
                New trip
              </Button>
            </div>
          </Form>
        </div>
      </div>

      <div style={{ backgroundColor: "#ffe8d6" }}>
        <br />
        <div style={{ textAlign: "center" }}>
          <span
            className="text-center mb-4"
            style={{
              color: "#cb997e",
              fontWeight: "700",
              fontSize: "2rem",
            }}
          >
            Your Past trips
          </span>
        </div>
        <div style={{ textAlign: "center" }}>
          <br />
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
  );
}

export default Trips;
