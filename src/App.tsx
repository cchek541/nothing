import React, { useState } from 'react';
import HomePage from './components/HomePage';
import ApiDemo from './components/ApiDemo';
import './styles/global.css';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="app-container">
      <nav className="app-nav">
        <ul>
          <li>
            <button 
              onClick={() => setCurrentPage('home')}
              className={currentPage === 'home' ? 'active' : ''}
            >
              Home
            </button>
          </li>
          <li>
            <button 
              onClick={() => setCurrentPage('api-demo')}
              className={currentPage === 'api-demo' ? 'active' : ''}
            >
              API Demo
            </button>
          </li>
        </ul>
      </nav>
      
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'api-demo' && <ApiDemo />}
    </div>
  );
}

export default App; 