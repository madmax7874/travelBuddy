import React from "react";
import { Button, Card, Form } from 'react-bootstrap';
import { Container, Row, Col} from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';


function ToPack({ topack, index, markTopack, removeTopack }) {
  return (
    <div
      className="topack" style={{alignItems: "center",display: "flex",fontSize: "18px",justifyContent: "space-between"}}
      
    >
      <span style={{ textDecoration: topack.isDone ? "line-through" : "" }}>{topack.text}</span>
      <div>
        <Button variant="outline-success" onClick={() => markTopack(index)}>✓</Button>{' '}
        <Button variant="outline-danger" onClick={() => removeTopack(index)}>✕</Button>
      </div>
    </div>
  );
}

function FormTopack({ addTopack }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTopack(value);
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}> 
    <Form.Group>
      <Form.Label><b>Add Items</b></Form.Label>
      <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Add new item" />
    </Form.Group>
    <Button variant="primary mb-3" type="submit">
      Add
    </Button>
  </Form>
  );
}

function DontForgetMe() {
  const [topacks, setTopacks] = React.useState([
    {
      text: "Tickets",
      isDone: false,
    }
  ]);

  const addTopack = text => {
    const newTopacks = [...topacks, { text }];
    setTopacks(newTopacks);
  };

  const markTopack = index => {
    const newTopacks = [...topacks];
    newTopacks[index].isDone = true;
    setTopacks(newTopacks);
  };

  const removeTopack = index => {
    const newTopacks = [...topacks];
    newTopacks.splice(index, 1);
    setTopacks(newTopacks);
  };

  return (
    <div className="app" style={{padding: "1rem",backgroundImage: `url("https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZG9udCUyMGZvcmdldCUyMG1lJTIwZHVyaW5nJTIwdHJhdmVsJTIwYmFja2dyb3VuZCUyMGltYWdlc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60")`}}>
      <div className="container">
        <h1 className="text-center mb-4">Dont Forget Me</h1>
        <FormTopack addTopack={addTopack} />
        
          {topacks.map((topack, index) => (
            <Container>
            <Row>
            <Col xs="4">
            <Card>
              <Card.Body style={{padding:"0.8rem"}}>
                <ToPack
                key={index}
                index={index}
                topack={topack}
                markTopack={markTopack}
                removeTopack={removeTopack}
                />
              </Card.Body>
            </Card>
            </Col>
          </Row>
        </Container>
          ))}
          
      </div>
    </div>
  );
}

export default DontForgetMe;