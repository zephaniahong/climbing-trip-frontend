import React from 'react'
import {ClimbingProvider} from './store'
import Trips from './components/Trips.jsx'
import NewTripButton from "./components/NewTripButton.jsx"

function App() {
  return (
    <ClimbingProvider>
    <div className='container'>
      <NewTripButton/>
      <Trips/>
    </div>
    </ClimbingProvider>
  );
}

export default App;
