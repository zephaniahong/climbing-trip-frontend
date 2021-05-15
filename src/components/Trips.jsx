import React, { useContext, useEffect } from "react";
import { ClimbingContext, loadTrips } from "../store";

const Trips = () => {
  const { store, dispatch } = useContext(ClimbingContext);
  const { trips } = store;
  useEffect(() => {
    loadTrips(dispatch);
  }, [dispatch]);

  // check if trips has been been set in state
  if (trips.length > 0) {
    const tripList = trips.map((trip) => {
      return (
        <div key={trip.id} className="card col-4" style={{ width: "18rem" }}>
          <img src="..." className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{trip.name}</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href="#" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
      );
    });
    return <div className="row">{tripList}</div>;
  }
  return null;
};

export default Trips;
