import React from 'react';
import './EventList.css';

function EventList({ breweries }) {
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

  return (
    <div className="event-list">
      <div className="event-list-header">
        <h2>🍺 Breweries ({breweries.length})</h2>
        <p>Discover amazing craft breweries and brewpubs</p>
      </div>
      
      <div className="events-grid">
        {breweries.map((brewery) => {
          const status = getBreweryStatus(brewery.brewery_type);
          
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
              </div>

              {/* Brewery Content */}
              <div className="event-content">
                <h3 className="event-title">{brewery.name}</h3>
                
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