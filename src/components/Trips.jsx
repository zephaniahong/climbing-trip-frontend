import React, { useContext, useEffect, useState } from "react";
import {
  ClimbingContext,
  loadTrips,
  loadRoutes,
  setSelectedTrip,
} from "../store";
import RoutesModal from "./RoutesModal.jsx";

const Trips = () => {
  const { store, dispatch } = useContext(ClimbingContext);
  const { trips, routes } = store;
  const [currentTripIndex, setCurrentTripIndex] = useState(null);
  const [toDisplayRoutes, setToDisplayRoutes] = useState(false);
  const [selectedRoutes, setSelectedRoutes] = useState();

  // function to close modal
  const clearModal = () => {
    setToDisplayRoutes(false);
  };

  // display all trips upon loading of page
  useEffect(() => {
    loadTrips(dispatch);
    loadRoutes(dispatch);
  }, [routes]);

  // display routes for selected trip
  const displayRoutes = (tripIndex) => {
    const tripId = trips[tripIndex].id;
    const displayRoutes = [];
    for (let i = 0; i < routes.length; i += 1) {
      if (routes[i].tripId === tripId) {
        displayRoutes.push(routes[i]);
      }
    }
    setSelectedRoutes(displayRoutes);
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
                dispatch(setSelectedTrip(index));
                setCurrentTripIndex(index);
                displayRoutes(index);
                setToDisplayRoutes(true);
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
        {toDisplayRoutes && routes && (
          <RoutesModal
            title={trips[currentTripIndex].name}
            onConfirm={clearModal}
            selectedRoutes={selectedRoutes}
            setSelectedRoutes={setSelectedRoutes}
          />
        )}
        <div className="row">{tripList}</div>
      </div>
    );
  }
  return null;
};

export default Trips;
