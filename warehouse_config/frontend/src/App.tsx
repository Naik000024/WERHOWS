import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MasterDashboard from './pages/MasterDashboard';
import Inventory from './pages/Inventory';
import LogsArchive from './pages/LogsArchive';
import Login from './pages/Login'; // New Import
import Profile from './pages/Profile'; // New Import
// Simple check to see if the operator is authenticated
const isAuthenticated = () => !!localStorage.getItem('access_token');

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* 1. INITIAL ENTRY: Redirect to Login if not authenticated, otherwise Dashboard */}
        <Route path="/" element={
          isAuthenticated() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
        } />
        
        {/* 2. AUTHENTICATION ROUTE */}
        <Route path="/login" element={<Login />} />

        {/* 3. MAIN APPLICATION ROUTES */}
        <Route path="/dashboard" element={<MasterDashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/logs" element={<LogsArchive />} />
        
        {/* 4. OPERATOR PROFILE ROUTE */}
        <Route path="/profile" element={<Profile />} />

        {/* 404 Catch-all */}
        <Route path="*" element={
          <div className="min-h-screen bg-[#0d1117] flex items-center justify-center font-mono text-neon-pink text-sm">
            [ ERROR: 404_CORE_NOT_FOUND ]
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;