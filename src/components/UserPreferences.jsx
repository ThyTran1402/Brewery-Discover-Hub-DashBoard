import React, { useState } from 'react';
import './UserPreferences.css';

function UserPreferences({ preferences, onPreferencesChange, breweries }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Get unique brewery types and states from data
  const breweryTypes = [...new Set(breweries.map(b => b.brewery_type))].sort();
  const states = [...new Set(breweries.map(b => b.state_province))].sort();

  const handleTypeToggle = (type) => {
    const newTypes = preferences.preferredTypes.includes(type)
      ? preferences.preferredTypes.filter(t => t !== type)
      : [...preferences.preferredTypes, type];
    
    onPreferencesChange({ ...preferences, preferredTypes: newTypes });
  };

  const handleStateToggle = (state) => {
    const newStates = preferences.preferredStates.includes(state)
      ? preferences.preferredStates.filter(s => s !== state)
      : [...preferences.preferredStates, state];
    
    onPreferencesChange({ ...preferences, preferredStates: newStates });
  };

  const resetPreferences = () => {
    onPreferencesChange({
      preferredTypes: ['micro', 'brewpub'],
      preferredStates: [],
      minRating: 0,
      maxDistance: 50
    });
  };

  const getTypeIcon = (type) => {
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
      'taproom': '🚰'
    };
    return iconMap[type] || '🏢';
  };

  return (
    <div className="user-preferences">
      <div className="preferences-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h3>🎯 Your Preferences</h3>
        <span className="expand-icon">{isExpanded ? '▼' : '▶'}</span>
      </div>
      
      {isExpanded && (
        <div className="preferences-content">
          <div className="preference-section">
            <h4>🍺 Preferred Brewery Types</h4>
            <div className="preference-options">
              {breweryTypes.map(type => (
                <button
                  key={type}
                  className={`preference-chip ${preferences.preferredTypes.includes(type) ? 'active' : ''}`}
                  onClick={() => handleTypeToggle(type)}
                >
                  {getTypeIcon(type)} {type.replace(/_/g, ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="preference-section">
            <h4>📍 Preferred States</h4>
            <div className="preference-options">
              {states.slice(0, 10).map(state => (
                <button
                  key={state}
                  className={`preference-chip ${preferences.preferredStates.includes(state) ? 'active' : ''}`}
                  onClick={() => handleStateToggle(state)}
                >
                  {state}
                </button>
              ))}
            </div>
            <p className="preference-note">
              {preferences.preferredStates.length === 0 ? 'No state preference (all states)' : 
               `${preferences.preferredStates.length} state(s) selected`}
            </p>
          </div>

          <div className="preference-section">
            <h4>⭐ Minimum Rating</h4>
            <div className="rating-selector">
              {[0, 1, 2, 3, 4, 5].map(rating => (
                <button
                  key={rating}
                  className={`rating-button ${preferences.minRating === rating ? 'active' : ''}`}
                  onClick={() => onPreferencesChange({ ...preferences, minRating: rating })}
                >
                  {rating === 0 ? 'Any' : '★'.repeat(rating)}
                </button>
              ))}
            </div>
          </div>

          <div className="preference-actions">
            <button className="reset-btn" onClick={resetPreferences}>
              🔄 Reset to Default
            </button>
            <div className="preference-summary">
              <span>Types: {preferences.preferredTypes.length}</span>
              <span>States: {preferences.preferredStates.length || 'All'}</span>
              <span>Min Rating: {preferences.minRating || 'Any'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserPreferences; 