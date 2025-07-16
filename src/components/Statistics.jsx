import React from 'react';
import './Statistics.css';

function Statistics({ events, filteredEvents }) {
  // Calculate various statistics
  const totalEvents = events.length;
  const filteredCount = filteredEvents.length;
  
  // Calculate average score
  const averageScore = events.length > 0 
    ? (events.reduce((sum, event) => sum + event.score, 0) / events.length).toFixed(1)
    : 0;
  
  // Find most popular event type
  const eventTypes = events.reduce((acc, event) => {
    acc[event.type] = (acc[event.type] || 0) + 1;
    return acc;
  }, {});
  
  const mostPopularType = Object.keys(eventTypes).reduce((a, b) => 
    eventTypes[a] > eventTypes[b] ? a : b, ''
  );
  
  // Calculate average price (from lowest available ticket)
  const pricesWithTickets = events
    .filter(event => event.stats && event.stats.lowest_price)
    .map(event => event.stats.lowest_price);
  
  const averagePrice = pricesWithTickets.length > 0
    ? Math.round(pricesWithTickets.reduce((sum, price) => sum + price, 0) / pricesWithTickets.length)
    : 0;
  
  // Count unique cities
  const uniqueCities = new Set(events.map(event => event.venue.city));
  const totalCities = uniqueCities.size;
  
  // Calculate score range
  const scores = events.map(event => event.score);
  const highestScore = scores.length > 0 ? Math.max(...scores).toFixed(1) : 0;
  const lowestScore = scores.length > 0 ? Math.min(...scores).toFixed(1) : 0;

  const stats = [
    {
      id: 'total',
      title: 'Total Events',
      value: totalEvents,
      subtitle: `${filteredCount} shown`,
      icon: '🎫',
      color: '#667eea'
    },
    {
      id: 'score',
      title: 'Average Score',
      value: averageScore,
      subtitle: `Range: ${lowestScore} - ${highestScore}`,
      icon: '⭐',
      color: '#f093fb'
    },
    {
      id: 'popular',
      title: 'Most Popular',
      value: mostPopularType.replace(/_/g, ' ').toUpperCase(),
      subtitle: `${eventTypes[mostPopularType] || 0} events`,
      icon: '🔥',
      color: '#4facfe'
    },
    {
      id: 'price',
      title: 'Avg Price',
      value: averagePrice > 0 ? `$${averagePrice}` : 'N/A',
      subtitle: `${pricesWithTickets.length} events priced`,
      icon: '💰',
      color: '#43e97b'
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
      id: 'availability',
      title: 'Available',
      value: `${Math.round((pricesWithTickets.length / totalEvents) * 100)}%`,
      subtitle: 'Events with tickets',
      icon: '🎟️',
      color: '#ffecd2'
    }
  ];

  return (
    <div className="statistics">
      <h2 className="statistics-title">📊 Event Insights</h2>
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