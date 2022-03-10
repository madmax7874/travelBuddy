import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";
import { useAlert } from "react-alert";
import { ClipLoader } from "react-spinners";

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
        data.travelDates[0] = data.travelDates[0].split("T")[0];
        data.travelDates[1] = data.travelDates[1].split("T")[0];
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

  const deleteMytrip = (perDayDetail, index) => {
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
        <h6 style={{ textAlign: "center", padding: "0.5rem", color: "#FFF" }}>
          No details added
        </h6>
      );
    else {
      return (
        <div style={{  padding: "1rem", textTransform:'capitalize', display:"flex", justifyContent:"space-evenly",flexWrap:"wrap" }}>
          {myTripDetails.map((perDayDetail, index) => (
            <Card style={{ width: '18rem', margin:"1rem"}} key={index}>
              <Card.Body>
                <Card.Title style={{textAlign:"center"}}>Day {index + 1}</Card.Title>
                <hr/>
                Morning Place: {perDayDetail.morningPlace}
                <br />
                Morning Food: {perDayDetail.morningFood}
                <br />
                Night Place: {perDayDetail.nightPlace}
                <br />
                Night Food: {perDayDetail.nightFood}
                <hr/>
                <div style={{margin:"0rem 1rem"}}>
                  <Button style={{fontWeight:"bold", color:"#A15447 ",padding: "0.375rem 0.5rem",backgroundColor:"#fff", marginRight:'0px'}}>
                  <Link to="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                    </svg>
                  </Link>
                  </Button>
                  {" "}
                  <Button
                    style={{fontWeight:"bold", color:"#A15447 ",padding: "0.375rem 0.5rem",backgroundColor:"#fff", marginRight:'0px', float:"right"}}
                    onClick={() => {deleteMytrip(perDayDetail, index); }}                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                  </svg>
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      );
    }
  };

  return (
    <Fragment>
      {loading ? (
        <div style={{ margin: "1rem" }}>
          <Container>
            <div style={{ textAlign: "center" }}>
              <span
                className="text-center mb-4"
                style={{
                  fontWeight: "600",
                  fontSize: "2rem",
                  color: "#5FA054",
                  textTransform: "capitalize",
                }}
              >
                {trip.destination}
              </span>
            </div>
            <Row style={{textAlign:"center",fontSize:"1.3rem",fontWeight:"500",color:"#141850"}}>
              <Col md={6}>
                  Departure: {trip.travelDates[0]}
              </Col>
              <Col md={6}>
                Arrival: {trip.travelDates[1]}
              </Col>
            </Row>
            <div style={{paddingTop:"2rem"}}>
              <div style={{ textAlign: "center", padding: "1rem 0rem 0rem 0rem" }}>
                <h3 style={{ color: "#5FA054" }}>Per Day Details</h3>
              </div>
              <Form onSubmit={handleSubmit}>
                <div className="row" style={{ borderRadius: "0.3rem" }}>
                  <div className="col-lg-6">
                    <Form.Group>
                      <Form.Label
                        style={{ fontWeight: "600", marginTop: "1rem" }}
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
                        style={{ fontWeight: "600", marginTop: "1rem" }}
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
                        style={{ fontWeight: "600", marginTop: "1rem" }}
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
                        style={{ fontWeight: "600", marginTop: "1rem" }}
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
                <div style={{ textAlign: "center", margin:"1rem" }}>
                  <button
                    className="slide"
                    type="submit"
                    style={{fontSize:"500"}}
                  >
                    Add
                  </button>
                </div>
              </Form>
              <PerDayDetails />
            </div>
          </Container>
        </div>
      ) : (
        <div style={{ textAlign: "center", paddingTop: "200px" }}>
          <ClipLoader color="#141850" size={70} />
        </div>
      )}
    </Fragment>
  );
}

export default MyTrip;
