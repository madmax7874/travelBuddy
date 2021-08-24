import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import Head from "./Head";

import "../styles/ExpenseTracker.css";
const axios = require("axios");
const Swal = require("sweetalert2");

function ToPack({ topack, index, removeTopack }) {
  return (
    <div className="topack">
      <div
        style={{
          backgroundColor: "#fff",
          color: "#333",
          display: "flex",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        {topack.text} <span> ₹{topack.amount}</span>
        <Button onClick={() => removeTopack(index)} className="delete-btn">
          ✕
        </Button>
      </div>
    </div>
  );
}

function ExpenseTracker(props) {
  const [expenseHistory, setExpenseHistory] = useState([]);
  const [value, setValue] = React.useState({
    text: "",
    amount: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const url = `/api/private/expensetracker`;
      try {
        const { data } = await axios.get(url, config);
        setExpenseHistory(data);
      } catch (error) {
        console.log(error.response.data.error);
      }
    };
    fetchData();
  }, []);

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
      const url = `/api/private/expensetracker`;
      const response = await axios.post(url, value, config);
      if (response.data) {
        Swal.fire(
          "Expense added!",
          "Information saved successfully",
          "success"
        );
        setValue({
          text: "",
          amount: "",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeTopack = async (index) => {
    const newTopacks = [...expenseHistory];
    newTopacks.splice(index, 1);
    setExpenseHistory(newTopacks);
    const url = `/api/private/deleteexpense`;
    const response = await axios.post(url, newTopacks);
    if (response.data) {
      Swal.fire(
        "Record deleted!",
        "Information updated successfully",
        "success"
      );
    }
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
              Expense Tracker
            </span>
          </div>
          <h3 style={{ padding: "1rem" }}>History</h3>
          <div>
            {expenseHistory.map((topack, index) => {
              return (
                <div key={index}>
                  <Card style={{ margin: "0.5rem" }}>
                    <Card.Body style={{ padding: "0.7rem" }}>
                      <ToPack
                        key={index}
                        index={index}
                        topack={topack}
                        removeTopack={removeTopack}
                      />
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </div>
          <Form className="input-form" onSubmit={handleSubmit}>
              <h3 style={{ padding: "1rem" }}>Add transaction</h3>
              <Form.Group style={{ paddingTop: "1rem" }}>
                <Form.Label style={{ marginBottom: "1rem",fontWeight: "600", fontSize: "0.9rem" }}>Text</Form.Label>
                <Form.Control
                  type="text"
                  name="text"
                  className="input"
                  value={value.text}
                  onChange={handleChange}
                  placeholder="Enter text"
                />
              </Form.Group>
              <Form.Group style={{ paddingTop: "1rem" }}>
                <Form.Label style={{ marginBottom: "1rem",fontWeight: "600", fontSize: "0.9rem" }}>Amount</Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  className="input"
                  value={value.amount}
                  onChange={handleChange}
                  placeholder="Enter amount"
                  required={true}
                />
              </Form.Group>

            <Button variant="primary mb-3" type="submit" style={{margin: "30px 0 30px"}}>
              Add Transaction
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ExpenseTracker;
