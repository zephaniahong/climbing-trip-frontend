import React, { useContext, useState } from "react";
import { ClimbingContext, createTrip } from "../store.js";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function NewTripButton() {
  const { dispatch } = useContext(ClimbingContext);
  const [newtrip, setNewTrip] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setNewTrip("");
  };
  const handleShow = () => setShow(true);
  const handleSubmit = () => {
    createTrip(dispatch, newtrip);
    setShow(false);
  };
  const handleInputChange = (event) => {
    setNewTrip(event.target.value);
  };

  return (
    <span>
      <button className="btn btn-primary" onClick={handleShow}>
        Add New Trip
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
            value={newtrip}
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
