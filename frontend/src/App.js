import './App.css';
import AddLogs from './AddLogs';
import { useState } from 'react';
import MapOfLogs from './MapOfLogs';

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div>
      <h1>My Journey</h1>
      <h2>Where You've Traveled!</h2>
      <MapOfLogs key={refresh}/>
      <h2>Add a Place!</h2>
      <AddLogs onLogAdded={() => setRefresh(!refresh)}/>
    </div>
  );
  
}

export default App;
