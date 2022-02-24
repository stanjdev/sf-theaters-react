import React from 'react';
import './App.css';
import HomePage from './navigation/HomePage';
import SearchResults from './navigation/SearchResults';
import Business from './components/Business';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Link to="/">Home</Link>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<SearchResults />} path="/search_results/:query" />
        <Route element={<Business />} path="/business/:id" />
      </Routes>
    </Router>
  );
}

export default App;
