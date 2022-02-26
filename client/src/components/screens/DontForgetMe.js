import React, { useEffect, useState } from "react";
import { Button, Card, Form, InputGroup, Container, Row, Col } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import { useAlert } from "react-alert";

import Head from "./Head";
import Footer from "./Footer"

import "./buttonslider.scss"

const axios = require("axios");
const Swal = require("sweetalert2");

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
        newList[index].isDone = !newList[index].isDone;
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
        <div style={{margin:"1rem"}}>
          <div className="container">
            <div style={{ textAlign: "center" }}>
              <span
                className="text-center mb-4"
                style={{
                  fontWeight: "600",
                  fontSize: "2rem",
                  color: "#5FA054"
                }}
              >
                Dont Forget Me!
              </span>
            </div>
            <div>
              <Form onSubmit={handleSubmit} style={{margin:"1rem 0.2rem"}}>
                <InputGroup>
                  <Form.Control
                    type="text"
                    style={{textTransform:"capitalize"}}
                    className="input"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Add new item"
                  />
                  <button
                    className="slide"
                    type="submit"
                    style={{fontSize:"500"}}
                  >
                    Add
                  </button>
                </InputGroup>
              </Form>
              <div>
                <Form.Group
                  style={{
                    textAlign:"center",
                    padding: "0.5rem 1rem 1rem 1rem",
                  }}
                >
                  <select
                    style={
                      filter === "false"
                        ? {                    
                            display: "inline",
                            width: "auto",
                            fontWeight:"500",
                            color: "#FFA107",
                          }
                        : filter === "true"
                        ? {
                            display: "inline",
                            width: "auto",
                            fontWeight:"500",
                            color: "#5FA054",
                          }
                        : {
                            display: "inline",
                            width: "auto",
                            fontWeight:"500",
                            color: "#303179",
                          }
                    }
                    className="form-select"
                    value={filter}
                    name="filter"
                    onChange={(e) => handleChange(e)}
                  >
                    <option style={{color:"#303179", fontWeight:"500"}} value="all">All</option>
                    <option style={{color:"#5FA054", fontWeight:"500"}} value="true">Packed</option>
                    <option style={{color:"#FFA107", fontWeight:"500"}} value="false">Unpacked</option>
                  </select>
                </Form.Group>
              </div>
              <Container>
                <Row>
                  {lists.map((list, index) => (
                    <Col key={index} md="4">
                      <Card style={{ margin: "0.5rem",textTransform:"capitalize"}}>
                        <Card.Body style={{ padding: "0.7rem" }}>
                          <div style={{alignItems: "center",display: "flex",fontSize: "18px",justifyContent: "space-between"}}>
                            <div style={{ textDecoration: list.isDone ? "line-through" : "", wordBreak: "break-all"}}>
                              {list.text}
                            </div>
                            <div class="list-btns" style={{ minWidth:"77px" }}>
                              <Button
                                onClick={() => editList(list, index)}
                                style={{ backgroundColor:"#fff", color: list.isDone ? "#5FA054" : "#FFA107", padding: "0.375rem 0.5rem"}}
                              >
                                {list.isDone ? 
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-clipboard-check-fill" viewBox="0 0 16 16">
                                    <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z"/>
                                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1Zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708Z"/>
                                  </svg> 
                                :
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
                                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                                  </svg>
                                }
                              </Button>{" "}
                              <Button
                                style={{fontWeight:"bold", color:"#A15447 ",padding: "0.375rem 0.5rem",backgroundColor:"#fff"}}
                                onClick={() => deleteList(list, index)}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                              </svg>
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
      <Footer />
    </div>
  );
}

export default DontForgetMe;
