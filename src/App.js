import React from 'react'
import {ClimbingProvider} from './store'
import Trips from './components/Trips.jsx'

function App() {
  return (
    <ClimbingProvider>
    <div className='container'>
      <Trips/>
    </div>
    </ClimbingProvider>
  );
}

export default App;
