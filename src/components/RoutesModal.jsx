import React, { useContext } from "react";
import { ClimbingContext } from "../store";
import classes from "./Routes.module.css";

const Backdrop = () => {
  return <div className={classes.backdrop}></div>;
};

const ModalContent = (props) => {
  const { store, dispatch } = useContext(ClimbingContext);
  const { routes } = store;
  const routesList = routes.map((route) => {
    return (
      <li key={route.id} className="list-group-item">
        {route.name}
      </li>
    );
  });
  return (
    <div
      className={`modal ${classes.modal} ${classes.modalView}`}
      tabIndex="-1"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{props.title}</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <ul className={`list-group ${classes.ul}`}>{routesList}</ul>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const RoutesModal = (props) => {
  return (
    <React.Fragment>
      <Backdrop />
      <ModalContent title={props.title} />
    </React.Fragment>
  );
};

export default RoutesModal;
