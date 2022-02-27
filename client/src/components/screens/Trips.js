import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Form, Table } from "react-bootstrap";
import { useAlert } from "react-alert";
import Head from "./Head";
import { SyncLoader } from "react-spinners";
const Swal = require("sweetalert2");

const axios = require("axios");

function Trips() {
  const navigate = useNavigate();
  const alert = useAlert();
  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let currentDate = `${year}-${month<10?`0${month}`:`${month}`}-${date}`
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues:{
      start_date: currentDate
  }});

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
        const { data } = await axios.get("/api/private/trips/1", config);
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
        "/api/private/trips/1",
        data,
        config
      );
      if (response.data) {
        alert.show("Trip added!", { type: "success" });
        navigate(`/mytrip/${response.data}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTrip = (trip,index) =>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        };
        const url = `/api/private/trips/${trip._id}`
        try {
          const {data} = await axios.delete(url, config);
          if (data.success) {
            const newTrips = [...trips];
            newTrips.splice(index, 1);
            setTrips(newTrips);
            alert.show("Trip Deleted!", { type: "success" });
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
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
            to={`/mytrip/${trip._id}`}
          >
            View
          </Link>{" "}
          <Link
            style={{
              color: "#f3722c",
              fontWeight: "600",
            }}
            to="#"
            onClick={() => {deleteTrip(trip,index)}}
          >
            Delete
          </Link>
        </td>
      </tr>
    );
  });

  const TripDetails = () => {
    if (trips.length === 0) {
      return (
        <h6 style={{ textAlign: "center", padding: "0.5rem" }}>
          No trip added
        </h6>
      );
    } else {
      return (
        <div style={{ textAlign: "center", margin: "1rem", padding: "0.5rem" }}>
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
      );
    }
  };

  return (
    <Fragment>
      <Head />
      {loading ? (
        <div className="app" style={{ backgroundColor: "#ffe8d6" }}>
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
                        Start Date is required
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
                        End Date is required
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
                        Destination is required
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
                    border: "1px solid #ffe8d6",
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
            <TripDetails />
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center", paddingTop: "200px" }}>
          <SyncLoader color="#f3722c" size={20} margin={20} />
        </div>
      )}
    </Fragment>
  );
}

export default Trips;
