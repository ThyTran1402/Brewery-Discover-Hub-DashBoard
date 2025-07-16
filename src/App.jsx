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

  // Sample data for demonstration when API fails
  const sampleEvents = [
    {
      id: 1,
      title: "Taylor Swift - The Eras Tour",
      type: "concert",
      score: 0.95,
      datetime_local: "2024-08-15T19:30:00",
      venue: {
        name: "MetLife Stadium",
        city: "East Rutherford",
        state: "NJ"
      },
      performers: [{ image: "https://via.placeholder.com/300x200?text=Taylor+Swift" }],
      stats: {
        lowest_price: 120,
        highest_price: 500,
        listing_count: 1200
      }
    },
    {
      id: 2,
      title: "New York Yankees vs Boston Red Sox",
      type: "sports",
      score: 0.88,
      datetime_local: "2024-08-20T19:05:00",
      venue: {
        name: "Yankee Stadium",
        city: "Bronx",
        state: "NY"
      },
      performers: [{ image: "https://via.placeholder.com/300x200?text=Yankees+vs+Red+Sox" }],
      stats: {
        lowest_price: 35,
        highest_price: 250,
        listing_count: 800
      }
    },
    {
      id: 3,
      title: "Hamilton",
      type: "theater",
      score: 0.92,
      datetime_local: "2024-08-18T20:00:00",
      venue: {
        name: "Richard Rodgers Theatre",
        city: "New York",
        state: "NY"
      },
      performers: [{ image: "https://via.placeholder.com/300x200?text=Hamilton+Musical" }],
      stats: {
        lowest_price: 89,
        highest_price: 400,
        listing_count: 450
      }
    },
    {
      id: 4,
      title: "Dave Chappelle",
      type: "comedy",
      score: 0.87,
      datetime_local: "2024-08-22T21:00:00",
      venue: {
        name: "Madison Square Garden",
        city: "New York",
        state: "NY"
      },
      performers: [{ image: "https://via.placeholder.com/300x200?text=Dave+Chappelle" }],
      stats: {
        lowest_price: 65,
        highest_price: 300,
        listing_count: 600
      }
    },
    {
      id: 5,
      title: "Coachella Valley Music Festival",
      type: "festival",
      score: 0.91,
      datetime_local: "2024-08-25T14:00:00",
      venue: {
        name: "Empire Polo Club",
        city: "Indio",
        state: "CA"
      },
      performers: [{ image: "https://via.placeholder.com/300x200?text=Coachella+Festival" }],
      stats: {
        lowest_price: 200,
        highest_price: 1000,
        listing_count: 2000
      }
    },
    {
      id: 6,
      title: "Los Angeles Lakers vs Golden State Warriors",
      type: "sports",
      score: 0.86,
      datetime_local: "2024-08-28T19:30:00",
      venue: {
        name: "Crypto.com Arena",
        city: "Los Angeles",
        state: "CA"
      },
      performers: [{ image: "https://via.placeholder.com/300x200?text=Lakers+vs+Warriors" }],
      stats: {
        lowest_price: 95,
        highest_price: 800,
        listing_count: 1500
      }
    },
    {
      id: 7,
      title: "John Mulaney",
      type: "comedy",
      score: 0.84,
      datetime_local: "2024-08-30T20:00:00",
      venue: {
        name: "Chicago Theatre",
        city: "Chicago",
        state: "IL"
      },
      performers: [{ image: "https://via.placeholder.com/300x200?text=John+Mulaney" }],
      stats: {
        lowest_price: 45,
        highest_price: 150,
        listing_count: 400
      }
    },
    {
      id: 8,
      title: "Beyoncé - Renaissance World Tour",
      type: "concert",
      score: 0.97,
      datetime_local: "2024-09-01T20:00:00",
      venue: {
        name: "SoFi Stadium",
        city: "Los Angeles",
        state: "CA"
      },
      performers: [{ image: "https://via.placeholder.com/300x200?text=Beyonce+Renaissance" }],
      stats: {
        lowest_price: 150,
        highest_price: 700,
        listing_count: 1800
      }
    },
    {
      id: 9,
      title: "The Lion King",
      type: "theater",
      score: 0.89,
      datetime_local: "2024-09-05T19:30:00",
      venue: {
        name: "Minskoff Theatre",
        city: "New York",
        state: "NY"
      },
      performers: [{ image: "https://via.placeholder.com/300x200?text=Lion+King+Musical" }],
      stats: {
        lowest_price: 79,
        highest_price: 350,
        listing_count: 500
      }
    },
    {
      id: 10,
      title: "Comic-Con International",
      type: "conference",
      score: 0.83,
      datetime_local: "2024-09-10T10:00:00",
      venue: {
        name: "San Diego Convention Center",
        city: "San Diego",
        state: "CA"
      },
      performers: [{ image: "https://via.placeholder.com/300x200?text=Comic+Con" }],
      stats: {
        lowest_price: 50,
        highest_price: 200,
        listing_count: 800
      }
    },
    {
      id: 11,
      title: "Disney On Ice",
      type: "family",
      score: 0.78,
      datetime_local: "2024-09-12T15:00:00",
      venue: {
        name: "Capital One Arena",
        city: "Washington",
        state: "DC"
      },
      performers: [{ image: "https://via.placeholder.com/300x200?text=Disney+On+Ice" }],
      stats: {
        lowest_price: 25,
        highest_price: 100,
        listing_count: 600
      }
    },
    {
      id: 12,
      title: "Boston Symphony Orchestra",
      type: "classical",
      score: 0.81,
      datetime_local: "2024-09-15T20:00:00",
      venue: {
        name: "Symphony Hall",
        city: "Boston",
        state: "MA"
      },
      performers: [{ image: "https://via.placeholder.com/300x200?text=Boston+Symphony" }],
      stats: {
        lowest_price: 40,
        highest_price: 180,
        listing_count: 300
      }
    }
  ];

  // Load sample data (using demo data for reliable functionality)
  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        
        // For demo purposes, we'll use sample data directly
        // This ensures the dashboard always works without API dependencies
        console.log('Loading demo events data...');
        
        // Simulate API delay for realistic loading experience
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setEvents(sampleEvents);
        setFilteredEvents(sampleEvents);
        setError(null);
        
        console.log('Demo events loaded successfully!');
      } catch (err) {
        console.error('Error loading demo data:', err);
        setError('Failed to load demo data');
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
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
        <div style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '0.9rem',
          marginTop: '10px',
          display: 'inline-block'
        }}>
          ✨ Demo Mode - Showcasing dashboard features with sample data
        </div>
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