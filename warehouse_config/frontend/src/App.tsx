import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MasterDashboard from './pages/MasterDashboard';
import Inventory from './pages/Inventory';
import LogsArchive from './pages/LogsArchive'; // 1. Import your new page

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect empty path to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
        
        {/* Main Application Routes */}
        <Route path="/dashboard" element={<MasterDashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/logs" element={<LogsArchive />} />

        {/* 404 Catch-all (Optional) */}
        <Route path="*" element={
          <div className="min-h-screen bg-[#0d1117] flex items-center justify-center font-mono text-neon-pink">
            [ ERROR: 404_CORE_NOT_FOUND ]
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;