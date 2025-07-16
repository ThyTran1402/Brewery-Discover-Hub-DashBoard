import React from 'react';
import './EventList.css';

function EventList({ events }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getEventTypeIcon = (type) => {
    const iconMap = {
      'concert': '🎵',
      'sports': '⚽',
      'theater': '🎭',
      'comedy': '😂',
      'festival': '🎪',
      'family': '👨‍👩‍👧‍👦',
      'conference': '💼',
      'classical': '🎼',
      'dance': '💃',
      'other': '🎯'
    };
    return iconMap[type] || iconMap['other'];
  };

  const getPopularityLevel = (score) => {
    if (score >= 0.8) return { level: 'Hot', emoji: '🔥', color: '#e74c3c' };
    if (score >= 0.6) return { level: 'Popular', emoji: '⭐', color: '#f39c12' };
    if (score >= 0.4) return { level: 'Good', emoji: '👍', color: '#27ae60' };
    return { level: 'Normal', emoji: '👌', color: '#3498db' };
  };

  if (events.length === 0) {
    return (
      <div className="event-list">
        <div className="no-events">
          <h3>🔍 No events found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      </div>
    );
  }

  return (
    <div className="event-list">
      <div className="event-list-header">
        <h2>🎫 Events ({events.length})</h2>
        <p>Discover amazing live experiences</p>
      </div>
      
      <div className="events-grid">
        {events.map((event) => {
          const popularity = getPopularityLevel(event.score);
          
          return (
            <div key={event.id} className="event-card">
              {/* Event Image and Overlay Info */}
              <div className="event-image-container">
                {event.performers && event.performers[0] && event.performers[0].image && (
                  <img 
                    src={event.performers[0].image} 
                    alt={event.title}
                    className="event-image"
                  />
                )}
                <div className="event-overlay">
                  <div className="event-type">
                    {getEventTypeIcon(event.type)} {event.type.replace(/_/g, ' ').toUpperCase()}
                  </div>
                  <div 
                    className="popularity-badge"
                    style={{ backgroundColor: popularity.color }}
                  >
                    {popularity.emoji} {popularity.level}
                  </div>
                </div>
              </div>

              {/* Event Content */}
              <div className="event-content">
                <h3 className="event-title">{event.title}</h3>
                
                {/* Feature 1: Date and Time Info */}
                <div className="event-feature">
                  <span className="feature-icon">📅</span>
                  <div className="feature-content">
                    <span className="feature-label">Date & Time</span>
                    <span className="feature-value">
                      {formatDate(event.datetime_local)} at {formatTime(event.datetime_local)}
                    </span>
                  </div>
                </div>

                {/* Feature 2: Venue Information */}
                <div className="event-feature">
                  <span className="feature-icon">📍</span>
                  <div className="feature-content">
                    <span className="feature-label">Venue</span>
                    <span className="feature-value">
                      {event.venue.name} • {event.venue.city}, {event.venue.state}
                    </span>
                  </div>
                </div>

                {/* Feature 3: Pricing Information */}
                <div className="event-feature">
                  <span className="feature-icon">💰</span>
                  <div className="feature-content">
                    <span className="feature-label">Price Range</span>
                    <span className="feature-value">
                      {event.stats && event.stats.lowest_price 
                        ? `$${event.stats.lowest_price} - $${event.stats.highest_price || 'VIP'}`
                        : 'Price TBA'
                      }
                    </span>
                  </div>
                </div>

                {/* Feature 4: Availability Status */}
                <div className="event-feature">
                  <span className="feature-icon">🎟️</span>
                  <div className="feature-content">
                    <span className="feature-label">Availability</span>
                    <span className="feature-value">
                      {event.stats && event.stats.listing_count 
                        ? `${event.stats.listing_count} listings available`
                        : 'Check availability'
                      }
                    </span>
                  </div>
                </div>

                {/* Event Score and Action */}
                <div className="event-footer">
                  <div className="event-score">
                    <span className="score-label">Score:</span>
                    <span className="score-value">{(event.score * 100).toFixed(0)}%</span>
                  </div>
                  <button className="view-event-btn">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EventList; 