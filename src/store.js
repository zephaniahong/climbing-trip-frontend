import React, {useReducer} from 'react'
import axios from 'axios'

export const initialState = {
  trips: []
}
export function climbingReducer(state, action){
  switch(action.type){
    case LOAD_TRIPS:
      return {...state, trips: action.payload}
    default:
      return state
  }
}


// Provider Code
export const ClimbingContext = React.createContext(null)

const {Provider} = ClimbingContext

export function ClimbingProvider({children}) {
  const [store, dispatch] = useReducer(climbingReducer, initialState)

  return <Provider value={{store, dispatch}}>{children}</Provider>
}

// TYPES
const LOAD_TRIPS = 'LOAD_TRIPS'


// action functions
export function loadTripsAction(trips) {
  return {
    type: LOAD_TRIPS,
    payload: trips
  }
}


const BACKEND_URL = 'http://localhost:3004'

// axios requests
export function loadTrips(dispatch){
  axios.get(BACKEND_URL + '/trips').then((result)=> {
    dispatch(loadTripsAction(result.data.trips))
  })
}

export function createTrip(dispatch, newtrip){
  axios
    .post(BACKEND_URL + '/newtrip', {newtrip})
    .then((result) => {
      // Just refresh the state rather than 
      dispatch(loadTripsAction(result.data.trips))
    })
}
