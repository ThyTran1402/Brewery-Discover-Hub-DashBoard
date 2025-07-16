import React from 'react';
import './Statistics.css';

function Statistics({ breweries, filteredBreweries }) {
  // Calculate various statistics
  const totalBreweries = breweries.length;
  const filteredCount = filteredBreweries.length;
  
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
      id: 'popular',
      title: 'Most Popular Type',
      value: mostPopularType.replace(/_/g, ' ').toUpperCase(),
      subtitle: `${breweryTypes[mostPopularType] || 0} breweries`,
      icon: '🔥',
      color: '#4facfe'
    },
    {
      id: 'cities',
      title: 'Cities',
      value: totalCities,
      subtitle: 'Unique locations',
      icon: '🏙️',
      color: '#fa709a'
    },
    {
      id: 'states',
      title: 'States',
      value: totalStates,
      subtitle: mostPopularState ? `${mostPopularState} leads` : 'Coverage',
      icon: '🗺️',
      color: '#43e97b'
    },
    {
      id: 'websites',
      title: 'Online Presence',
      value: `${websitePercentage}%`,
      subtitle: 'Have websites',
      icon: '🌐',
      color: '#f093fb'
    },
    {
      id: 'contact',
      title: 'Contactable',
      value: `${phonePercentage}%`,
      subtitle: 'Have phone numbers',
      icon: '📞',
      color: '#ffecd2'
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