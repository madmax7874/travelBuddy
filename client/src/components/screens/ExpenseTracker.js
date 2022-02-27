import React, { Fragment, useEffect, useState } from "react";
import { Button, Form, Table, InputGroup, Container } from "react-bootstrap";
import { FadeLoader } from "react-spinners";
import { useAlert } from "react-alert";

import Head from "./Head";
import Footer from "./Footer";

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
  console.log(total)

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
      <tr key={index} index={index} >
        <td>{expense.text}</td>
        <td>
        <div className="row">
            <div className="col">
            ₹{expense.amount}
            </div>
            <div className="col">
              <Button
                style={{fontWeight:"bold", color:"#A15447 ",padding: "0.375rem 0.5rem",backgroundColor: "inherit"}}
                onClick={() => {deleteExpense(expense, index)}}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
              </svg>
              </Button>
            </div>
          </div>
        </td>
        <td>
          <Button
            style={{fontWeight:"bold", color:"#A15447 ",padding: "0.375rem 0.5rem",backgroundColor: "inherit"}}
            onClick={() => {deleteExpense(expense, index)}}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
          </svg>
          </Button>
        </td>
      </tr>
    );
  });

  const ExpenseHistory = () => {
    if (expenseHistory.length === 0) {
      return <h6 style={{ textAlign: "center", padding: "0.5rem" }}>No expenses added</h6>
    } else {
      return (
        <Fragment>
          <Table style={{ border: "none", textTransform:"capitalize" }} bordered hover>
            <thead style={{color:"#303179"}}>
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
        </Fragment>
      );
    }
  };

  useEffect(() => {}, [value]);
  return (
    <Fragment>
      <Head />
      {loading ? (
        <div style={{paddingTop: "1rem"}}>
          <Container>
            <div style={{ textAlign: "center" }}>
              <span className="text-center mb-4" style={{fontWeight: "600",fontSize: "2rem",color: "#5FA054"}} >Expense Tracker</span>
            </div>
            <Form style={{ margin: "1rem 0.2rem" }} onSubmit={handleSubmit}>
              <Form.Label
                style={{
                  marginBottom: "0.5rem",
                  fontWeight: "600",
                  fontSize: "1.2rem",
                }}
              >
                Add a Transaction
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  name="text"
                  style={{textTransform:"capitalize"}}
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
            <div style={{textAlign: "center", padding: "1rem"}} >
              <h3 style={{padding: "1rem", textAlign: "center"}}>
                My Transactions
              </h3>
              <ExpenseHistory />
            </div>
            <br />
          </Container>
          <Footer />
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
    </Fragment>
  );
}

export default ExpenseTracker;
