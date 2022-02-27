import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";
import { useAlert } from "react-alert";
import { SyncLoader } from "react-spinners";

import Head from "./Head";

const axios = require("axios");
const Swal = require("sweetalert2");

function MyTrip() {
  const alert = useAlert();
  const { id } = useParams();

  const [trip, setTrip] = useState({});
  const [myTripDetails, setMyTripDetails] = useState([]);
  const [value, setValue] = React.useState({
    morningPlace: "",
    morningFood: "",
    nightPlace: "",
    nightFood: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPrivateData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const url = `/api/private/mytrip/${id}`;

      try {
        const { data } = await axios.get(url, config);
        data.startDate = data.startDate.split("T")[0];
        data.endDate = data.endDate.split("T")[0];
        setMyTripDetails(data.perDayDetails);
        setTrip(data);
        setLoading(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPrivateData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value) return;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const url = `/api/private/mytrip/${id}`;
      try {
        const { data } = await axios.post(url, value, config);
        if (data.success) {
          alert.show("Details for the day added", { type: "success" });
          const newTrip = [...myTripDetails, data.perDayDetails];
          setMyTripDetails(newTrip);
        }
      } catch (error) {
        console.log(error.response.data.error);
      }
    } catch (err) {
      console.log(err);
    }
    setValue({
      morningPlace: "",
      morningFood: "",
      nightPlace: "",
      nightFood: "",
    });
  };

  const deleteMytrip = (perDayDetail,index) => {
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
        const url = `/api/private/mytrip/${perDayDetail._id}`;
        try {
          const { data } = await axios.delete(url, config);
          if (data.success) {
            alert.show("Details for the day deleted", { type: "success" });
            const newTrip = [...myTripDetails];
            newTrip.splice(index, 1);
            setMyTripDetails(newTrip);
          }
        } catch (error) {
          console.log(error.response.data.error);
        }
      }
    });
  };

  useEffect(() => {}, [value]);

  const PerDayDetails = () => {
    if (myTripDetails.length === 0)
      return (
        <h6 style={{ textAlign: "center", padding: "0.5rem",color:"#FFF"}}>
          No details added
        </h6>
      );
    else return null;
  };

  return (
    <Fragment>
      <Head />
      {loading ? (
        <div
          className="app"
          style={{
            padding: "1rem",
            background: "transparent linear-gradient(180deg,#F8CDDA 0%,#1D2B64 100%)",
            position: "absolute",
            width: "100%",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <span
              className="text-center mb-4"
              style={{
                color: "#0081a7",
                fontWeight: "700",
                fontSize: "2rem",
              }}
            >
              My trip
            </span>
          </div>
          <div
            style={{
              position: "relative",
              padding: "1rem",
              width: "100%",
              display: "flex",
              flex: 1,
              justifyContent: "center",
              alignItems: "middle",
            }}
          >
            <Card
              style={{
                height: "200px",
                width: "500px",
                paddingTop: "40px",
                paddingLeft: "10px",
                textAlign: "center",
                borderRadius: "0.8rem",
                fontSize: "20px",
                boxShadow: "0 1rem 2rem rgba(0, 0, 0, 0.5)",
                backgroundColor: "rgba(255,255,255,0.2)",
              }}
            >
              <Card.Title style={{ fontSize: "25px" }}>
                Destination : {trip.destination}
              </Card.Title>
              <Card.Body>
                From : {trip.startDate}
                <br /> To : {trip.endDate}
              </Card.Body>
            </Card>
          </div>
          <div
            style={{
              borderRadius: "5px",
              paddingBottom: "1rem",
              paddingTop: "1rem",
            }}
          >
            <div
              style={{
                paddingTop: "0.2rem",
              }}
            >
              <div style={{textAlign:"center"}}>
              <span
                style={{
                  color: "#023e8a",
                  fontWeight: "500",
                  fontSize: "1.7rem",
                }}
              >
                Per Day Details
              </span>
              </div>
              <Form className="input-form" onSubmit={handleSubmit} style={{marginTop:"0rem"}}>
                <div className="row" style={{ borderRadius: "0.3rem" }}>
                  <div className="col-lg-6">
                    <Form.Group>
                      <Form.Label
                        style={{ fontWeight: "600",marginTop:"1rem"}}
                      >
                        Morning Place to visit
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="morningPlace"
                        className="input"
                        onChange={(e) => handleChange(e)}
                        value={value.morningPlace}
                        placeholder="Morning Place to visit"
                      />
                    </Form.Group>
                  </div>

                  <div className="col-lg-6">
                    <Form.Group>
                      <Form.Label
                        style={{ fontWeight: "600",marginTop:"1rem"}}
                      >
                        Lunch at
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="morningFood"
                        className="input"
                        onChange={(e) => handleChange(e)}
                        value={value.morningFood}
                        placeholder="Lunch at"
                      />
                    </Form.Group>
                  </div>
                  <div className="col-lg-6">
                    <Form.Group>
                      <Form.Label
                        style={{ fontWeight: "600",marginTop:"1rem"}}
                      >
                        Night place to visit
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="nightPlace"
                        className="input"
                        onChange={(e) => handleChange(e)}
                        value={value.nightPlace}
                        placeholder="Night place to visit"
                      />
                    </Form.Group>
                  </div>
                  <div className="col-lg-6">
                    <Form.Group>
                      <Form.Label
                        style={{ fontWeight: "600",marginTop:"1rem"}}
                      >
                        Dinner at
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="nightFood"
                        className="input"
                        onChange={(e) => handleChange(e)}
                        value={value.nightFood}
                        placeholder="Dinner at"
                      />
                    </Form.Group>
                  </div>
                </div>
                <br />
                <div style={{ textAlign: "center" }}>
                  <Button
                    variant="primary"
                    type="submit"
                    style={{
                      border: "1px solid #3d5a80",
                      backgroundColor: "#98c1d9",
                      color: "#000",
                      borderRadius: "2rem",
                      fontSize: "18px",
                      fontWeight: "600",
                      width: "150px",
                    }}
                  >
                    Add
                  </Button>
                </div>
              </Form>
            </div>
            <PerDayDetails />
            <div>
              <Container>
                <Row className="justify-content-evenly">
                  {myTripDetails.map((perDayDetail, index) => (
                    <Col
                      key={index}
                      sm="6"
                      lg="4"
                      style={{ marginBottom: "1rem" }}
                    >
                      <Card
                        style={{
                          paddingTop: "0.5rem 0 0 0.5rem",
                          color: "#000",
                          backgroundColor:"#F8CDDA",
                        }}
                      >
                        <Card.Title style={{ textAlign: "center" }}>
                          Day {index + 1}
                        </Card.Title>
                        <Card.Body>
                          Morning Place: {perDayDetail.morningPlace}
                          <br />
                          Morning Food: {perDayDetail.morningFood}
                          <br />
                          Night Place: {perDayDetail.nightPlace}
                          <br />
                          Night Food: {perDayDetail.nightFood}
                          <br />
                          <div style={{ textAlign: "center" }}>
                            <Link
                              style={{ color: "#47126b", fontWeight: "600" }}
                              to="#"
                              onClick={() => {
                                deleteMytrip(perDayDetail,index);
                              }}
                            >
                              Delete
                            </Link>
                          </div>
                          <div
                            className="perDayDetail"
                            style={{
                              alignItems: "center",
                              display: "flex",
                              fontSize: "18px",
                              justifyContent: "space-between",
                            }}
                          ></div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Container>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center", paddingTop: "200px" }}>
          <SyncLoader color="#4ecf6a" size={20} margin={20} />
        </div>
      )}
    </Fragment>
  );
}

export default MyTrip;
