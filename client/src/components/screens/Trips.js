import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Form, Table } from "react-bootstrap";
import { useAlert } from "react-alert";
import Head from "./Head";
import { SyncLoader } from "react-spinners";

import "bootstrap/dist/css/bootstrap.min.css";
const axios = require("axios");

function Trips(props) {
  const alert = useAlert();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);

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
        setLoading(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPrivateData();
  }, [loading]);

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
        alert.show("Trip added!", { type: "success" });
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
      {loading ? (
        <div className="app" style={{ backgroundColor: "#ffe8d6" }}>
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
            <div style={{ textAlign: "center",margin:"1rem",padding:"0.5rem"  }}>
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
          <br />
          <div style={{ backgroundColor: "#ddbea9", paddingBottom: "0.1rem" }}>
            <br />
            <div style={{ textAlign: "center" }}>
              <span
                className="text-center mb-4"
                style={{
                  color: "#a47148",
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
                    <Form.Label style={{ fontWeight: "600", fontSize: "1rem" }}>
                      Start date
                      <span style={{ color: "#d00000", fontSize: "1.1rem" }}>
                        *
                      </span>
                    </Form.Label>
                    <Form.Control
                      type="date"
                      name="start_date"
                      placeholder="Enter start date"
                      autoComplete="off"
                      {...register("start_date", { required: true })}
                    />
                    {errors.start_date && (
                      <p className="" style={{ color: "#e85d04" }}>
                        *Start Date is required
                      </p>
                    )}
                  </Form.Group>
                </div>
                <div className="col-lg-6">
                  <Form.Group
                    controlId="end_date"
                    style={{ paddingTop: "1rem" }}
                  >
                    <Form.Label style={{ fontWeight: "600", fontSize: "1rem" }}>
                      End Date
                      <span style={{ color: "#d00000", fontSize: "1.1rem" }}>
                        *
                      </span>
                    </Form.Label>
                    <Form.Control
                      type="date"
                      name="end_date"
                      placeholder="Enter End Date"
                      autoComplete="off"
                      {...register("end_date", { required: true })}
                    />
                    {errors.end_date && (
                      <p className="" style={{ color: "#e85d04" }}>
                        *End Date is required
                      </p>
                    )}
                  </Form.Group>
                </div>
                <div className="col-lg-12">
                  <Form.Group
                    controlId="destination"
                    style={{ paddingTop: "1rem" }}
                  >
                    <Form.Label style={{ fontWeight: "600", fontSize: "1rem" }}>
                      Destination
                      <span style={{ color: "#d00000", fontSize: "1.1rem" }}>
                        *
                      </span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="destination"
                      placeholder="Enter Destination"
                      autoComplete="off"
                      {...register("destination", { required: true })}
                    />
                    {errors.destination && (
                      <p className="" style={{ color: "#e85d04" }}>
                        *Destination is required
                      </p>
                    )}
                  </Form.Group>
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <Button
                  variant="primary"
                  type="submit"
                  style={{
                    marginTop: "2rem",
                    border: "1px solid #973aa8",
                    borderRadius: "2rem",
                    width: "200px",
                    backgroundColor: "#a47148",
                    fontWeight: "600",
                    fontSize: "20px",
                    color: "#ffe8d6",
                  }}
                >
                  New trip
                </Button>
              </div>
            </Form>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center", paddingTop: "200px" }}>
          <SyncLoader color="#f3722c" size={20} margin={20} />
        </div>
      )}
    </div>
  );
}

export default Trips;
