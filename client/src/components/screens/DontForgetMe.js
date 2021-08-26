import React, { useEffect, useState } from "react";
import axios from "axios";
import Head from "./Head";
import { Button, Card, Form } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";

import "bootstrap/dist/css/bootstrap.min.css";

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
      <span style={{ textDecoration: topack.isDone ? "line-through" : "" }}>
        {topack.text}
      </span>
      <div>
        <Button
          variant="btn"
          onClick={() => markTopack(index)}
          style={{
            backgroundColor: topack.isDone ? "green" : "orange",
            color: "white",
          }}
        >
          ✓
        </Button>{" "}
        <Button variant="btn btn-danger" onClick={() => removeTopack(index)}>
          ✕
        </Button>
      </div>
    </div>
  );
}

function FormTopack({ addTopack }) {
  const [value, setValue] = React.useState("");

  const sendData = async (value) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      const { data } = await axios.post("/api/private/list", { value }, config);
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
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label style={{ marginBottom: "1rem" }}>
          <span
            style={{
              backgroundColor: "rgba(255,255,255,0.7)",
              fontSize: "1rem",
              padding: "0.5rem",
              borderRadius: "0.7rem",
            }}
          >
            Add Items
          </span>
        </Form.Label>
        <Form.Control
          type="text"
          className="input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add new item"
        />
      </Form.Group>
      <Button variant="primary mb-3" type="submit">
        Add
      </Button>
    </Form>
  );
}

function DontForgetMe() {
  const [topacks, setTopacks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPrivateData = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    setLoading(true);
    try {
      const { data } = await axios.get("/api/private/list", config);
      setTopacks(data);
    } catch (error) {
      console.log(error);
      // localStorage.removeItem("authToken");
    }
  };

  useEffect(() => {
    fetchPrivateData();
  }, [loading]);

  const addTopack = (text) => {
    const newTopacks = [...topacks, { text }];
    setTopacks(newTopacks);
  };

  const removeData = async (value) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      const { data } = await axios.post(
        "/api/private/modifylist",
        { value },
        config
      );
      if (data) {
        Swal.fire("Item modified", "List updated successfully", "success");
      }
    } catch (error) {
      console.log("err");
    }
  };

  const markTopack = (index) => {
    const newTopacks = [...topacks];
    if (newTopacks[index].isDone === true) {
      newTopacks[index].isDone = false;
    } else newTopacks[index].isDone = true;
    setTopacks(newTopacks);
    removeData(newTopacks);
  };

  const removeTopack = (index) => {
    const newTopacks = [...topacks];
    newTopacks.splice(index, 1);
    setTopacks(newTopacks);
    removeData(newTopacks);
  };

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
        <div className="container">
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
              Dont Forget Me!
            </span>
          </div>
          {loading ? (
            <div>
              <FormTopack addTopack={addTopack} />
              <Container>
                <Row>
                  {topacks.map((topack, index) => (
                    <Col key={index} md="4">
                      <Card style={{ margin: "0.5rem" }}>
                        <Card.Body style={{ padding: "0.7rem" }}>
                          <ToPack
                            key={index}
                            index={index}
                            topack={topack}
                            markTopack={markTopack}
                            removeTopack={removeTopack}
                          />
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Container>
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <ClipLoader color="rgba(60, 53, 119,1)" size={50} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DontForgetMe;
