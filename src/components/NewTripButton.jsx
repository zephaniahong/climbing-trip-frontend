import React, { useContext, useState } from "react";
import { ClimbingContext } from "../store.js";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function NewTripButton() {
  const { store, dispatch } = useContext(ClimbingContext);
  const [newtrip, setNewTrip] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = () => {
    console.log("Add submit code here");
    setShow(false);
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
          <input type="text" placeholder="New Trip Name" value={newtrip} />
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
