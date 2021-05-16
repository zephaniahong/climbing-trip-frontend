import React, { useContext, useState } from "react";
import { ClimbingContext } from "../store.js";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function NewTripButton() {
  const { store, dispatch } = useContext(ClimbingContext);
  const [newtrip, setNewTrip] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setNewTrip("");
  };
  const handleShow = () => setShow(true);
  const handleSubmit = () => {
    console.log("Add submit code here");
    setShow(false);
  };
  const handleChange = (event) => {
    console.log(newtrip);
    setNewTrip(event.target.value);
  };

  return (
    <span>
      <button className="btn btn-primary" onClick={handleShow}>
        Add New Trip
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            placeholder="New Trip Name"
            className="form-control"
            value={newtrip}
            onChange={handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </span>
  );
}
