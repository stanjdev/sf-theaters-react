import React from 'react';
import './App.css';
import HomePage from './navigation/HomePage';
import SearchResults from './navigation/SearchResults';
import Business from './components/Business';
import FilteredSearchResults from './navigation/FilteredSearchResults';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <nav>
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to={`/filtered_search_results/cinema`}>Cinemas</Link>
        <Link className="nav-link" to={`/filtered_search_results/performing art`}>Performing Arts</Link>
        <Link className="nav-link" to={`/filtered_search_results/bar`}>Bars</Link>
        <Link className="nav-link" to={`/filtered_search_results/comedy club`}>Comedy Clubs</Link>
      </nav>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<SearchResults />} path="/search_results/:query" />
        <Route element={<FilteredSearchResults />} path="/filtered_search_results/:filter" />
        <Route element={<Business />} path="/business/:id" />
      </Routes>
    </Router>
  );
}

export default App;
