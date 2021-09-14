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
            background: "linear-gradient(0deg, hsla(152, 41%, 52%, 1) 0%, hsla(153, 40%, 30%, 1) 100%)",
          }}
        >
          <div>
            <div style={{ textAlign: "center" }}>
              <span
                className="text-center"
                style={{
                  color: "#deaaff",
                  fontWeight: "700",
                  fontSize: "2rem",
                }}
              >
                Expense Tracker
              </span>
            </div>
            <div>
              <div
                className="text-center "
                style={{
                  backgroundColor: "#efc3e6",
                  borderRadius: "1.5rem",
                  padding: "0.5rem",
                  margin: "1rem 3rem 0rem 3rem",
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
            <div style={{margin: "3rem 1rem 1rem 1rem"}}>
              <h3
                style={{
                  textAlign: "center",
                  color:"#deaaff"
                }}
              >
                Add transaction
              </h3>
              <Form className="input-form"
                style={{ marginTop: "0rem",marginBottom: "0rem" }}
                onSubmit={handleSubmit}
              >
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group>
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
                    <Form.Group>
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
                        margin: "1rem",
                        border: "1px solid #7400b8",
                        backgroundColor: "#9c89b8",
                        color: "#000",
                        borderRadius: "1.5rem",
                        fontSize: "18px",
                        fontWeight: "600",
                      }}
                    >
                      Add Transaction
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
            <div style={{ textAlign: "center", padding: "0rem 3rem",marginTop:"3rem" }}>
              <h3 style={{ padding: "0rem 1rem 1rem 1rem", textAlign: "center", color:"#deaaff" }}>Transactions</h3>
              <ExpenseHistory />
            </div>
            <br />
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
