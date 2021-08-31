import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Table } from "react-bootstrap";
import Head from "./Head";
import { FadeLoader } from "react-spinners";
import { useAlert } from "react-alert";
import "bootstrap/dist/css/bootstrap.min.css";

const axios = require("axios");
const Swal = require("sweetalert2");

function ExpenseTracker() {
  const alert = useAlert();
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
        setLoading(true);
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
        alert.show(
          "Expense added!",
          { type: "success" }
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
    const newExpense = [...expenseHistory];
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    const url = `/api/private/deleteexpense`;
    const response = await axios.post(url, newExpense, config);
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
        newExpense.splice(index, 1);
        setExpenseHistory(newExpense);
        if (response.data) {
          alert.show("Item Deleted",{ type: "success" });
        }
      }
    });
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
            onClick={() => {
              deleteExpense(index);
            }}
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
      {loading ? (
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
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: "#c9f2c7" }}>
              <h3 style={{ padding: "1rem", textAlign: "center" }}>History</h3>
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
      ) : (
        <div style={{ textAlign: "center", paddingTop: "200px" }}>
          <FadeLoader
            color="#80b918"
            height={15}
            width={5}
            radius={2}
            margin={2}
          />
        </div>
      )}
    </div>
  );
}

export default ExpenseTracker;
