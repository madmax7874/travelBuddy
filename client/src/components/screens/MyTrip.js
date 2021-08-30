import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";
import Head from "./Head";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.scss";

const axios = require("axios");
const Swal = require("sweetalert2");

function ToPack({ topack, index, removeTopack }) {
  return (
    <div
      className="topack"
      style={{
        alignItems: "center",
        display: "flex",
        fontSize: "18px",
        justifyContent: "space-between",
      }}
    ></div>
  );
}

function FormTopack({ addTopack }) {
  const { id, index } = useParams();
  const [value, setValue] = React.useState({
    morningPlace: "",
    morningFood: "",
    nightPlace: "",
    nightFood: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const sendData = async (value) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    const url = `/api/private/perdaydetails/${id}/${index}`;
    try {
      const { data } = await axios.post(url, value, config);
      if (data) {
        Swal.fire(
          "Details for the day added",
          "Record saved successfully",
          "success"
        );
      }
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTopack(value);
    sendData(value);
    setValue({
      morningPlace: "",
      morningFood: "",
      nightPlace: "",
      nightFood: "",
    });
  };
  useEffect(() => {}, [value]);

  return (
    <Form className="input-form" onSubmit={handleSubmit}>
      <div className="row" style={{ borderRadius: "0.3rem", margin: "0.5rem" }}>
        <div className="col-lg-6">
          <Form.Group>
            <Form.Label style={{ fontWeight: "600", fontSize: "0.9rem" }}>
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
            <Form.Label style={{ fontWeight: "600", fontSize: "0.9rem" }}>
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
            <Form.Label style={{ fontWeight: "600", fontSize: "0.9rem" }}>
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
            <Form.Label style={{ fontWeight: "600", fontSize: "0.9rem" }}>
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
  );
}
function MyTrip(props) {
  const { id, index } = useParams();
  const _id = id;
  const [trip, setTrip] = useState({});
  const [topacks, setTopacks] = useState([]);

  useEffect(() => {
    const fetchPrivateData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const url = `/api/private/mytrip/${_id}`;

      try {
        const { data } = await axios.get(url, config);
        data.startDate = data.startDate.split("T")[0];
        data.endDate = data.endDate.split("T")[0];
        setTopacks(data.perDayDetails);
        setTrip(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPrivateData();
  }, [_id]);

  const addTopack = (details) => {
    const newTopacks = [...topacks, details];
    setTopacks(newTopacks);
  };

  const removeData = async (value) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    const url = `/api/private/deleteperdaydetails/${_id}/${index}`;
    try {
      const { data } = await axios.post(url, value, config);
      if (data) {
        Swal.fire(
          "Details for the day deleted",
          "Record updated successfully",
          "success"
        );
      }
    } catch (error) {
      console.log("err");
    }
  };

  const removeTopack = (index) => {
    const newTopacks = [...topacks];
    newTopacks.splice(index, 1);
    setTopacks(newTopacks);
    removeData(newTopacks);
  };

  const PerDayDetails = () => {
    if (topacks.length === 0)
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
      <div
        className="app"
        style={{
          padding: "1rem",
          backgroundColor: "#ffcb96",
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
          <br />
          <br />
        </div>
        <div
          style={{
            position: "relative",
            height: "40vh",
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
              backgroundColor:"#b2ff7a"
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
            backgroundColor:"#4ecf6a",
            paddingBottom: "1rem",
            paddingTop: "1rem",
          }}
        >
          <h4 style={{ textAlign: "center" }}>Per Day Details</h4>
          <br />
          <PerDayDetails />
          <div>
            <Container>
              <Row className="justify-content-evenly">
                {topacks.map((topack, index) => (
                  <Col key={index} sm="6" lg="4" style={{marginBottom:"1rem"}}>
                    <Card
                      style={{
                        paddingTop: "0.5rem 0 0 0.5rem",
                        color:"#000",
                        background: "transparent linear-gradient(180deg,#ddbdfc 0%,#bbadff 26%,#bbd0ff 53%,#bbadff 80%, #ddbdfc 100%)"
                      }}
                    >
                      <Card.Title style={{textAlign:"center"}}>Day {index + 1}</Card.Title>
                      <Card.Body>
                        Morning Place: {topack.morningPlace}
                        <br />
                        Morning Food: {topack.morningFood}
                        <br />
                        Night Place: {topack.nightPlace}
                        <br />
                        Night Food: {topack.nightFood}
                        <br />
                        <div style={{textAlign:"center"}}>
                        <Link
                          style={{ color: "#47126b", fontWeight: "600"}}
                          to="#"
                          onClick={() => {
                            const confirmBox = window.confirm("Are you sure you want to delete this?")
                            if(confirmBox===true){
                              removeTopack(index)
                            }
                          }}
                        >
                          Delete
                        </Link>
                        </div>
                        <ToPack
                          key={index}
                          index={index}
                          topack={topack}
                          removeTopack={removeTopack}
                        />
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          </div>
          <FormTopack addTopack={addTopack} />
        </div>
      </div>
    </div>
  );
}

export default MyTrip;
