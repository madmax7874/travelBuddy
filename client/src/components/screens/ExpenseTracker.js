import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Table, InputGroup, Container } from "react-bootstrap";
import { FadeLoader } from "react-spinners";
import { useAlert } from "react-alert";

import Head from "./Head";
import "./buttonslider.scss";

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
      const url = `/api/private/expensetracker/1`;
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
      const url = `/api/private/expensetracker/1`;
      const { data } = await axios.post(url, value, config);
      if (data.success) {
        setExpenseHistory([...expenseHistory, data.expense]);
        alert.show("Expense added!", { type: "success" });
        setValue({
          text: "",
          amount: "",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteExpense = async (expense, index) => {
    console.log(expense);
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
        const url = `/api/private/expensetracker/${expense._id}`;
        const { data } = await axios.delete(url, config);
        if (data.success) {
          const newExpense = [...expenseHistory];
          newExpense.splice(index, 1);
          setExpenseHistory(newExpense);
          alert.show("Expense Deleted", { type: "success" });
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
            style={{ color: "#c0392b", fontWeight: "600" }}
            to="#"
            onClick={() => {
              deleteExpense(expense, index);
            }}
          >
            Delete
          </Link>
        </td>
      </tr>
    );
  });

  const ExpenseHistory = () => {
    if (expenseHistory.length === 0) {
      return (
        <h6 style={{ textAlign: "center", padding: "0.5rem" }}>
          No expenses added
        </h6>
      );
    } else {
      return (
        <div>
          <Table style={{ border: "none" }} striped bordered hover>
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
      );
    }
  };

  useEffect(() => {}, [value]);
  return (
    <div>
      <Head />
      {loading ? (
        <div
          style={{
            paddingTop: "1rem",
          }}
        >
          <Container>
            <div style={{ textAlign: "center" }}>
              <span
                className="text-center mb-4"
                style={{
                  fontWeight: "600",
                  fontSize: "2rem",
                  color: "#5FA054",
                }}
              >
                Expense Tracker
              </span>
            </div>
            <Form style={{ margin: "1rem 0.2rem" }} onSubmit={handleSubmit}>
              <Form.Label
                style={{
                  marginBottom: "1rem",
                  fontWeight: "600",
                  fontSize: "1.2rem",
                }}
              >
                Add Transaction
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  name="text"
                  className="input"
                  value={value.text}
                  onChange={handleChange}
                  placeholder="Enter text"
                />
                <Form.Control
                  type="number"
                  name="amount"
                  className="input"
                  value={value.amount}
                  onChange={handleChange}
                  placeholder="Enter amount"
                  required={true}
                />
                <button
                  className="slide"
                  type="submit"
                  style={{ fontSize: "500" }}
                >
                  Add
                </button>
              </InputGroup>
            </Form>
            <div
              style={{
                textAlign: "center",
                padding: "0rem 3rem",
                marginTop: "3rem",
              }}
            >
              <h3
                style={{
                  padding: "0rem 1rem 1rem 1rem",
                  textAlign: "center",
                  color: "#deaaff",
                }}
              >
                Transactions
              </h3>
              <ExpenseHistory />
            </div>
            <br />
          </Container>
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
