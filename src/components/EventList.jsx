import React from 'react';
import './EventList.css';

function EventList({ breweries, favorites, ratings, onToggleFavorite, onRateBrewery, activeTab }) {
  const getBreweryTypeIcon = (type) => {
    const iconMap = {
      'micro': '🍺',
      'nano': '🍻',
      'regional': '🏭',
      'brewpub': '🍽️',
      'large': '🏪',
      'planning': '🚧',
      'contract': '🤝',
      'proprietor': '👨‍💼',
      'closed': '🔒',
      'bar': '🍻',
      'taproom': '🚰',
      'other': '🏢'
    };
    return iconMap[type] || iconMap['other'];
  };

  const getBreweryStatus = (type) => {
    const statusMap = {
      'micro': { level: 'Craft', emoji: '🍺', color: '#f39c12' },
      'nano': { level: 'Small', emoji: '🍻', color: '#3498db' },
      'regional': { level: 'Regional', emoji: '🏭', color: '#e74c3c' },
      'brewpub': { level: 'Brewpub', emoji: '🍽️', color: '#27ae60' },
      'large': { level: 'Large', emoji: '🏪', color: '#8e44ad' },
      'planning': { level: 'Planning', emoji: '🚧', color: '#f1c40f' },
      'contract': { level: 'Contract', emoji: '🤝', color: '#34495e' },
      'proprietor': { level: 'Proprietor', emoji: '👨‍💼', color: '#16a085' },
      'closed': { level: 'Closed', emoji: '🔒', color: '#95a5a6' },
      'bar': { level: 'Bar', emoji: '🍻', color: '#e67e22' },
      'taproom': { level: 'Taproom', emoji: '🚰', color: '#9b59b6' }
    };
    return statusMap[type] || { level: 'Other', emoji: '🏢', color: '#7f8c8d' };
  };

  if (breweries.length === 0) {
    return (
      <div className="event-list">
        <div className="no-events">
          <h3>🔍 No breweries found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      </div>
    );
  }

  const getTabTitle = () => {
    switch (activeTab) {
      case 'recommendations':
        return { title: '🎯 Personalized Recommendations', subtitle: 'Breweries tailored to your preferences' };
      case 'favorites':
        return { title: '❤️ Your Favorite Breweries', subtitle: 'Breweries you\'ve saved for later' };
      default:
        return { title: '🍺 All Breweries', subtitle: 'Discover amazing craft breweries and brewpubs' };
    }
  };

  const { title, subtitle } = getTabTitle();

  return (
    <div className="event-list">
      <div className="event-list-header">
        <h2>{title} ({breweries.length})</h2>
        <p>{subtitle}</p>
      </div>
      
      <div className="events-grid">
        {breweries.map((brewery) => {
          const status = getBreweryStatus(brewery.brewery_type);
          const isFavorite = favorites.includes(brewery.id);
          const userRating = ratings[brewery.id] || 0;
          
          return (
            <div key={brewery.id} className="event-card">
              {/* Brewery Image and Overlay Info */}
              <div className="event-image-container">
                <div className="brewery-placeholder">
                  <div className="brewery-icon">🍺</div>
                  <div className="brewery-name-overlay">{brewery.name}</div>
                </div>
                <div className="event-overlay">
                  <div className="event-type">
                    {getBreweryTypeIcon(brewery.brewery_type)} {brewery.brewery_type.replace(/_/g, ' ').toUpperCase()}
                  </div>
                  <div 
                    className="popularity-badge"
                    style={{ backgroundColor: status.color }}
                  >
                    {status.emoji} {status.level}
                  </div>
                </div>
                
                {/* Favorite Button */}
                <button 
                  className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                  onClick={() => onToggleFavorite(brewery.id)}
                  title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {isFavorite ? '❤️' : '🤍'}
                </button>
              </div>

              {/* Brewery Content */}
              <div className="event-content">
                <div className="brewery-header">
                  <h3 className="event-title">{brewery.name}</h3>
                  
                  {/* Rating System */}
                  <div className="rating-system">
                    <div className="rating-display">
                      {userRating > 0 && (
                        <span className="current-rating">
                          {'★'.repeat(userRating)}{'☆'.repeat(5 - userRating)}
                        </span>
                      )}
                    </div>
                    <div className="rating-buttons">
                      {[1, 2, 3, 4, 5].map(rating => (
                        <button
                          key={rating}
                          className={`rating-btn ${userRating >= rating ? 'active' : ''}`}
                          onClick={() => onRateBrewery(brewery.id, rating)}
                          title={`Rate ${rating} star${rating > 1 ? 's' : ''}`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Feature 1: Location Information */}
                <div className="event-feature">
                  <span className="feature-icon">📍</span>
                  <div className="feature-content">
                    <span className="feature-label">Location</span>
                    <span className="feature-value">
                      {brewery.city}, {brewery.state_province}
                    </span>
                  </div>
                </div>

                {/* Feature 2: Address Information */}
                <div className="event-feature">
                  <span className="feature-icon">🏠</span>
                  <div className="feature-content">
                    <span className="feature-label">Address</span>
                    <span className="feature-value">
                      {brewery.address_1 || 'Address not available'}
                    </span>
                  </div>
                </div>

                {/* Feature 3: Website Information */}
                <div className="event-feature">
                  <span className="feature-icon">🌐</span>
                  <div className="feature-content">
                    <span className="feature-label">Website</span>
                    <span className="feature-value">
                      {brewery.website_url ? (
                        <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">
                          Visit Website
                        </a>
                      ) : (
                        'No website listed'
                      )}
                    </span>
                  </div>
                </div>

                {/* Feature 4: Phone Information */}
                <div className="event-feature">
                  <span className="feature-icon">📞</span>
                  <div className="feature-content">
                    <span className="feature-label">Phone</span>
                    <span className="feature-value">
                      {brewery.phone || 'Phone not available'}
                    </span>
                  </div>
                </div>

                {/* Show recommendation score if in recommendations tab */}
                {activeTab === 'recommendations' && brewery.recommendationScore && (
                  <div className="event-feature">
                    <span className="feature-icon">🎯</span>
                    <div className="feature-content">
                      <span className="feature-label">Match Score</span>
                      <span className="feature-value">
                        {Math.round(brewery.recommendationScore * 20)}% match
                      </span>
                    </div>
                  </div>
                )}

                {/* Brewery Type and Action */}
                <div className="event-footer">
                  <div className="event-score">
                    <span className="score-label">Type:</span>
                    <span className="score-value">{brewery.brewery_type}</span>
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