import React from 'react';
import HomePage from './components/HomePage';
import './styles/global.css';
import './App.css';

// If using GitHub Pages, this ensures the base URL is correct
const basePath = process.env.NODE_ENV === 'production' 
  ? '/nothing' 
  : '';

function App() {
  return (
    <div className="app-container">
      <HomePage />
    </div>
  );
}

export default App; 