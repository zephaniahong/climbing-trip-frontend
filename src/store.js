import React, {useReducer} from 'react'
import axios from 'axios'

export const initialState = {
  trips: [],
  routes: [],
  currentTripIndex: null
}

export function climbingReducer(state, action){
  switch(action.type){
    case LOAD_TRIPS:
      return {...state, trips: action.payload}
    case LOAD_ROUTES:
      return {...state, routes: action.payload}
    case SET_TRIP:
      console.log(action.payload)
      return {...state, currentTripIndex: action.payload}
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
const LOAD_ROUTES = 'LOAD_ROUTES'
const SET_TRIP = 'SET_TRIP'


// action functions
export function loadTripsAction(trips) {
  return {
    type: LOAD_TRIPS,
    payload: trips
  }
}

export function loadRoutesAction(routes) {
  return {
    type: LOAD_ROUTES,
    payload:routes
  }
}

export function setSelectedTrip(index) {
  return {
    type: SET_TRIP,
    payload: index
  }
}


const BACKEND_URL = 'http://localhost:3004'

// axios requests

// load all existing trips
export function loadTrips(dispatch){
  axios.get(BACKEND_URL + '/trips').then((result)=> {
    dispatch(loadTripsAction(result.data.trips))
  })
}

// load all routes for a chosen trip
export function loadRoutes(dispatch, tripId) {
  axios.get(BACKEND_URL + `/routes/${tripId}`).then((result)=> {
    console.log(result.data.routes)
    dispatch(loadRoutesAction(result.data.routes))
  })
}