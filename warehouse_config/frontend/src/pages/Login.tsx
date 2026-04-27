import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // UPDATED ENDPOINT: Using the Djoser JWT creation path
      const response = await axios.post('http://127.0.0.1:8000/user/auth/jwt/create/', {
        email,
        password,
      });

      // Save the access token to localStorage
      localStorage.setItem('access_token', response.data.access);
      
      // Redirect to the Dashboard
      navigate('/Profile');
    } catch (error) {
      console.error("LOGIN_ERROR:", error);
      alert("Terminal Access Denied: Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center font-mono text-white">
      <div className="border border-cyan-500/50 p-10 bg-black/40 backdrop-blur-md w-96 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
        <h2 className="text-cyan-400 text-xs mb-8 uppercase tracking-[0.3em] font-bold italic text-center">
          [ AUTH_REQUIRED ]
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <input 
            type="email" 
            placeholder="OPERATOR_EMAIL"
            className="w-full bg-black border border-gray-800 p-3 text-[11px] focus:border-cyan-400 outline-none transition-all"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="ACCESS_KEY"
            className="w-full bg-black border border-gray-800 p-3 text-[11px] focus:border-cyan-400 outline-none transition-all"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full bg-cyan-500 text-black font-black py-2 text-[11px] hover:bg-white transition-all uppercase">
            Initialize_Session
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;