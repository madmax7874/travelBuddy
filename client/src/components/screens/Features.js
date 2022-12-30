import React from "react";
import { Link } from "react-router-dom";
import { Container,Image, Row } from "react-bootstrap";
import list from "../../assets/list.svg";
import trips from "../../assets/trips.svg";
import et from "../../assets/et.svg";

function Features() {

  return (
    <div style={{textAlign: "center", padding: "0rem 1.5rem", backgroundColor:"#E5E5E5"}}>
      <h1 style={{ padding: "1rem", color: "#141850", marginBottom: "0rem" }}>Features</h1>
      <Container>
        <Row >
          <div className="col-md-6 order-1" style={{padding:"1rem 0.5rem"}}>
            <Image className="img-fluid" style={{ width: "100%", maxHeight:"320px"}}src={list}></Image>
          </div>
          <div className="col-md-6 order-2" style={{padding:"1rem 0.5rem",display:'flex',flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <Link
              to="/list"
              style={{
                fontSize: "1.5rem",
                textDecoration: "none",
                color: "#141850",
              }}
            >
              Dont forget me!
            </Link>
            <p style={{ padding: "1rem", fontSize: "1rem",textAlign:"justify" }}>
              Ok, so it sounds a little boring, but making lists are the
              gateway to a a stress-free holiday. Imagine going on a trip
              and forgetting your tickets. Uff, I bet everyone has
              experienced something of this sort in their life. But now you
              won't. Simply add the items to the Don't Forget Me List and
              ta-daa you will never miss out your essentials during travel.
              Once packed, you can also modify the items as "packed" so at
              the end of the day you know what is left to be packed and what
              is already packed. So what are you waiting for? Note down your
              essentials!
            </p>
          </div>
        </Row>
        <hr/>
        <Row>
          <div className="col-md-6 order-2 order-md-1" style={{padding:"1rem 0.5rem",display:'flex',flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <Link
              to="/trips"
              style={{
                fontSize: "1.5rem",
                textDecoration: "none",
                color: "#141850",
              }}
            >
              Add your travel details systematically!
            </Link>
            <p style={{ padding: "1rem", fontSize: "1rem",textAlign:"justify" }}>
              Track all your past trips and add/update your present ones.
              Save all your travel experiences, share it with others and
              keep travelling!
            </p>
          </div>
          <div className="col-md-6 order-1 order-md-2" style={{padding:"1rem 0.5rem"}}>
            <Image className="img-fluid" style={{ width: "100%",  maxHeight:"300px"}}src={trips}></Image>
          </div>
        </Row>
        <hr/>
        <Row>
          <div className="col-md-6 order-1" style={{padding:"1rem 0.5rem"}}>
            <Image className="img-fluid" style={{ width: "100%", maxHeight:"400px"}}src={et}></Image>
          </div>
          <div className="col-md-6 order-2" style={{padding:"1rem 0.5rem",display:'flex',flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <Link
              to="/expensetracker"
              style={{
                fontSize: "1.5rem",
                textDecoration: "none",
                color: "#141850",
              }}
            >
              Track your expenses!
            </Link>
            <p style={{ padding: "1rem", fontSize: "1rem",textAlign:"justify" }}>
              Going on a trip for leisure? Oo yes then definitely you will
              be spending a lot of money on stay, travelling, shopping and
              much more.. Find it difficult to keep a track of where and how
              much you spend? No worries! We have got you covered. Track all
              your expenses small or big here! Simply add your expense type,
              amount or any extra text and it will show you the total
              expenses which would help you understand the amount you spend
              on a particular trip and hence adjust your future trips based
              on the current one.
            </p>
          </div>
        </Row>
      </Container>      
    </div>
  );
}

export default Features;
