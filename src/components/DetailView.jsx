import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './DetailView.css';

function DetailView({ breweries }) {
  const { id } = useParams();
  const [brewery, setBrewery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const findBrewery = () => {
      setLoading(true);
      
      if (breweries && breweries.length > 0) {
        const foundBrewery = breweries.find(b => b.id === id);
        if (foundBrewery) {
          setBrewery(foundBrewery);
          setError(null);
        } else {
          setError('Brewery not found');
        }
      } else {
        // If breweries not loaded yet, try to fetch this specific brewery
        fetchBreweryById(id);
      }
      setLoading(false);
    };

    const fetchBreweryById = async (breweryId) => {
      try {
        const response = await fetch(`https://api.openbrewerydb.org/v1/breweries/${breweryId}`);
        if (!response.ok) {
          throw new Error('Brewery not found');
        }
        const data = await response.json();
        setBrewery(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };

    findBrewery();
  }, [id, breweries]);

  if (loading) {
    return <div className="loading">Loading brewery details...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error">Error: {error}</div>
        <Link to="/" className="back-link">← Back to Dashboard</Link>
      </div>
    );
  }

  if (!brewery) {
    return (
      <div className="error-container">
        <div className="error">Brewery not found</div>
        <Link to="/" className="back-link">← Back to Dashboard</Link>
      </div>
    );
  }

  const formatAddress = (brewery) => {
    const parts = [];
    if (brewery.address_1) parts.push(brewery.address_1);
    if (brewery.address_2) parts.push(brewery.address_2);
    if (brewery.address_3) parts.push(brewery.address_3);
    if (brewery.city) parts.push(brewery.city);
    if (brewery.state_province) parts.push(brewery.state_province);
    if (brewery.postal_code) parts.push(brewery.postal_code);
    if (brewery.country) parts.push(brewery.country);
    return parts.join(', ');
  };

  const formatPhone = (phone) => {
    if (!phone) return null;
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  };

  const getTypeColor = (type) => {
    const colors = {
      micro: '#10b981',
      nano: '#f59e0b',
      regional: '#3b82f6',
      brewpub: '#8b5cf6',
      large: '#ef4444',
      planning: '#6b7280',
      contract: '#f97316',
      proprietor: '#06b6d4',
      closed: '#9ca3af'
    };
    return colors[type] || '#6b7280';
  };

  return (
    <div className="detail-view-container">
      <div className="detail-header">
        <Link to="/" className="back-link">← Back to Dashboard</Link>
        <h1 className="brewery-title">{brewery.name}</h1>
        <span 
          className="brewery-type-badge large"
          style={{ backgroundColor: getTypeColor(brewery.brewery_type) }}
        >
          {brewery.brewery_type?.charAt(0).toUpperCase() + brewery.brewery_type?.slice(1)}
        </span>
      </div>

      <div className="detail-content">
        <div className="detail-section">
          <h2>📍 Location Information</h2>
          <div className="detail-info">
            <p><strong>Full Address:</strong></p>
            <p>{formatAddress(brewery) || 'Address not available'}</p>
            
            {brewery.latitude && brewery.longitude && (
              <p><strong>Coordinates:</strong> {brewery.latitude}, {brewery.longitude}</p>
            )}
          </div>
        </div>

        <div className="detail-section">
          <h2>📞 Contact Information</h2>
          <div className="detail-info">
            {brewery.phone && (
              <p><strong>Phone:</strong> {formatPhone(brewery.phone)}</p>
            )}
            
            {brewery.website_url ? (
              <p>
                <strong>Website:</strong> 
                <a 
                  href={brewery.website_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="website-link"
                >
                  {brewery.website_url}
                </a>
              </p>
            ) : (
              <p><strong>Website:</strong> Not available</p>
            )}
          </div>
        </div>

        <div className="detail-section">
          <h2>🏪 Business Details</h2>
          <div className="detail-info">
            <p><strong>Brewery ID:</strong> {brewery.id}</p>
            <p><strong>Type:</strong> {brewery.brewery_type?.charAt(0).toUpperCase() + brewery.brewery_type?.slice(1)}</p>
            {brewery.created_at && (
              <p><strong>Added to Database:</strong> {new Date(brewery.created_at).toLocaleDateString()}</p>
            )}
            {brewery.updated_at && (
              <p><strong>Last Updated:</strong> {new Date(brewery.updated_at).toLocaleDateString()}</p>
            )}
          </div>
        </div>

        {/* Additional detailed information not shown on dashboard */}
        <div className="detail-section">
          <h2>ℹ️ Additional Information</h2>
          <div className="detail-info">
            <p><strong>Country:</strong> {brewery.country || 'Not specified'}</p>
            <p><strong>State/Province:</strong> {brewery.state_province || 'Not specified'}</p>
            <p><strong>City:</strong> {brewery.city || 'Not specified'}</p>
            {brewery.postal_code && (
              <p><strong>Postal Code:</strong> {brewery.postal_code}</p>
            )}
          </div>
        </div>

        {/* Open in Maps link if coordinates available */}
        {brewery.latitude && brewery.longitude && (
          <div className="detail-section">
            <h2>🗺️ Location Actions</h2>
            <div className="detail-info">
              <a
                href={`https://www.google.com/maps?q=${brewery.latitude},${brewery.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="maps-link"
              >
                📍 View on Google Maps
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailView; 