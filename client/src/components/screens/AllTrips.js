import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller  } from "react-hook-form";
import { Container, Form, Row, Col, Card, Button } from "react-bootstrap";
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
        const { data } = await axios.get(`${process.env.REACT_APP_API_URI}api/private/trips/1`, config);
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
      const response = await axios.post(`${process.env.REACT_APP_API_URI}api/private/trips/1`, data, config);
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
        const url = `${process.env.REACT_APP_API_URI}api/private/trips/${trip._id}`;
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
      <Card style={{ width: '18rem', margin:"1rem"}} key={index}>
        <Card.Img variant="top" src={image}/>
        <Card.Body>
          <Card.Title style={{textAlign:"center"}}>{trip.destination}</Card.Title>
          <hr/>
          <Row style={{textAlign:"center"}}>
            <Col sm={6} style={{padding:"0.5rem"}}>
              <Card.Subtitle>Start</Card.Subtitle>
              <Card.Text>{trip.travelDates[0]}</Card.Text>
            </Col>
            <Col sm={6}  style={{padding:"0.5rem"}}>
              <Card.Subtitle>End</Card.Subtitle>
              <Card.Text>{trip.travelDates[1]}</Card.Text>
            </Col>
          </Row>
          <div style={{margin:"0rem 1rem"}}>
            <Button style={{fontWeight:"bold", color:"#A15447 ",padding: "0.375rem 0.5rem",backgroundColor:"#fff", marginRight:'0px'}}>
            <Link to={`/mytrip/${trip._id}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
              </svg>
            </Link>
            </Button>
            {" "}
            <Button
              style={{fontWeight:"bold", color:"#A15447 ",padding: "0.375rem 0.5rem",backgroundColor:"#fff", marginRight:'0px', float:"right"}}
              onClick={() =>deleteTrip(trip, index)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
            </svg>
            </Button>
          </div>
        </Card.Body>
      </Card>
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
        <div style={{  padding: "1rem", textTransform:'capitalize', display:"flex", justifyContent:"space-evenly",flexWrap:"wrap" }}>
          {TripComponents}
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
