import React from "react";
import { Link } from "react-router-dom";
// import ReactCardCarousel from "react-card-carousel";
import { Container, Image, Row } from "react-bootstrap";
import { ReactComponent as MyList } from "../../assets/list.svg";
import { ReactComponent as Trips } from "../../assets/trips.svg";
import { ReactComponent as Expense } from "../../assets/et.svg";

function Features() {
  // const CONTAINER_STYLE = {
  //   position: "relative",
  //   height: "38vh",
  //   width: "100%",
  //   display: "flex",
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "middle",
  // };

  // const CARD_STYLE = {
  //   height: "250px",
  //   width: "600px",
  //   paddingTop: "50px",
  //   textAlign: "center",
  //   borderRadius: "0.8rem",
  //   background: "#98c1d9",
  //   fontSize: "20px",
  // };
  const width = window.innerWidth;
  const FeaturesComponent = () => {
    if (width < 768) {
      return (
        <div className="row">
          <div className="col-lg-4 my-1">
            <div
              style={{
                border: "1px solid rgba(0,0,0,0.5)",
                borderRadius: "0.8rem",
                backgroundColor: "#98c1d9",
              }}
            >
              <div
                style={{
                  fontSize: "1.8rem",
                  fontWeight: "400",
                  margin: "1.5rem 1.5rem 0rem 1.5rem",
                }}
              >
                <Link
                  to="/list"
                  className="btn btn-primary"
                  style={{
                    fontSize: "1.3rem",
                    textDecoration: "none",
                    color: "#333",
                    background: "#b7e4c7",
                    borderRadius: "2rem",
                  }}
                >
                  Dont forget me!
                </Link>
              </div>
              <p style={{ padding: "1rem", fontSize: "1.1rem" }}>
                Ok, so it sounds a little boring, but making lists are the
                gateway to a a stress-free holiday. So what are you waiting for?
                Note down your essentials!
              </p>
            </div>
          </div>
          <div className="col-lg-4 my-1">
            <div
              style={{
                border: "1px solid rgba(0,0,0,0.5)",
                borderRadius: "0.8rem",
                backgroundColor: "#98c1d9",
              }}
            >
              <div
                style={{
                  fontSize: "1.8rem",
                  fontWeight: "400",
                  margin: "1.5rem 1.5rem 0rem 1.5rem",
                }}
              >
                {" "}
                <Link
                  to="/trips"
                  className="btn btn-primary"
                  style={{
                    fontSize: "1.3rem",
                    textDecoration: "none",
                    color: "#333",
                    background: "#b7e4c7",
                    borderRadius: "2rem",
                  }}
                >
                  Add your travel details systematically!
                </Link>
              </div>
              <p style={{ padding: "1rem", fontSize: "1.1rem" }}>
                Track all your past trips and add/update your present ones. Save
                all your travel experiences, share it with others and keep
                travelling!
              </p>
            </div>
          </div>
          <div className="col-lg-4 my-1">
            <div
              style={{
                border: "1px solid rgba(0,0,0,0.5)",
                borderRadius: "0.8rem",
                backgroundColor: "#98c1d9",
              }}
            >
              <div
                style={{
                  fontSize: "1.8rem",
                  fontWeight: "400",
                  margin: "1.5rem 1.5rem 0rem 1.5rem",
                }}
              >
                {" "}
                <Link
                  to="/expensetracker"
                  className="btn btn-primary"
                  style={{
                    fontSize: "1.3rem",
                    textDecoration: "none",
                    color: "#333",
                    background: "#b7e4c7",
                    borderRadius: "2rem",
                  }}
                >
                  Track your expenses!
                </Link>
              </div>
              <p style={{ padding: "1rem", fontSize: "1.1rem" }}>
                Going on a business trip? Keep a track of how much you earn!
                Going on a trip for leisure? Keep a track of where and how much
                you spend! Track your expenses here!
              </p>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Container>
            <Row>
              <div class="col-md-6 order-2">
                <Link
                  to="/list"
                  className="btn btn-primary"
                  style={{
                    fontSize: "1.3rem",
                    textDecoration: "none",
                    color: "#333",
                    background: "#b7e4c7",
                    borderRadius: "2rem",
                  }}
                >
                  Dont forget me!
                </Link>
                <p style={{ padding: "1rem", fontSize: "1.1rem" }}>
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
              <div class="col-md-6 order-1">
                <MyList />
              </div>
            </Row>
            <Row>
              <div class="col-md-6 order-2">
              <Link
                to="/trips"
                className="btn btn-primary"
                style={{
                  fontSize: "1.3rem",
                  textDecoration: "none",
                  color: "#333",
                  background: "#b7e4c7",
                  borderRadius: "2rem",
                }}
              >
                Add your travel details systematically!
              </Link>
                <Trips />
              </div>
              <div class="col-md-6 order-1">
                <p style={{ padding: "1rem", fontSize: "1.1rem" }}>
                  Track all your past trips and add/update your present ones.
                  Save all your travel experiences, share it with others and
                  keep travelling!
                </p>
              </div>
            </Row>
            <Row>
              <div class="col-md-6 order-2">
              <Link
                to="/expensetracker"
                className="btn btn-primary"
                style={{
                  fontSize: "1.3rem",
                  textDecoration: "none",
                  color: "#333",
                  background: "#b7e4c7",
                  borderRadius: "2rem",
                }}
              >
                Track your expenses!
              </Link>
                <p style={{ padding: "1rem", fontSize: "1.1rem" }}>
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
              <div class="col-md-6 order-1">
                <Expense />
              </div>
            </Row>
          </Container>
        </div>
        // <div>
        //     <div>
        //       <Link
        //         to="/list"
        //         className="btn btn-primary"
        //         style={{
        //           fontSize: "1.3rem",
        //           textDecoration: "none",
        //           color: "#333",
        //           background: "#b7e4c7",
        //           borderRadius: "2rem",
        //         }}
        //       >
        //         Dont forget me!
        //       </Link>
        //       <p style={{ padding: "1rem", fontSize: "1.1rem" }}>
        //       Ok, so it sounds a little boring, but making lists are the
        //         gateway to a a stress-free holiday. Imagine going on a trip and forgetting your tickets. 
        //         Uff, I bet everyone has experienced something of this sort in their life. But now you won't. 
        //         Simply add the items to the Don't Forget Me List and ta-daa you will never miss out your essentials during travel. 
        //         Once packed, you can also modify the items as "packed" so at the end of the day you know what is left to be packed and what is already packed.  
        //         So what are you waiting for?
        //         Note down your essentials!
        //       </p>
        //     </div>
        //     <div>
        //       <Link
        //         to="/trips"
        //         className="btn btn-primary"
        //         style={{
        //           fontSize: "1.3rem",
        //           textDecoration: "none",
        //           color: "#333",
        //           background: "#b7e4c7",
        //           borderRadius: "2rem",
        //         }}
        //       >
        //         Add your travel details systematically!
        //       </Link>
        //       <p style={{ padding: "1rem", fontSize: "1.1rem" }}>
        //         Track all your past trips and add/update your present ones. Save
        //         all your travel experiences, share it with others and keep
        //         travelling!
        //       </p>
        //     </div>
        //     <div>
        //       <Link
        //         to="/expensetracker"
        //         className="btn btn-primary"
        //         style={{
        //           fontSize: "1.3rem",
        //           textDecoration: "none",
        //           color: "#333",
        //           background: "#b7e4c7",
        //           borderRadius: "2rem",
        //         }}
        //       >
        //         Track your expenses!
        //       </Link>
        //       <p style={{ padding: "1rem", fontSize: "1.1rem" }}>
        //         Going on a trip for leisure? Oo yes then definitely you will be spending a lot of money
        //         on stay, travelling, shopping and much more..
        //         Find it difficult to keep a track of where and how much
        //         you spend? No worries! We have got you covered. Track all your expenses small or big here! Simply add your expense type, amount or any extra text
        //         and it will show you the total expenses which would help you understand the amount you spend on a particular trip and
        //         hence adjust your future trips based on the current one. 
        //       </p>
        //     </div>
        // </div> 
      );
    }
  };

  return (
    <div style={{ paddingBottom: "2rem" }}>
      <div
        className=""
        style={{
          textAlign: "center",
          padding: " 0rem 1.5rem",
          margin: "0rem 1rem",
        }}
      >
        <h1 style={{ padding: "1rem", color: "#141850", marginBottom: "0rem" }}>
          Features
        </h1>
        <FeaturesComponent />
      </div>
    </div>
  );
}

export default Features;
