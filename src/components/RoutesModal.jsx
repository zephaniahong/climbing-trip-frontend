import React, { useContext } from "react";
import { ClimbingContext } from "../store";
import classes from "./Routes.module.css";

const Backdrop = (props) => {
  return <div onClick={props.onConfirm} className={classes.backdrop}></div>;
};

const ModalContent = (props) => {
  return (
    <div className={`${classes.modalView}`} tabIndex="-1">
      <h5 className="modal-title">{props.title}</h5>
      <ul className={`list-group ${classes.ul}`}>{props.content}</ul>
      <button
        onClick={props.onConfirm}
        type="button"
        className="btn btn-secondary"
      >
        Close
      </button>
      <button
        onClick={props.onConfirm}
        type="button"
        className="btn btn-primary"
      >
        Save changes
      </button>
    </div>
  );
};

const RoutesModal = (props) => {
  const { store } = useContext(ClimbingContext);
  const { routes } = store;
  const routesList = routes.map((route) => {
    return <li key={route.id}>{route.name}</li>;
  });

  return (
    <React.Fragment>
      <Backdrop onConfirm={props.onConfirm} />
      <ModalContent
        title={props.title}
        onConfirm={props.onConfirm}
        content={routesList}
      />
    </React.Fragment>
  );
};

export default RoutesModal;
