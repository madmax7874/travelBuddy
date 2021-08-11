import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import Head from "./Head";
import "./styles.scss";
// import Swal from 'sweetalert2'

import "bootstrap/dist/css/bootstrap.min.css";
const axios = require("axios");
const Swal = require("sweetalert2");

function ToPack({ topack, index, markTopack, removeTopack }) {
  return (
    <div
      className="topack"
      style={{
        alignItems: "center",
        display: "flex",
        fontSize: "18px",
        justifyContent: "space-between",
      }}
    >
      <span>
        Day{topack.day} : {topack.place}
      </span>
      <div>
        <Button variant="btn btn-danger" onClick={() => removeTopack(index)}>
          ✕
        </Button>
      </div>
    </div>
  );
}

function FormTopack({ addTopack }) {
  const [value, setValue] = React.useState({
    day: "",
    place: "",
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
      day: "",
      place: "",
    });
  };
  useEffect(() => {}, [value]);

  return (
    <Form className="input-form" onSubmit={handleSubmit}>
      <div className="row" style={{ borderRadius: "0.3rem", margin: "0.5rem" }}>
        <div className="col-lg-6">
          <Form.Group>
            <Form.Label style={{ marginBottom: "1rem" }}>
              Per Day Details
            </Form.Label>
            <Form.Control
              type="number"
              name="day"
              className="input"
              onChange={(e) => handleChange(e)}
              value={value.day}
              placeholder="Add day as a number"
            />
          </Form.Group>
        </div>

        <div className="col-lg-6">
          <Form.Group>
            <Form.Label style={{ marginBottom: "1rem" }}>
              Per Day Details
            </Form.Label>
            <Form.Control
              type="text"
              name="place"
              className="input"
              onChange={(e) => handleChange(e)}
              value={value.place}
              placeholder="Add places to visit each day"
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
    startDate:"",
    endDate:"",
    destination:"",
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
      startDate:"",
      endDate:"",
      destination:"",
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
            <Form.Label style={{ marginBottom: "1rem" }}>Destination</Form.Label>
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
            <h4 style={{ textAlign: "center"}}>
              Per Day Details
            </h4>
            <Days />
            {topacks.map((topack, index) => {
              return (
                <div key={index}>
                  <Card style={{ margin: "0.5rem" }}>
                    <Card.Body style={{ padding: "0.7rem" }}>
                      <ToPack
                        key={index}
                        index={index}
                        topack={topack}
                        // markTopack={markTopack}
                        removeTopack={removeTopack}
                      />
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
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
