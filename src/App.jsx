import React, { useState, useEffect } from 'react';
import './App.css';
import EventList from './components/EventList.jsx';
import Statistics from './components/Statistics.jsx';
import SearchBar from './components/SearchBar.jsx';
import CategoryFilter from './components/CategoryFilter.jsx';

function App() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Fetch events from SeatGeek API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        // Using SeatGeek API - note: you may want to get an API key for production use
        const response = await fetch(
          'https://api.seatgeek.com/2/events?per_page=50&sort=score.desc'
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        
        const data = await response.json();
        setEvents(data.events);
        setFilteredEvents(data.events);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events based on search term and category
  useEffect(() => {
    let filtered = events;

    // Filter by search term (event title or venue)
    if (searchTerm) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.venue.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => 
        event.type === selectedCategory
      );
    }

    setFilteredEvents(filtered);
  }, [events, searchTerm, selectedCategory]);

  if (loading) {
    return (
      <div className="app">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading amazing events...</p>
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
        <h1>🎫 SeatGeek Events Dashboard</h1>
        <p>Discover the hottest live events happening now</p>
      </header>

      <main className="app-main">
        <Statistics events={events} filteredEvents={filteredEvents} />
        
        <div className="controls">
          <SearchBar 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
          />
          <CategoryFilter 
            events={events}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        <EventList events={filteredEvents} />
      </main>
    </div>
  );
}

export default App; 