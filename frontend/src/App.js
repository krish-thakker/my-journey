import './App.css';
import AddLogs from './AddLogs';
import { useState } from 'react';
import MapOfLogs from './MapOfLogs';

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 shadow-lg">
        <h1 className="text-4xl font-bold text-white mb-2">My Journey</h1>
        <p className="text-lg text-blue-100">Track and visualize your adventures</p>
      </div>

      {/* Map Section */}
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden mb-8">
        <MapOfLogs key={refresh} />
      </div>

      {/* Add Logs Section */}
      <div className="max-w-4xl mx-auto">
        <AddLogs onLogAdded={() => setRefresh(!refresh)} />
      </div>
    </div>
  );
}

export default App;