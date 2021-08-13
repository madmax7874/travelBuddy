import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { Button, Form, Table } from "react-bootstrap";
import Head from "./Head";
import "./styles.scss";
// import Swal from 'sweetalert2'

import "bootstrap/dist/css/bootstrap.min.css";
const axios = require("axios");
const Swal = require("sweetalert2");

function ToPack({ topack, index, markTopack, removeTopack }) {
  return (
    <tr>
      <th>{index+1}</th>
      <td>{topack.morningPlace}</td>
      <td>{topack.morningFood}</td>
      <td>{topack.nightPlace}</td>
      <td>{topack.nightFood}</td>
      <td>
        <Link to="#" onClick={() => removeTopack(index)}>
          Delete
        </Link>
      </td>
    </tr>
  );
}

function FormTopack({ addTopack }) {
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
    try {
      const { data } = await axios.post(
        "/api/private/traveldetails",
        value,
        config
      );
      if (data) {
        Swal.fire("Item added!", "List updated successfully", "success");
      }
    } catch (error) {
      console.log("err");
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

      <Button variant="primary mb-3" type="submit">
        Add
      </Button>
    </Form>
  );
}

function TravelDetails(props) {
  const [topacks, setTopacks] = useState([]);

  const addTopack = (details) => {
    const newTopacks = [...topacks, details];
    setTopacks(newTopacks);
  };

  // const markTopack = (index) => {
  //   const newTopacks = [...topacks];
  //   if (newTopacks[index].isDone === true) {
  //     newTopacks[index].isDone = false;
  //   } else newTopacks[index].isDone = true;
  //   setTopacks(newTopacks);
  //   // removeData(newTopacks)
  // };

  const removeTopack = (index) => {
    const newTopacks = [...topacks];
    newTopacks.splice(index, 1);
    setTopacks(newTopacks);
    // removeData(newTopacks)
  };

  const saveClick = async () => {
    const url = `/api/private/parties/${props.id}`;
    const response = await axios.post(url, topacks);
    if (response.data) {
      Swal.fire("Good job!", "Profile Updated Successfully", "success");
    }
  };

  const Days = () => {
    if (topacks.length === 0)
      return (
        <h6 style={{ textAlign: "center", padding: "0.5rem" }}>
          No details added
        </h6>
      );
    else return null;
  };

  const [value, setValue] = React.useState({
    startDate: "",
    endDate: "",
    destination: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTopack(value);
    // sendData(value)
    setValue({
      startDate: "",
      endDate: "",
      destination: "",
    });
  };
  useEffect(() => {}, [value]);

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
            Add your trip details
          </span>
        </div>
        <Form className="input-form" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6">
              <Form.Group className="">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
            </div>
            <div className="col-lg-6">
              <Form.Group className="">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  name="endDate"
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
            </div>

            <div className="col-lg-12">
              <Form.Group>
                <Form.Label style={{ marginBottom: "1rem" }}>
                  Destination
                </Form.Label>
                <Form.Control
                  type="text"
                  name="destination"
                  className="input"
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter Destination"
                />
              </Form.Group>
            </div>
          </div>
        </Form>
        <h4 style={{ textAlign: "center" }}>Per Day Details</h4>
        <br />
        <Days />
        <div style={{textAlign:"center"}}>
        <Table>
          <thead>
            <tr>
              <th>Day</th>
              <th>Morning Place</th>
              <th>Morning Food</th>
              <th>Night Place</th>
              <th>Night Food</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {topacks.map((topack, index) => {
              return (
                <ToPack
                  key={index}
                  index={index}
                  topack={topack}
                  // markTopack={markTopack}
                  removeTopack={removeTopack}
                />
              );
            })}
          </tbody>
        </Table>
        </div>
        
        <FormTopack addTopack={addTopack} />

        <div style={{ textAlign: "center" }}>
          <Button
            variant="primary"
            onClick={saveClick}
            style={{ marginTop: "1rem" }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TravelDetails;

// {
//    <div className="col-lg-6">
//           <Form.Group className="">
//             <Form.Label>Start Date</Form.Label>
//             <Form.Control
//               type="date"
//               name="startDate"
//               onChange={(e) => handleChange(e)}
//             />
//           </Form.Group>
//         </div>
//         <div className="col-lg-6">
//           <Form.Group className="">
//             <Form.Label>End Date</Form.Label>
//             <Form.Control
//               type="date"
//               name="endDate"
//               onChange={(e) => handleChange(e)}
//             />
//           </Form.Group>
//         </div>

//         <div className="col-lg-12">
//           <Form.Group>
//             <Form.Label style={{ marginBottom: "1rem" }}>Destination</Form.Label>
//             <Form.Control
//               type="text"
//               name="destination"
//               className="input"
//               onChange={(e) => handleChange(e)}
//               placeholder="Enter Destination"
//             />
//           </Form.Group>
//         </div>
// }
