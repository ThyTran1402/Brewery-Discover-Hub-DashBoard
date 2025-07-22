import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import './DataVisualization.css';

function DataVisualization({ breweries, filteredBreweries }) {
  if (!breweries || breweries.length === 0) {
    return (
      <div className="visualization-loading">
        <p>Loading data visualizations...</p>
      </div>
    );
  }

  const dataToUse = filteredBreweries || breweries;

  // Chart 1: Brewery Types Distribution (Bar Chart)
  const breweryTypeData = dataToUse.reduce((acc, brewery) => {
    const type = brewery.brewery_type || 'unknown';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const typeChartData = Object.entries(breweryTypeData)
    .map(([type, count]) => ({
      type: type.charAt(0).toUpperCase() + type.slice(1),
      count,
      fill: getTypeColor(type)
    }))
    .sort((a, b) => b.count - a.count);

  // Chart 2: Top States/Provinces (Horizontal Bar Chart)
  const stateData = dataToUse.reduce((acc, brewery) => {
    const state = brewery.state_province || 'Unknown';
    acc[state] = (acc[state] || 0) + 1;
    return acc;
  }, {});

  const topStatesData = Object.entries(stateData)
    .map(([state, count]) => ({ state, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8); // Top 8 states

  // Chart 3: Country Distribution (Pie Chart)
  const countryData = dataToUse.reduce((acc, brewery) => {
    const country = brewery.country || 'Unknown';
    acc[country] = (acc[country] || 0) + 1;
    return acc;
  }, {});

  const countryChartData = Object.entries(countryData).map(([country, count], index) => ({
    name: country,
    value: count,
    fill: `hsl(${index * 45}, 70%, 60%)`
  }));

  // Chart 4: Website Availability Analysis (Area Chart)
  const websiteAnalysis = () => {
    const typeWebsiteData = {};
    
    dataToUse.forEach(brewery => {
      const type = brewery.brewery_type || 'unknown';
      if (!typeWebsiteData[type]) {
        typeWebsiteData[type] = { total: 0, withWebsite: 0 };
      }
      typeWebsiteData[type].total++;
      if (brewery.website_url) {
        typeWebsiteData[type].withWebsite++;
      }
    });

    return Object.entries(typeWebsiteData)
      .map(([type, data]) => ({
        type: type.charAt(0).toUpperCase() + type.slice(1),
        total: data.total,
        withWebsite: data.withWebsite,
        percentage: Math.round((data.withWebsite / data.total) * 100)
      }))
      .sort((a, b) => b.total - a.total);
  };

  const websiteData = websiteAnalysis();

  function getTypeColor(type) {
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
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="data-visualization-container">
      <h2>📊 Data Insights & Visualizations</h2>
      <p className="viz-subtitle">
        {dataToUse.length === breweries.length 
          ? 'Analyzing all brewery data' 
          : `Analyzing ${dataToUse.length} filtered results`}
      </p>
      
      <div className="charts-grid">
        {/* Chart 1: Brewery Types Distribution */}
        <div className="chart-container">
          <h3>🍺 Brewery Types Distribution</h3>
          <p className="chart-description">
            Shows the count of different brewery types in the dataset
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={typeChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 2: Top States/Provinces */}
        <div className="chart-container">
          <h3>🗺️ Top Locations by Brewery Count</h3>
          <p className="chart-description">
            Geographic distribution showing states/provinces with most breweries
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart 
              data={topStatesData} 
              layout="horizontal"
              margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="state" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 3: Country Distribution */}
        <div className="chart-container">
          <h3>🌍 Global Distribution</h3>
          <p className="chart-description">
            Breakdown of breweries by country
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={countryChartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {countryChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 4: Website Availability Analysis */}
        <div className="chart-container">
          <h3>🌐 Digital Presence Analysis</h3>
          <p className="chart-description">
            Percentage of breweries with websites by type
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={websiteData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="percentage" 
                stroke="#8b5cf6" 
                fill="#8b5cf6" 
                fillOpacity={0.6} 
              />
              <Area 
                type="monotone" 
                dataKey="total" 
                stroke="#3b82f6" 
                fill="#3b82f6" 
                fillOpacity={0.3} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="insights-summary">
        <h3>🔍 Key Insights</h3>
        <div className="insights-grid">
          <div className="insight-card">
            <h4>Most Common Type</h4>
            <p>{typeChartData[0]?.type} breweries lead with {typeChartData[0]?.count} locations</p>
          </div>
          <div className="insight-card">
            <h4>Geographic Leader</h4>
            <p>{topStatesData[0]?.state} has the most breweries ({topStatesData[0]?.count})</p>
          </div>
          <div className="insight-card">
            <h4>Digital Adoption</h4>
            <p>{Math.round((dataToUse.filter(b => b.website_url).length / dataToUse.length) * 100)}% of breweries have websites</p>
          </div>
          <div className="insight-card">
            <h4>Dataset Coverage</h4>
            <p>{Object.keys(countryData).length} countries represented</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataVisualization; 