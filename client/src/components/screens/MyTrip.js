import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";
import Head from "./Head";
import { useAlert } from "react-alert";
import { SyncLoader } from "react-spinners";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.scss";

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
        <h6 style={{ textAlign: "center", padding: "0.5rem" }}>
          No details added
        </h6>
      );
    else return null;
  };

  return (
    <div>
      <Head />
      {loading ? (
        <div
          className="app"
          style={{
            padding: "1rem",
            backgroundImage: `url("https://images.unsplash.com/photo-1517094857443-80776ddd155c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1502&q=80)`,
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
              Your trip
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
              className="container"
              style={{
                boxShadow: "0 1rem 2rem rgba(0, 0, 0, 0.5)",
                backgroundColor: "rgba(255,255,255,0.2)",
                paddingTop: "0.2rem",
              }}
            >
              <h4
                style={{
                  textAlign: "center",
                  color: "#0081a7",
                  fontWeight: "500",
                  fontSize: "1.7rem",
                }}
              >
                Per Day Details
              </h4>
              <Form className="input-form" onSubmit={handleSubmit} style={{paddingBottom:"1rem"}}>
                <div className="row" style={{ borderRadius: "0.3rem" }}>
                  <div className="col-lg-6">
                    <Form.Group>
                      <Form.Label
                        style={{ fontWeight: "600", fontSize: "0.9rem" }}
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
                        style={{ fontWeight: "600", fontSize: "0.9rem" }}
                      >
                        Morning Dine at
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="morningFood"
                        className="input"
                        onChange={(e) => handleChange(e)}
                        value={value.morningFood}
                        placeholder="Morning Dine at"
                      />
                    </Form.Group>
                  </div>
                  <div className="col-lg-6">
                    <Form.Group>
                      <Form.Label
                        style={{ fontWeight: "600", fontSize: "0.9rem" }}
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
                        style={{ fontWeight: "600", fontSize: "0.9rem" }}
                      >
                        Night dine at
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="nightFood"
                        className="input"
                        onChange={(e) => handleChange(e)}
                        value={value.nightFood}
                        placeholder="Night dine at"
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
                      border: "1px solid #9a8f97",
                      backgroundColor: "#9c89b8",
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
                          background:
                            "transparent linear-gradient(180deg,#ddbdfc 0%,#bbadff 26%,#bbd0ff 53%,#bbadff 80%, #ddbdfc 100%)",
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
    </div>
  );
}

export default MyTrip;
