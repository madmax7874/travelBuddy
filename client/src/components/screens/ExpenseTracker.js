import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Table } from "react-bootstrap";
import Head from "./Head";
import { ClipLoader, PulseLoader } from "react-spinners";
import "bootstrap/dist/css/bootstrap.min.css";

const axios = require("axios");
const Swal = require("sweetalert2");

function ExpenseTracker() {
  const [expenseHistory, setExpenseHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = React.useState({
    text: "",
    amount: "",
  });
  const [total, setTotal] = useState();

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
        setLoading(true)
      } catch (error) {
        console.log(error.response.data.error);
      }
    };
    fetchData();
  }, [loading]);

  useEffect(() => {
    const totalExpense = () => {
      let myTotal = 0;
      expenseHistory.map((expense) => {
        return (myTotal += parseInt(expense.amount));
      });
      setTotal(myTotal);
    };
    totalExpense();
  }, [expenseHistory]);

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
        setExpenseHistory([...expenseHistory, value]);
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

  const deleteExpense = async (index) => {
    const newTopacks = [...expenseHistory];
    newTopacks.splice(index, 1);
    setExpenseHistory(newTopacks);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    const url = `/api/private/deleteexpense`;
    const response = await axios.post(url, newTopacks, config);
    if (response.data) {
      Swal.fire(
        "Record deleted!",
        "Information updated successfully",
        "success"
      );
    }
  };

  const expenseHistoryComponent = expenseHistory.map((expense, index) => {
    return (
      <tr key={index} index={index}>
        <td>{expense.text}</td>
        <td>₹{expense.amount}</td>
        <td>
          <Link
            style={{ color: "#9c89b8", fontWeight: "600" }}
            to="#"
            onClick={() => deleteExpense(index)}
          >
            Delete
          </Link>
        </td>
      </tr>
    );
  });

  useEffect(() => {}, [value]);
  return (
    <div>
      <Head />
      <div
        style={{
          paddingTop: "1rem",
          backgroundColor: "#aceca1",
        }}
      >
        <div>
          <div style={{ textAlign: "center" }}>
            <span
              className="text-center"
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
          <div>
            <div
              className="text-center m-4"
              style={{
                backgroundColor: "#efc3e6",
                borderRadius: "1.5rem",
                padding: "0.5rem",
              }}
            >
                <div>
                  <h4>Total Expenses</h4>
                  {loading? (
                    <p
                    style={{
                      color: "#c0392b",
                      fontWeight: "600",
                      fontSize: "1.5rem",
                      marginBottom: "0",
                    }}
                  >
                    ₹{total}
                  </p>
                  ): (
                    <p style={{ textAlign: "center" }}>
                    <ClipLoader
                      color="rgba(60, 53, 119,1)"
                      size={50}
                    />
                  </p>
                  )}
                </div>
            </div>
          </div>
          <div style={{ backgroundColor: "#c9f2c7" }}>
            <h3 style={{ padding: "1rem", textAlign: "center" }}>History</h3>
            {loading ? (
                <div style={{ paddingBottom: "0.2rem" }}>
                <Table style={{ textAlign: "center" }}>
                  <thead>
                    <tr style={{ fontSize: "1.2rem" }}>
                      <th>Text</th>
                      <th>Amount</th>
                      <th>Operation</th>
                    </tr>
                  </thead>
                  <tbody style={{ fontSize: "1.1rem" }}>
                    {expenseHistoryComponent}
                  </tbody>
                </Table>
              </div>
            ):(
              <div style={{ textAlign: "center" }}>
              <PulseLoader
                color="rgba(60, 53, 119,1)"
                size={15}
                margin={8}
              />
            </div>
          )}   
          </div>
          <Form
            style={{ marginBottom: "0" }}
            className="input-form"
            onSubmit={handleSubmit}
          >
            <div className="row">
              <h3
                style={{
                  padding: "0.5rem",
                  paddingTop: "0",
                  textAlign: "center",
                }}
              >
                Add transaction
              </h3>
              <div className="col-md-6">
                <Form.Group style={{ paddingTop: "1rem" }}>
                  <Form.Label
                    style={{
                      marginBottom: "1rem",
                      fontWeight: "600",
                      fontSize: "1.2rem",
                    }}
                  >
                    Text
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="text"
                    className="input"
                    value={value.text}
                    onChange={handleChange}
                    placeholder="Enter text"
                  />
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group style={{ paddingTop: "1rem" }}>
                  <Form.Label
                    style={{
                      marginBottom: "1rem",
                      fontWeight: "600",
                      fontSize: "1.2rem",
                    }}
                  >
                    Amount (in ₹)
                    <span style={{ color: "#d00000", fontSize: "1.3rem" }}>
                      *
                    </span>
                  </Form.Label>
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
              </div>

              <div style={{ textAlign: "center" }}>
                <Button
                  variant="primary"
                  type="submit"
                  style={{
                    margin: "2.5rem",
                    border: "1px solid #f896d8",
                    backgroundColor: "#9c89b8",
                    color: "#000",
                    borderRadius: "2rem",
                    fontSize: "18px",
                    fontWeight: "600",
                    width: "250px",
                  }}
                >
                  Add Transaction
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ExpenseTracker;
