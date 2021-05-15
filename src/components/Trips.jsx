import React, { useContext, useEffect, useState } from "react";
import {
  ClimbingContext,
  loadTrips,
  loadRoutes,
  emptyRoutesAction,
} from "../store";
import RoutesModal from "./RoutesModal.jsx";

const Trips = () => {
  const { store, dispatch } = useContext(ClimbingContext);
  const { trips, routes } = store;
  const [currentTripIndex, setCurrentTripIndex] = useState(null);

  // function to clear states in order to close modal
  const clearModal = () => {
    dispatch(emptyRoutesAction());
  };

  // display all trips upon loading of page
  useEffect(() => {
    loadTrips(dispatch);
  }, [dispatch]);

  // display routes for selected trip
  const displayRoutes = (tripIndex) => {
    const tripId = trips[tripIndex].id;
    loadRoutes(dispatch, tripId);
  };

  // check if trips has been been set in state
  if (trips.length > 0) {
    const tripList = trips.map((trip, index) => {
      return (
        <div key={trip.id} className="card col-4">
          <img src="..." className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{trip.name}</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <button
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={() => {
                setCurrentTripIndex(index);
                displayRoutes(index);
              }}
              className="btn btn-primary"
            >
              Go somewhere
            </button>
          </div>
        </div>
      );
    });
    return (
      <div>
        {routes && (
          <RoutesModal
            title={trips[currentTripIndex].name}
            onConfirm={clearModal}
          />
        )}
        <div className="row">{tripList}</div>
      </div>
    );
  }
  return null;
};

export default Trips;
