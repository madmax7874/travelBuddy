import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller  } from "react-hook-form";
import { Container, Form, Table, InputGroup, Col, Card, Button } from "react-bootstrap";
import { useAlert } from "react-alert";
import { ClipLoader } from "react-spinners";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import image from "../../assets/image.png"

const Swal = require("sweetalert2");

const axios = require("axios");

function AllTrips() {
  const navigate = useNavigate();
  const alert = useAlert();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      travelDates: [new Date(), new Date()]
    },
  });

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
    console.log(data)
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      const response = await axios.post("/api/private/trips/1", data, config);
      if (response.data) {
        alert.show("Trip added!", { type: "success" });
        navigate(`/mytrip/${response.data}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTrip = (trip, index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        };
        const url = `/api/private/trips/${trip._id}`;
        try {
          const { data } = await axios.delete(url, config);
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
    trip.travelDates[0] = trip.travelDates[0].split("T")[0];
    trip.travelDates[1] = trip.travelDates[1].split("T")[0];
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>{trip.destination}</Card.Title>
          <Card.Text>{trip.travelDates[0]} to {trip.travelDates[1]}
          </Card.Text>
          <Link to={`/mytrips/${trip._id}`}>View</Link>
          {" "}
          <Link
            to="#"     
            onClick={() => {
              deleteTrip(trip, index);
            }}
          >
            Delete
          </Link>
        </Card.Body>
      </Card>
      
      // <tr key={trip._id} index={index} id={trip._id}>
      //   <td>{trip.destination}</td>
      //   <td>{trip.travelDates[0]}</td>
      //   <td>{trip.travelDates[1]}</td>
      //   <td>
      //     <Link
      //       style={{
      //         color: "#5FA054",
      //         fontWeight: "600",
      //       }}
      //       to={`/mytrip/${trip._id}`}
      //     >
      //       View
      //     </Link>{" "}
      //     <Link
      //       style={{
      //         color: "#A15447",
      //         fontWeight: "600",
      //       }}
      //       to="#"     
      //       onClick={() => {
      //         deleteTrip(trip, index);
      //       }}
      //     >
      //       Delete
      //     </Link>
      //   </td>
      // </tr>
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
        <div style={{  padding: "0.5rem", textTransform:'capitalize' }}>
          <br />
          <Table>
            {/* <thead>
              <tr>
                <th>Place</th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>Operation</th>
              </tr>
            </thead> */}
            <tbody>{TripComponents}</tbody>
          </Table>
        </div>
      );
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Container>
          <br />
          <div style={{ textAlign: "center" }}>
            <span
              className="text-center mb-4"
              style={{
                fontWeight: "600",
                fontSize: "2rem",
                color: "#5FA054",
              }}
            >
              Going on a new trip?
            </span>
          </div>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            style={{ marginTop: "1rem" }}
          >
            <div className="row">
              <Col md={6} style={{padding:"0rem 1rem"}}>
                <Form.Group style={{ paddingTop: "1rem" }}>
                  <Form.Label style={{ fontWeight: "600", fontSize: "1rem" }}>
                    Departure - Arrival <span style={{ color: "#d00000", fontSize: "1.1rem" }}>*</span>
                  </Form.Label>
                  
                  <Controller
                    control={control}
                    name="travelDates"
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <DateRangePicker onChange={onChange} value={value} style={{padding:"1rem"}} rangeDivider=" to "/>
                    )}
                  />
                </Form.Group>
              </Col>
              <Col md={6} style={{padding:"0rem 1rem"}}>
                <Form.Group controlId="destination" style={{ paddingTop: "1rem" }}>
                  <Form.Label style={{ fontWeight: "600", fontSize: "1rem" }}>
                    Destination <span style={{ color: "#d00000", fontSize: "1.1rem" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    style={{minWidth:"150px", textTransform:'capitalize'}}
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
              </Col>
              <Col>
                <div style={{ textAlign: "center", margin:"2rem" }}>
                  <button
                    className="slide"
                    type="submit"
                    style={{ fontSize: "500" }}
                  >
                    Add
                  </button>
                </div>
              </Col>
            </div>
          </Form>

          <div style={{ textAlign: "center" }}>
            <h3 style={{margin:"1.5rem 1rem 0rem 1rem", color: "#5FA054"}}>Past Trips</h3>
          </div>
          <TripDetails />
        </Container>
      ) : (
        <div style={{ textAlign: "center", paddingTop: "200px" }}>
          <ClipLoader color="#141850" size={70} />
        </div>
      )}
    </Fragment>
  );
}

export default AllTrips;
