import React, { useContext, useState } from "react";
import { ClimbingContext, createTrip } from "../store.js";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function NewRouteButton() {
  const { dispatch } = useContext(ClimbingContext);
  const [newRoute, setNewRoute] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setNewRoute("");
  };
  const handleShow = () => setShow(true);
  const handleSubmit = () => {
    createTrip(dispatch, newtrip);
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
          <Modal.Title>Add a new trip!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            placeholder="New Trip Name"
            className="form-control"
            value={newRoute}
            onChange={handleInputChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Add trip!
          </Button>
        </Modal.Footer>
      </Modal>
    </span>
  );
}
