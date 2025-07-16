# 🍺 Brewery Discover Hub

A React-based data dashboard that displays brewery information from the Open Brewery DB API. This interactive dashboard provides summary statistics, search functionality, and filtering capabilities to explore brewery data from around the world.

## 🌟 Features

### Required Features ✅
- **Dashboard with List View**: Displays at least 10 unique brewery items with 2+ features per row
- **API Integration**: Fetches data using `useEffect` React hook and `async/await` syntax
- **Summary Statistics**: Shows 5 key statistics about the brewery data:
  - Total number of breweries
  - Most common brewery type
  - Top location by brewery count
  - Number of countries represented
  - Percentage of breweries with websites
- **Search Functionality**: Dynamic search bar that filters breweries by name, city, or state
- **Category Filter**: Dropdown filter for brewery types (micro, nano, regional, etc.)
- **Real-time Updates**: Both search and filter update the display dynamically

### Additional Features
- **Responsive Design**: Mobile-friendly layout that adapts to different screen sizes
- **Modern UI**: Clean, professional interface with hover effects and animations
- **Color-coded Types**: Different colors for different brewery types
- **Interactive Elements**: Clickable website links and formatted contact information
- **Error Handling**: Graceful error states and loading indicators

## 🛠️ Technologies Used

- **React 18.2.0**: Component-based UI library
- **React Hooks**: useState, useEffect for state management and side effects
- **CSS3**: Modern styling with Grid, Flexbox, and animations
- **Open Brewery DB API**: Real-time brewery data source
- **JavaScript ES6+**: Modern JavaScript features

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd brewery-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## 📊 Data Source

This project uses the [Open Brewery DB API](https://www.openbrewerydb.org/) to fetch real-time brewery data. The API provides information about:
- Brewery names and locations
- Brewery types (micro, nano, regional, brewpub, etc.)
- Contact information (phone, website)
- Geographic data (city, state, country)

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Statistics.jsx          # Summary statistics component
│   ├── Statistics.css
│   ├── SearchBar.jsx          # Search functionality
│   ├── SearchBar.css
│   ├── CategoryFilter.jsx     # Type filter dropdown
│   ├── CategoryFilter.css
│   ├── BreweryList.jsx        # Main list display
│   └── BreweryList.css
├── App.js                     # Main app component
├── App.css                    # App-specific styles
├── index.js                   # React entry point
└── index.css                  # Global styles
```

## 🎨 UI/UX Features

- **Gradient Header**: Eye-catching header with brewery emoji
- **Card-based Layout**: Clean card design for each brewery
- **Hover Effects**: Interactive feedback on hover
- **Color Coding**: Different colors for different brewery types
- **Responsive Grid**: Adapts to different screen sizes
- **Loading States**: User-friendly loading indicators
- **No Results State**: Helpful message when no breweries match criteria

## 🔧 API Integration

The app fetches brewery data using modern JavaScript patterns:

```javascript
const fetchBreweries = async () => {
  try {
    const response = await fetch('https://api.openbrewerydb.org/v1/breweries?per_page=50');
    const data = await response.json();
    setBreweries(data);
  } catch (error) {
    setError(error.message);
  }
};
```

## 🧮 Statistics Calculated

1. **Total Breweries**: Count of all fetched breweries
2. **Most Common Type**: Brewery type with highest count
3. **Top Location**: State/province with most breweries
4. **Countries**: Number of unique countries represented
5. **Website Coverage**: Percentage of breweries with websites

## 🔍 Search & Filter Features

- **Search Bar**: 
  - Searches across brewery names, cities, and states
  - Real-time filtering as user types
  - Clear button to reset search

- **Category Filter**:
  - Dropdown with all brewery types
  - Filters independent of search
  - Shows all types available in dataset

## 📱 Responsive Design

The dashboard is fully responsive and includes:
- Mobile-first CSS approach
- Flexible grid layouts
- Optimized touch targets
- Readable typography at all sizes

## 🚀 Future Enhancements

- [ ] Map integration for brewery locations
- [ ] Additional sorting options
- [ ] Detailed brewery view with more information
- [ ] Export functionality for filtered data
- [ ] Dark mode toggle
- [ ] Advanced filtering (by state, country, etc.)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Open Brewery DB](https://www.openbrewerydb.org/) for providing the API
- React team for the excellent framework
- CodePath WEB102 course for the project requirements 