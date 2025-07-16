import React from 'react';
import './Statistics.css';

function Statistics({ breweries }) {
  if (!breweries || breweries.length === 0) {
    return null;
  }

  // Calculate statistics
  const totalBreweries = breweries.length;
  
  // Most common brewery type
  const typeCount = breweries.reduce((acc, brewery) => {
    const type = brewery.brewery_type || 'unknown';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});
  
  const mostCommonType = Object.entries(typeCount).reduce((a, b) => 
    typeCount[a[0]] > typeCount[b[0]] ? a : b
  );

  // Most common state/province
  const stateCount = breweries.reduce((acc, brewery) => {
    const state = brewery.state_province || 'unknown';
    acc[state] = (acc[state] || 0) + 1;
    return acc;
  }, {});
  
  const mostCommonState = Object.entries(stateCount).reduce((a, b) => 
    stateCount[a[0]] > stateCount[b[0]] ? a : b
  );

  // Count breweries by country
  const countryCount = breweries.reduce((acc, brewery) => {
    const country = brewery.country || 'unknown';
    acc[country] = (acc[country] || 0) + 1;
    return acc;
  }, {});
  
  const totalCountries = Object.keys(countryCount).length;

  // Breweries with websites
  const breweriesWithWebsite = breweries.filter(brewery => brewery.website_url).length;
  const websitePercentage = Math.round((breweriesWithWebsite / totalBreweries) * 100);

  return (
    <div className="statistics-container">
      <h2>📊 Brewery Statistics</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{totalBreweries}</div>
          <div className="stat-label">Total Breweries</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{mostCommonType[1]}</div>
          <div className="stat-label">Most Common Type</div>
          <div className="stat-description">
            {mostCommonType[0].charAt(0).toUpperCase() + mostCommonType[0].slice(1)} breweries
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{mostCommonState[1]}</div>
          <div className="stat-label">Top Location</div>
          <div className="stat-description">
            Breweries in {mostCommonState[0]}
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{totalCountries}</div>
          <div className="stat-label">Countries</div>
          <div className="stat-description">
            Represented in dataset
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{websitePercentage}%</div>
          <div className="stat-label">Have Websites</div>
          <div className="stat-description">
            {breweriesWithWebsite} of {totalBreweries} breweries
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics; 