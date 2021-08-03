import React from "react";
import Head from "./Head";
import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";

export default function TravelDetails() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <div>
      <Head />
      <div
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
              Add Travel Details
            </span>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label>Destination</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your destination"
                {...register("Destination", { required: true })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Start Date"
                {...register("Start Date", { required: true })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="End Date"
                {...register("End Date", { required: true })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Day</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter day as a number"
                {...register("Day", { required: true, max: 100, min: 1 })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Place</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter place"
                {...register("Place", { required: true })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Additional Details</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter other details if any"
                {...register("Additional Details")}
              />
            </Form.Group>
            <Button variant="primary mb-3" type="submit">
              Save details
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

/* <input type="date" placeholder="Start Date" {...register("Start Date", {required: true, maxLength: 100})} />
      <input type="date" placeholder="End Date" {...register("End Date", {required: true})} />
      <input type="number" placeholder="Day" {...register("Day", {required: true, max: 100, min: 1})} />
      <input type="text" placeholder="Place" {...register("Place", {required: true})} />
      <input type="text" placeholder="Additional Details" {...register("Additional Details", {required: true})} /> */

// function TravelDetails() {
//   const [destination, setDestination] = useState("");
//   const [details, setDetails] = useState("");
//   const [sdate,setSdate] =useState("");
//   const [edate,setEdate] =useState("");
//   const [day,setDay] =useState("");
//   const [place,setPlace] =useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(`Place: ${place}, Details: ${details}, SDate: ${sdate}, EDate: ${edate}`);
//   }

//   return (
//       <div>
//         <Head />
//         <div style={{padding: "1rem" , backgroundImage : `url("https://images.unsplash.com/photo-1604937455095-ef2fe3d46fcd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")`}}>
//         <div className="container">
//         <div style={{textAlign:"center"}}>
//         <span className="text-center mb-4" style={{backgroundColor:"rgba(255,255,255,0.6)", fontWeight:"500", fontSize:"2rem",padding:"0.5rem",borderRadius:"1rem"}}>Add Travel Details</span>
//         </div>
//         <form method="POST" onSubmit={handleSubmit}>
//         <div className="mb-3">
//             <label className="form-label">Destination</label>
//             <input type="text" className="form-control" name="destination" value={destination} onChange={(e) => setDestination(e.target.value)} required />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Start date</label>
//             <input type="date" className="form-control" name="sdate" value={sdate} onChange={(e) => setSdate(e.target.value)} required />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">End date</label>
//             <input type="date" className="form-control" name="edate" value={edate} onChange={(e) => setEdate(e.target.value)} required />
//           </div>
//           <div className="row g-3">
//           <div className="col-lg-6">
//             <label className="form-label">Day</label>
//             <input type="number" className="form-control" name="day" value={day} onChange={(e) => setDay(e.target.value)} required />
//           </div>
//           <div className="col-lg-6">
//             <label className="form-label">Place</label>
//             <input type="text" className="form-control" name="place" value={place} onChange={(e) => setPlace(e.target.value)} required />
//           </div>
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Additional details</label>
//             <input type="text" className="form-control" id="details" name="details" value={details} onChange={(e) => setDetails(e.target.value)} />
//           </div>
//           <button type="submit" className="btn btn-primary">Save details</button>
//         </form>
//         </div>
//         </div>
//       </div>

//   );
// }

// export default TravelDetails;
