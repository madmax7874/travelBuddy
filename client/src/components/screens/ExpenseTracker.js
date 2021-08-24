import React, { createContext, useReducer, useContext, useState,useEffect } from "react";
import "../styles/ExpenseTracker.css";
import Head from "./Head";
import axios from "axios";
import Swal from 'sweetalert2'

import { Button, Form } from "react-bootstrap";
 
const Header = () => {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
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
  );
};

const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map((transaction) => transaction.amount);

  const expense =
    amounts.filter((item) => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Total Expenses</h4>
        <p className="money minus">₹{expense}</p>
      </div>
    </div>
  );
};

const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);

  return (
    <li className="minus">
      {transaction.text}{" "}
      <span>
      ₹{Math.abs(transaction.amount)}
      </span>
      <button
        onClick={() => deleteTransaction(transaction.id)}
        className="delete-btn"
      >
        ✕
      </button>
    </li>
  );
};

const TransactionList = () => {
  const { transactions } = useContext(GlobalContext);

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </>
  );
};

const AddTransaction = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  const { addTransaction } = useContext(GlobalContext);

    const sendData = async (text,amount) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      const { data } = await axios.post("/api/private/expensetracker",{text,amount}, config);
      if(data){
        Swal.fire(
          'Expense added!',
          'Information saved successfully',
          'success'
        )
      }
    } catch (error) {
      console.log("err")
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amount,
    };

    addTransaction(newTransaction);

    if (!amount) 
    return;
    sendData(text,amount)
    setText("")
    setAmount("");
  };

  return (
    <>
    <h3>Add new transaction</h3>
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label style={{ marginBottom: "1rem", fontWeight: "600", fontSize: "0.9rem" }}>
        Text
        </Form.Label>
        <Form.Control
          type="text"
          className="input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label style={{ marginBottom: "1rem", fontWeight: "600", fontSize: "0.9rem" }}>
        Amount (in ₹)
        </Form.Label>
        <Form.Control
          type="number"
          className="input"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          required= {true}
        />
      </Form.Group>
      <Button variant="primary mb-3" type="submit">
        Add transaction
      </Button>
    </Form>
    </>
  );
};

function AppReducer(state, action) {
  switch (action.type) {
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload
        ),
      };
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    default:
      return state;
  }
}

// Initial state
const initialState = {
  transactions: [],
};

// Create context
const GlobalContext = createContext(initialState);

// Provider component
const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function deleteTransaction(id) {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  }

  function addTransaction(transaction) {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

function ExpenseTracker() {
  const [topacks, setTopacks] = useState([]);

  const fetchPrivateData = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      const { data } = await axios.get("/api/private/expensetracker", config);
      console.log(data)
      setTopacks(data)
    } catch (error) {
      console.log(error)
      // localStorage.removeItem("authToken");
    }
  };

  useEffect(() => {
    fetchPrivateData();
  }, []);

  return (
    <GlobalProvider>
      <div
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1604937455095-ef2fe3d46fcd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")`,
        }}
      >
        <Head />
        <Header />
        <div className="container">
          <IncomeExpenses />
          <TransactionList />
          <AddTransaction />
        </div>
      </div>
    </GlobalProvider>
  );
}

export default ExpenseTracker;
