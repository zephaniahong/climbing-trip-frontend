import React, { useContext, useState } from "react";
import { ClimbingContext, createRoute } from "../store.js";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function NewRouteButton() {
  const { store, dispatch } = useContext(ClimbingContext);
  const [newRoute, setNewRoute] = useState("");
  const [newGrade, setNewGrade] = useState("");
  const [show, setShow] = useState(false);
  const difficulties = [
    1,
    2,
    3,
    4,
    5.0,
    5.1,
    5.2,
    5.3,
    5.4,
    5.5,
    5.6,
    5.7,
    5.8,
    5.9,
    "5.10",
    5.11,
    5.12,
    5.13,
    5.14,
    5.15,
  ];

  console.log("---store---");
  console.log(store);

  const { trips, currentTripIndex } = store;

  const difficultiesOptions = difficulties.map((grade) => {
    return (
      <option key={grade} value={grade}>
        {grade}
      </option>
    );
  });

  // const { routes } = state;

  const handleClose = () => {
    setShow(false);
    setNewRoute("");
  };
  const handleShow = () => setShow(true);
  const handleSubmit = () => {
    console.log(newRoute);
    console.log(newGrade);
    const tripId = trips[currentTripIndex].id;
    console.log(tripId);
    createRoute(dispatch, { newRoute, newGrade, tripId });
    setShow(false);
  };
  const handleInputChange = (event) => {
    setNewRoute(event.target.value);
  };

  return (
    <span>
      <button className="btn btn-primary" onClick={handleShow}>
        Add New Route
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new route!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            placeholder="New Route Name"
            className="form-control"
            value={newRoute}
            onChange={handleInputChange}
          />
          <select
            className="custom-select"
            onChange={(event) => {
              setNewGrade(event.target.value);
            }}
            defaultValue="Select Grade"
          >
            <option disabled hidden>
              Select Grade
            </option>

            {difficultiesOptions}
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Add route!
          </Button>
        </Modal.Footer>
      </Modal>
    </span>
  );
}
