import React, { useEffect, useState } from "react";
import axios from "axios";
import Head from "./Head";
import { Button, Card, Form } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import { useAlert } from "react-alert";
import Swal from "sweetalert2";

import "bootstrap/dist/css/bootstrap.min.css";

function DontForgetMe() {
  const alert = useAlert();
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = React.useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchPrivateData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try {
        const { data } = await axios.get("/api/private/list/1", config);
        setLists(data);
        setFilteredList(data);
        setLoading(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPrivateData();
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value) return;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      const { data } = await axios.post(
        "/api/private/list/1",
        { value },
        config
      );
      if (data.success) {
        alert.show("Item added", { type: "success" });
        const newList = [...lists, data.item];
        setLists(newList);
      }
    } catch (error) {
      console.log(error);
    }
    setValue("");
  };

  const editList = async (list, index) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    const payload = {
      _id: list._id,
      isDone: !list.isDone,
    };
    const url = `/api/private/list/${list._id}`;
    try {
      const { data } = await axios.put(url, payload, config);
      if (data.success) {
        const newList = [...lists];
        if (newList[index].isDone === true) {
          newList[index].isDone = false;
        } else newList[index].isDone = true;
        setLists(newList);
        alert.show("Item modified", { type: "success" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteList = (list, index) => {
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
        const url = `/api/private/list/${list._id}`;
        try {
          const { data } = await axios.delete(url, config);
          if (data.success) {
            const newList = [...lists];
            newList.splice(index, 1);
            setLists(newList);
            alert.show("Item Deleted", { type: "success" });
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handleChange = async (e) => {
    setFilter(e.target.value);
    if (e.target.value === "all") {
      setLists(filteredList);
      return;
    }
    setLists(
      filteredList.filter((list) => list.isDone === JSON.parse(e.target.value))
    );
  };

  return (
    <div>
      <Head />
      {loading ? (
        <div
          className="app"
          style={{
            padding: "1rem",
            paddingBottom: "25rem",
            backgroundImage: `url("https://images.unsplash.com/photo-1604937455095-ef2fe3d46fcd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")`,
          }}
        >
          <div className="container">
            <div style={{ textAlign: "center" }}>
              <span
                className="text-center mb-4"
                style={{
                  color: "#52b788",
                  fontWeight: "700",
                  fontSize: "2rem",
                }}
              >
                Dont Forget Me!
              </span>
            </div>
            <div>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label
                    style={{
                      marginBottom: "1rem",
                      fontWeight: "600",
                      fontSize: "1rem",
                    }}
                  >
                    <br />
                    <br />
                    <span
                      style={{
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
                <Button
                  variant="primary"
                  type="submit"
                  style={{
                    margin: "2rem",
                    marginLeft: "0",
                    backgroundColor: "#f3722c",
                    fontSize: "18px",
                    fontWeight: "600",
                  }}
                >
                  Add
                </Button>
              </Form>
              <div>
                <Form.Group
                  style={{
                    textAlign:"center",
                    padding: "0rem 1rem 1rem 1rem",
                  }}
                >
                  <select
                    style={
                      filter === "false"
                        ? {                    
                            display: "inline",
                            width: "auto",
                            fontWeight:"500",
                            backgroundColor: "#ffbf69",
                          }
                        : filter === "true"
                        ? {
                            display: "inline",
                            width: "auto",
                            fontWeight:"500",
                            backgroundColor: "#52b788",
                          }
                        : {
                            display: "inline",
                            width: "auto",
                            fontWeight:"500",
                            backgroundColor: "#90e0ef",
                          }
                    }
                    className="form-select"
                    value={filter}
                    name="filter"
                    onChange={(e) => handleChange(e)}
                  >
                    <option style={{ backgroundColor: "none" }} value="all">
                      All
                    </option>
                    <option value="true">Packed</option>
                    <option value="false">Unpacked</option>
                  </select>
                </Form.Group>
              </div>
              <Container>
                <Row>
                  {lists.map((list, index) => (
                    <Col key={index} md="4">
                      <Card style={{ margin: "0.5rem" }}>
                        <Card.Body style={{ padding: "0.7rem" }}>
                          <div
                            style={{
                              alignItems: "center",
                              display: "flex",
                              fontSize: "18px",
                              justifyContent: "space-between",
                            }}
                          >
                            <span
                              style={{
                                textDecoration: list.isDone
                                  ? "line-through"
                                  : "",
                              }}
                            >
                              {list.text}
                            </span>
                            <div>
                              <Button
                                variant="btn"
                                onClick={() => editList(list, index)}
                                style={{
                                  backgroundColor: list.isDone
                                    ? "green"
                                    : "#f48c06",
                                  color: "white",
                                }}
                              >
                                ✓
                              </Button>{" "}
                              <Button
                                variant="btn btn-danger"
                                onClick={() => deleteList(list, index)}
                              >
                                ✕
                              </Button>
                            </div>
                          </div>
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
          <ClipLoader color="rgba(60, 53, 119,1)" size={70} />
        </div>
      )}
    </div>
  );
}

export default DontForgetMe;
