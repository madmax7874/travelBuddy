import React, { useEffect, useState } from "react";
import axios from "axios";
import Head from "./Head";
import { Button, Card, Form } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import { useAlert } from "react-alert";
import Swal from "sweetalert2";

import "bootstrap/dist/css/bootstrap.min.css";

function Lists({ list, index, editList, deleteList }) {
  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        fontSize: "18px",
        justifyContent: "space-between",
      }}
    >
      <span style={{ textDecoration: list.isDone ? "line-through" : "" }}>
        {list.text}
      </span>
      <div>
        <Button
          variant="btn"
          onClick={() => editList(index)}
          style={{
            backgroundColor: list.isDone ? "green" : "orange",
            color: "white",
          }}
        >
          ✓
        </Button>{" "}
        <Button variant="btn btn-danger" onClick={() => deleteList(index)}>
          ✕
        </Button>
      </div>
    </div>
  );
}

function FormTopack({ addList }) {
  const [value, setValue] = React.useState("");
  const alert = useAlert();

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
        alert.show("Item added", { type: "success" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addList(value);
    sendData(value);
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label style={{ marginBottom: "1rem" }}>
          <br />
          <br />
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
  const alert = useAlert(); 
  const [lists, setLists] = useState([]);
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
        const { data } = await axios.get("/api/private/list", config);
        setLists(data);
        setLoading(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPrivateData();
  }, [loading]);

  const addList = (text) => {
    const newList = [...lists, { text }];
    setLists(newList);
  };

  const removeData = async (value) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      const response = await axios.post(
        "/api/private/modifylist",
        { value },
        config
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const editList = async (index) => {
    const newList = [...lists];
    if (newList[index].isDone === true) {
      newList[index].isDone = false;
    } else newList[index].isDone = true;
    setLists(newList);
    const response = await removeData(newList);
    if (!response.data) {
      alert.show("Error occured", { type: "error" });
    }
    alert.show("Item modified", { type: "success" });
  };

  const deleteList = (index) => {
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
        const newList = [...lists];
        newList.splice(index, 1);
        setLists(newList);
        const response = await removeData(newList);
        if (response.data) {
          alert.show("Item Deleted",{ type: "success" });
        }
      }
    });
  };

  return (
    <div>
      <Head />
      {loading ? (
        <div
          className="app"
          style={{
            padding: "1rem",
            paddingBottom: "20rem",
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
            <div>
              <FormTopack addList={addList} />
              <Container>
                <Row>
                  {lists.map((list, index) => (
                    <Col key={index} md="4">
                      <Card style={{ margin: "0.5rem" }}>
                        <Card.Body style={{ padding: "0.7rem" }}>
                          <Lists
                            key={index}
                            index={index}
                            list={list}
                            editList={editList}
                            deleteList={deleteList}
                          />
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
