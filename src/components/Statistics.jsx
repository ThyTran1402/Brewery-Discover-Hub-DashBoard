import React from 'react';
import './Statistics.css';

function Statistics({ breweries, filteredBreweries, recommendations, favorites, ratings }) {
  // Calculate various statistics
  const totalBreweries = breweries.length;
  const filteredCount = filteredBreweries.length;
  const recommendationCount = recommendations.length;
  const favoritesCount = favorites.length;
  
  // Find most popular brewery type
  const breweryTypes = breweries.reduce((acc, brewery) => {
    acc[brewery.brewery_type] = (acc[brewery.brewery_type] || 0) + 1;
    return acc;
  }, {});
  
  const mostPopularType = Object.keys(breweryTypes).reduce((a, b) => 
    breweryTypes[a] > breweryTypes[b] ? a : b, ''
  );
  
  // Count unique cities
  const uniqueCities = new Set(breweries.map(brewery => brewery.city));
  const totalCities = uniqueCities.size;
  
  // Count unique states
  const uniqueStates = new Set(breweries.map(brewery => brewery.state_province));
  const totalStates = uniqueStates.size;
  
  // Calculate breweries with websites
  const breweriesWithWebsites = breweries.filter(brewery => brewery.website_url);
  const websitePercentage = totalBreweries > 0 
    ? Math.round((breweriesWithWebsites.length / totalBreweries) * 100)
    : 0;
  
  // Calculate breweries with phone numbers
  const breweriesWithPhones = breweries.filter(brewery => brewery.phone);
  const phonePercentage = totalBreweries > 0 
    ? Math.round((breweriesWithPhones.length / totalBreweries) * 100)
    : 0;
  
  // Find most popular state
  const stateCounts = breweries.reduce((acc, brewery) => {
    acc[brewery.state_province] = (acc[brewery.state_province] || 0) + 1;
    return acc;
  }, {});
  
  const mostPopularState = Object.keys(stateCounts).reduce((a, b) => 
    stateCounts[a] > stateCounts[b] ? a : b, ''
  );

  // Calculate average user rating
  const userRatings = Object.values(ratings).filter(rating => rating > 0);
  const averageRating = userRatings.length > 0 
    ? (userRatings.reduce((sum, rating) => sum + rating, 0) / userRatings.length).toFixed(1)
    : 0;

  const stats = [
    {
      id: 'total',
      title: 'Total Breweries',
      value: totalBreweries,
      subtitle: `${filteredCount} shown`,
      icon: '🍺',
      color: '#667eea'
    },
    {
      id: 'recommendations',
      title: 'Recommendations',
      value: recommendationCount,
      subtitle: 'Personalized for you',
      icon: '🎯',
      color: '#4facfe'
    },
    {
      id: 'favorites',
      title: 'Your Favorites',
      value: favoritesCount,
      subtitle: 'Saved breweries',
      icon: '❤️',
      color: '#e74c3c'
    },
    {
      id: 'ratings',
      title: 'Avg Rating',
      value: averageRating > 0 ? `${averageRating}★` : 'No ratings',
      subtitle: `${userRatings.length} rated`,
      icon: '⭐',
      color: '#f39c12'
    },
    {
      id: 'popular',
      title: 'Most Popular Type',
      value: mostPopularType.replace(/_/g, ' ').toUpperCase(),
      subtitle: `${breweryTypes[mostPopularType] || 0} breweries`,
      icon: '🔥',
      color: '#fa709a'
    },
    {
      id: 'coverage',
      title: 'Geographic Coverage',
      value: `${totalStates} states`,
      subtitle: `${totalCities} cities`,
      icon: '🗺️',
      color: '#43e97b'
    }
  ];

  return (
    <div className="statistics">
      <h2 className="statistics-title">📊 Brewery Insights</h2>
      <div className="stats-grid">
        {stats.map(stat => (
          <div 
            key={stat.id} 
            className="stat-card"
            style={{ '--accent-color': stat.color }}
          >
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-title">{stat.title}</p>
              <p className="stat-subtitle">{stat.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Statistics; 