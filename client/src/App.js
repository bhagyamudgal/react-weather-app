import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; //react-bootstrap css
import Layout from "./components/layout/Layout";
import "./App.css";
import {
  Container,
  Row,
  Col,
  FormControl,
  Button,
  InputGroup,
} from "react-bootstrap";

function App() {
  const locationRef = useRef("");
  const [location, setLocation] = useState("");
  const [forecast, setForecast] = useState("");
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);

  function searchHandler() {
    const location = locationRef.current.value;
    locationRef.current.value = "";
    setloading(true);
    fetch(`/weather?location=${location}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setLocation("");
          setForecast("");
          setError(data.error);
        } else {
          setError("");
          setLocation(data.location);
          setForecast(data.forecast);
        }
        setloading(false);
      });
  }
  function handleKeyPress(event) {
    if (event.key === "Enter") {
      searchHandler();
    }
  }

  return (
    <div className="App">
      <Layout>
        <Container className="my-3">
          <Row className="my-2 p-3">
            <Col>
              <h1>Welcome To React Weather App</h1>
            </Col>
          </Row>
          <Row className="my-2 p-3">
            <Col>
              <InputGroup className="mb-2">
                <FormControl
                  placeholder="Enter location to search"
                  aria-label="Enter location to search"
                  aria-describedby="basic-addon2"
                  ref={locationRef}
                  onKeyPress={handleKeyPress}
                />
                <Button
                  variant="outline-primary"
                  id="button-addon2"
                  onClick={searchHandler}
                >
                  Search
                </Button>
              </InputGroup>
            </Col>
          </Row>
          <Row className="my-2 p-3">
            <Col className="text-left">
              <h2 className="mb-3">Weather Forecast:</h2>
              {loading ? (
                <h3 className="text-center my-5">Loading...</h3>
              ) : (
                <>
                  <h3 className="text-primary">{location}</h3>
                  <h4 className="text-success">{forecast}</h4>
                  <h4 className="text-danger">{error}</h4>
                </>
              )}
            </Col>
          </Row>
        </Container>
      </Layout>
    </div>
  );
}

export default App;
