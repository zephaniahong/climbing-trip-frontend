import React, {useReducer} from 'react'
import axios from 'axios'

const initialState = {

}
export function climbingReducer(state, action){
  switch(action.type){

  }
}


// Provider Code
export const ClimbingContext = React.createContext(null)

const {Provider} = ClimbingContext

export function ClimbingProvider({children}) {
  const [store, dispatch] = useReducer(climbingReducer, initialState)

  return <Provider value={{store, dispatch}}>{children}</Provider>
}

