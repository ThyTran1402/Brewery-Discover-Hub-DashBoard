import React, { useState, useEffect } from 'react';
import './App.css';
import EventList from './components/EventList.jsx';
import Statistics from './components/Statistics.jsx';
import SearchBar from './components/SearchBar.jsx';
import CategoryFilter from './components/CategoryFilter.jsx';

function App() {
  const [breweries, setBreweries] = useState([]);
  const [filteredBreweries, setFilteredBreweries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Fetch breweries from Open Brewery DB API
  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        setLoading(true);
        
        // Using Open Brewery DB API - free, no auth required, no CORS issues
        console.log('Fetching breweries from Open Brewery DB...');
        
        const response = await fetch(
          'https://api.openbrewerydb.org/v1/breweries?per_page=100'
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Brewery data received:', data);
        
        if (data && data.length > 0) {
          setBreweries(data);
          setFilteredBreweries(data);
          setError(null);
        } else {
          throw new Error('No breweries found in API response');
        }
      } catch (err) {
        console.error('Error fetching breweries:', err);
        setError(`Failed to fetch breweries: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBreweries();
  }, []);

  // Filter breweries based on search term and category
  useEffect(() => {
    let filtered = breweries;

    // Filter by search term (brewery name, city, or state)
    if (searchTerm) {
      filtered = filtered.filter(brewery => 
        brewery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brewery.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brewery.state_province.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category (brewery type)
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(brewery => 
        brewery.brewery_type === selectedCategory
      );
    }

    setFilteredBreweries(filtered);
  }, [breweries, searchTerm, selectedCategory]);

  if (loading) {
    return (
      <div className="app">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading amazing breweries...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🍺 Open Brewery DB Dashboard</h1>
        <p>Discover amazing craft breweries, brewpubs, and cideries</p>
      </header>

      <main className="app-main">
        <Statistics breweries={breweries} filteredBreweries={filteredBreweries} />
        
        <div className="controls">
          <SearchBar 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
          />
          <CategoryFilter 
            breweries={breweries}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        <EventList breweries={filteredBreweries} />
      </main>
    </div>
  );
}

export default App; 