import React, { useState, useEffect } from 'react';
import './App.css';
import EventList from './components/EventList.jsx';
import Statistics from './components/Statistics.jsx';
import SearchBar from './components/SearchBar.jsx';
import CategoryFilter from './components/CategoryFilter.jsx';
import UserPreferences from './components/UserPreferences.jsx';

function App() {
  const [breweries, setBreweries] = useState([]);
  const [filteredBreweries, setFilteredBreweries] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState([]);
  const [ratings, setRatings] = useState({});
  const [userPreferences, setUserPreferences] = useState({
    preferredTypes: ['micro', 'brewpub'],
    preferredStates: [],
    minRating: 0,
    maxDistance: 50
  });
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'recommendations', 'favorites'

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

  // Generate personalized recommendations
  useEffect(() => {
    if (breweries.length > 0) {
      const generateRecommendations = () => {
        let scored = breweries.map(brewery => {
          let score = 0;
          
          // Prefer user's preferred types
          if (userPreferences.preferredTypes.includes(brewery.brewery_type)) {
            score += 3;
          }
          
          // Prefer user's preferred states
          if (userPreferences.preferredStates.includes(brewery.state_province)) {
            score += 2;
          }
          
          // Boost score for breweries with websites (shows they're active)
          if (brewery.website_url) {
            score += 1;
          }
          
          // Boost score for breweries with complete information
          if (brewery.phone && brewery.address_1) {
            score += 1;
          }
          
          // Apply user ratings
          const userRating = ratings[brewery.id] || 0;
          score += userRating;
          
          // Penalize if below minimum rating
          if (userRating < userPreferences.minRating) {
            score -= 2;
          }
          
          // Add some randomness to avoid always showing the same recommendations
          score += Math.random() * 0.5;
          
          return { ...brewery, recommendationScore: score };
        });
        
        // Sort by recommendation score and get top recommendations
        const topRecommendations = scored
          .sort((a, b) => b.recommendationScore - a.recommendationScore)
          .slice(0, 20);
        
        setRecommendations(topRecommendations);
      };
      
      generateRecommendations();
    }
  }, [breweries, userPreferences, ratings]);

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

  // Favorites management
  const toggleFavorite = (breweryId) => {
    setFavorites(prev => 
      prev.includes(breweryId) 
        ? prev.filter(id => id !== breweryId)
        : [...prev, breweryId]
    );
  };

  // Rating management
  const rateBrewery = (breweryId, rating) => {
    setRatings(prev => ({
      ...prev,
      [breweryId]: rating
    }));
  };

  // Get breweries to display based on active tab
  const getDisplayBreweries = () => {
    switch (activeTab) {
      case 'recommendations':
        return recommendations;
      case 'favorites':
        return breweries.filter(brewery => favorites.includes(brewery.id));
      default:
        return filteredBreweries;
    }
  };

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
        <h1>🍺 Brewery Recommendation Engine</h1>
        <p>Discover personalized brewery recommendations based on your preferences</p>
      </header>

      <main className="app-main">
        <Statistics 
          breweries={breweries} 
          filteredBreweries={filteredBreweries}
          recommendations={recommendations}
          favorites={favorites}
          ratings={ratings}
        />
        
        <UserPreferences 
          preferences={userPreferences}
          onPreferencesChange={setUserPreferences}
          breweries={breweries}
        />
        
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Breweries ({filteredBreweries.length})
          </button>
          <button 
            className={`tab-button ${activeTab === 'recommendations' ? 'active' : ''}`}
            onClick={() => setActiveTab('recommendations')}
          >
            Recommendations ({recommendations.length})
          </button>
          <button 
            className={`tab-button ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            Favorites ({favorites.length})
          </button>
        </div>

        {activeTab === 'all' && (
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
        )}

        <EventList 
          breweries={getDisplayBreweries()}
          favorites={favorites}
          ratings={ratings}
          onToggleFavorite={toggleFavorite}
          onRateBrewery={rateBrewery}
          activeTab={activeTab}
        />
      </main>
    </div>
  );
}

export default App; 