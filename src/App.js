import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import BreweryList from './components/BreweryList';
import Statistics from './components/Statistics';

function App() {
  const [breweries, setBreweries] = useState([]);
  const [filteredBreweries, setFilteredBreweries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  // Fetch breweries data using useEffect and async/await
  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.openbrewerydb.org/v1/breweries?per_page=50');
        if (!response.ok) {
          throw new Error('Failed to fetch brewery data');
        }
        const data = await response.json();
        setBreweries(data);
        setFilteredBreweries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBreweries();
  }, []);

  // Filter breweries based on search term and category
  useEffect(() => {
    let filtered = breweries;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(brewery =>
        brewery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brewery.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brewery.state_province.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by brewery type
    if (selectedType !== 'all') {
      filtered = filtered.filter(brewery => brewery.brewery_type === selectedType);
    }

    setFilteredBreweries(filtered);
  }, [breweries, searchTerm, selectedType]);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  if (loading) {
    return <div className="loading">Loading brewery data...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="App">
      <header className="app-header">
        <div className="container">
          <h1>🍺 Brewery Discover Hub</h1>
          <p>Explore breweries from around the world with real-time data</p>
        </div>
      </header>

      <main className="container">
        <Statistics breweries={breweries} />
        
        <div className="filters-section">
          <SearchBar onSearchChange={handleSearchChange} />
          <CategoryFilter onTypeChange={handleTypeChange} selectedType={selectedType} />
        </div>

        <BreweryList breweries={filteredBreweries} />
      </main>
    </div>
  );
}

export default App; 