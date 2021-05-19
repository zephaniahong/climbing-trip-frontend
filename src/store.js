import React, {useReducer} from 'react'
import axios from 'axios'

export const initialState = {
  trips: [],
  routes: null,
  currentTripIndex: null
}

export function climbingReducer(state, action){
  switch(action.type){
    case LOAD_TRIPS:
      return {...state, trips: action.payload}
    case LOAD_ROUTES:
      return {...state, routes: action.payload}
    case SET_TRIP:
      return {...state, currentTripIndex: action.payload}
    case UPDATE_ROUTES:
      const updatedRoutes = [...action.payload]
      // object of all the ids
      let idObj = {}
      for (let i = 0; i < updatedRoutes.length; i += 1) {
        const id = updatedRoutes[i].id
        idObj[id] = true
      }
      // only add existing routes to the updated routes if it doesn't exist 
      const existingRoutes = [...state.routes]
      for (let i = 0; i < existingRoutes.length; i+= 1) {
        const existingId = existingRoutes[i].id
        if (!idObj[existingId]) {
          updatedRoutes.push(existingRoutes[i])
        }
      }
      // sort routes by order
      const sortedRoutes = updatedRoutes.sort((a, b) => ((a.order > b.order) ? 1 : -1));
      return {...state, routes: sortedRoutes}

    case ADD_ROUTE:
      // add new route to existing routes array
      const newRoutes = [...state.routes]
      newRoutes.push(action.payload)
      //sort routes
      const sortRoutes = newRoutes.sort((a, b) => ((a.order > b.order) ? 1 : -1));
      return {...state, routes: sortRoutes}
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
const EMPTY_ROUTES = 'EMPTY_ROUTES'
const UPDATE_ROUTES = 'UPDATE_ROUTES'
const ADD_ROUTE = 'ADD_ROUTE'


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

export function emptyRoutesAction() {
  return {
    type: EMPTY_ROUTES
  }
}

export function updateRoutesAction(routesArray){
  return {
    type: UPDATE_ROUTES,
    payload: routesArray
  }
}

export function addRoutesAction(routeObj){
  return {
    type: ADD_ROUTE,
    payload: routeObj
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
  axios.get(BACKEND_URL + `/routes`).then((result)=> {
    dispatch(loadRoutesAction(result.data.sortedRoutes))
  })
}
export function createTrip(dispatch, newtrip){
  axios
    .post(BACKEND_URL + '/newtrip', {newtrip})
    .then((result) => {
      // Just refresh the state rather than manipulate both front and back end
      dispatch(loadTripsAction(result.data.trips))
    })
}

export function createRoute(dispatch, routeObj){
  axios
    .post(BACKEND_URL + '/newroute', routeObj)
    .then((result) => {
      // Just refresh the state rather than manipulate both front and back end
      dispatch(addRoutesAction(result.data.routes))
    })
}

export function updateRoutes(dispatch, newRoutesArray, tripId) {
  axios.post(BACKEND_URL + `/updateRoutes/${tripId}`, newRoutesArray).then((result)=> {
    dispatch(updateRoutesAction(result.data))
  })
}