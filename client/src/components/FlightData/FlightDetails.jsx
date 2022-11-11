import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import AddFlightDetails from "./AddFlightDetails";
import { Table, Button, Link } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.css";
import AddFlightData from "./AddFlightDetails";
import Arrivals from "./Arrivals";
import Departures from "./Departures";
import GeneralUsers from "./GeneralUsers";
const FlightDetailsTable = () => {
  const [Flights, setFlightDetails] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredFlights, setFilteredFlights] = useState([]);

  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [UpdateAirline, setUpdateAirline] = useState("");
  const [UpdateArrivinFrom, setUpdateArrivinFrom] = useState("");
  const [UpdateFlightType, setUpdateFlightType] = useState("");
  const [UpdateTime, setUpdateTime] = useState("");
  const [UpdateTerminal, setUpdateTerminal] = useState("");
  const [UpdateGate, setUpdateGate] = useState("");
  const [UpdateBagClaim, setUpdateBagClaim] = useState("");
  const [UpdateAction, setUpdateAction] = useState("");
  const [UpdateAirline_ID, setUpdateID] = useState("");

  const [getArrivals, setGetArrivals] = useState("");

  useEffect(() => {}, [show]);

  const refreshPage = () => {
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const obj = {
      UpdateAirline_ID,
      UpdateAirline,
      UpdateArrivinFrom,
      UpdateFlightType,
      UpdateTime,
      UpdateGate,
      UpdateTerminal,
      UpdateBagClaim,
      UpdateAction,
    };
    console.log("Update data : ", obj);
    try {
      const url =
        "http://localhost:8080/api/flights/update/" + obj.UpdateAirline_ID;
      const { data: res } = axios.post(url, obj);
      console.log("From handle Data :", res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
    handleClose();
  };

  const getFlightDetails = async (req, res) => {
    try {
      const response = await axios.get("http://localhost:8080/api/flights");
      console.log("Getting data from flights api", response.data[0]);
      setFlightDetails(response.data);
      setFilteredFlights(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    try {
      const IDToBeUpdated = e.target.value;
      console.log("IDToBeUpdated : ", IDToBeUpdated);
      const url = "http://localhost:8080/api/flights/update/" + IDToBeUpdated;
      const DataToBeUpdated = await axios.get(url);
      if (DataToBeUpdated) {
        console.log("Data to be updated", DataToBeUpdated.data.airline);
        setUpdateID(IDToBeUpdated);
        setUpdateAirline(DataToBeUpdated.data.airline);
        setUpdateArrivinFrom(DataToBeUpdated.data.arriving_from);
        setUpdateFlightType(DataToBeUpdated.data.flight_type);
        setUpdateTime(DataToBeUpdated.data.time);
        setUpdateTerminal(DataToBeUpdated.data.terminal);
        setUpdateGate(DataToBeUpdated.data.gate);
        setUpdateBagClaim(DataToBeUpdated.data.bag_claim);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleArrivals = () => {
    console.log("from handleArrivals");
  };

  const handleDepartures = () => {
    console.log("from handleDepartures");
  };

  const handleDeleteFlight = async (e) => {
    const IDToBeDeleted = e.target.value;
    console.log("IDToBeDeleted : ", IDToBeDeleted);
    try {
      const response = await axios.delete(
        "http://localhost:8080/api/flights?id=" + IDToBeDeleted
      );
      if (response) {
        console.log("Success");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getFlightDetails();
  }, []);

  useEffect(() => {
    const result = Flights.filter((country) => {
      return country.name.toLowerCase().match(search.toLocaleLowerCase());
    });

    setFilteredFlights(result);
  }, [search]);

  return (
    <div>
      <span
        style={{
          display: "flex",
        }}
      >
        <span>
          <label style={{ marginRight: "10px" }}>Arrivals</label>
          <input
            type="radio"
            name="arrivals"
            value={getArrivals}
            onClick={() => setGetArrivals("arrivals")}
            checked={getArrivals == "arrivals"}
            onChange={handleArrivals}
          />
        </span>
        <span style={{ marginLeft: "10px" }}>
          <label style={{ marginRight: "10px" }}>Departures</label>
          <input
            type="radio"
            name="departures"
            value={getArrivals}
            onClick={() => setGetArrivals("departures")}
            onChange={handleDepartures}
            checked={getArrivals == "departures"}
          />
        </span>
      </span>

      {getArrivals == "departures" ? <Departures /> : <GeneralUsers />}
      {
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Flight Details</Modal.Title>
          </Modal.Header>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
              refreshPage();
            }}
          >
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Airline</Form.Label>
                  <Form.Control
                    name="UpdateAirline_ID"
                    type="string"
                    hidden="true"
                    value={UpdateAirline_ID}
                    className="mb-3"
                    onChange={(e) => setUpdateID(e.target.value)}
                    autoFocus
                  />

                  <Form.Control
                    name="airline"
                    value={UpdateAirline}
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                    type="string"
                    onChange={(e) => setUpdateAirline(e.target.value)}
                    autoFocus
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Arriving From/ Departing To</Form.Label>
                  <Form.Control
                    name="arriving_from"
                    value={UpdateArrivinFrom}
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                    type="string"
                    onChange={(e) => setUpdateArrivinFrom(e.target.value)}
                    autoFocus
                  />
                  <span
                    style={{
                      display: "flex",
                    }}
                  >
                    <label style={{ marginRight: "10px" }}>Flight Type: </label>
                    <span>
                      <label style={{ marginRight: "10px" }}>Arriving</label>
                      <input
                        type="radio"
                        name="arriving"
                        checked={UpdateFlightType === "arriving"}
                        value={UpdateFlightType}
                        onClick={() => setUpdateFlightType("arriving")}
                      />
                    </span>
                    <span style={{ marginLeft: "10px" }}>
                      <label style={{ marginRight: "10px" }}>Departing</label>
                      <input
                        type="radio"
                        name="departing"
                        checked={UpdateFlightType === "departing"}
                        value={UpdateFlightType}
                        onClick={() => setUpdateFlightType("departing")}
                      />
                    </span>
                  </span>
                </Form.Group>
                <label>Time</label>
                <br />
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    name="time"
                    value={UpdateTime}
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                    type="string"
                    autoFocus
                    onChange={(e) => setUpdateTime(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Terminal</Form.Label>

                  <select
                    name="terminal"
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                    onChange={(e) => setUpdateTerminal(e.target.value)}
                    value={UpdateTerminal}
                  >
                    <option>Select Terminal</option>
                    {<option label="T1" value="T1"></option>}
                    {<option label="T2" value="T2"></option>}
                    {<option label="T3" value="T3"></option>}
                  </select>

                  {/* <p>Terminal : {data.Terminal}</p> */}
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Gate</Form.Label>
                  <Form.Control
                    name="gate"
                    value={UpdateGate}
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                    type="string"
                    onChange={(e) => setUpdateGate(e.target.value)}
                    autoFocus
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Baggae Claim</Form.Label>
                  <Form.Control
                    name="bag_claim"
                    value={UpdateBagClaim}
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                    type="string"
                    onChange={(e) => setUpdateBagClaim(e.target.value)}
                    autoFocus
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Action</Form.Label>
                  <Form.Control
                    className="mb-3"
                    name="action"
                    value={UpdateAction}
                    controlId="exampleForm.ControlInput1"
                    type="email"
                    onChange={(e) => setUpdateAction(e.target.value)}
                    autoFocus
                  />
                </Form.Group>
              </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <button type="submit" variant="primary">
                Update
              </button>
            </Modal.Footer>
          </form>
        </Modal>
      }
      {
        <Table responsive>
          <thead>
            <AddFlightData />
            <tr>
              <th>ID</th>
              <th>Airline</th>
              <th>Arriving From</th>
              <th>Flight Type</th>
              <th>time</th>
              <th>Terminal</th>
              <th>Gate</th>
              <th>Baggage Claim</th>
              <th>Action</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Flights.map((flight) => {
              const formatted_id = flight._id.slice(-6).toUpperCase();
              return (
                <tr>
                  {/* <td>{i}</td> */}
                  <td>{formatted_id}</td>
                  <td>{flight.airline}</td>
                  <td>{flight.arriving_from}</td>
                  <td>{flight.flight_type}</td>
                  <td>{flight.time}</td>
                  <td>{flight.terminal}</td>
                  <td>{flight.gate}</td>
                  <td>{flight.bag_claim}</td>
                  <td>
                    <button
                      name="edit"
                      value={flight._id}
                      onClick={(e) => {
                        handleShow(e);
                        handleUpdate(e);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      name="delete"
                      id={flight._id}
                      value={flight._id}
                      onClick={(e) => {
                        handleDeleteFlight(e);
                        refreshPage();
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      }
    </div>
  );
};

export default FlightDetailsTable;
