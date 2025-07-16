# Web Development Project 5 - *Brewery Discover Hub*

Submitted by: **Thy Tran**

This web app: **A React-based data dashboard that displays brewery information from the Open Brewery DB API. This interactive dashboard provides summary statistics, search functionality, and filtering capabilities to explore brewery data from around the world.**

Time spent: **6** hours spent in total

## Required Features

The following **required** functionality is completed:

- [X] **The site has a dashboard displaying a list of data fetched using an API call**
  - The dashboard should display at least 10 unique items, one per row
  - The dashboard includes at least two features in each row
- [X] **`useEffect` React hook and `async`/`await` are used**
- [X] **The app dashboard includes at least three summary statistics about the data** 
  - The app dashboard includes at least three summary statistics about the data, such as:
    - *insert details here*
- [X] **A search bar allows the user to search for an item in the fetched data**
  - The search bar **correctly** filters items in the list, only displaying items matching the search query
  - The list of results dynamically updates as the user types into the search bar
- [X] **An additional filter allows the user to restrict displayed items by specified categories**
  - The filter restricts items in the list using a **different attribute** than the search bar 
  - The filter **correctly** filters items in the list, only displaying items matching the filter attribute in the dashboard
  - The dashboard list dynamically updates as the user adjusts the filter

The following **optional** features are implemented:

- [X] Multiple filters can be applied simultaneously
- [X] Filters use different input types
  - e.g., as a text input, a dropdown or radio selection, and/or a slider
- [X] The user can enter specific bounds for filter values

The following **additional** features are implemented:

* [X] List anything else that you added to improve the site's functionality!


## Data Source

This project uses the [Open Brewery DB API](https://www.openbrewerydb.org/) to fetch real-time brewery data. The API provides information about:
- Brewery names and locations
- Brewery types (micro, nano, regional, brewpub, etc.)
- Contact information (phone, website)
- Geographic data (city, state, country)

## Project Structure

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

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='/src/Project5CodePath.gif/' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with [ScreenToGif](https://www.screentogif.com/) for Windows


## Notes

Describe any challenges encountered while building the app.
- I troubleshoot complex state management with multi-filter logic with 7 different filter states while ensuring they all work together.
- I ran into trouble with API integration and fetched the API at first, with some of the brewery records having null or missing values for some of the fields 
- The performance for multi-filters can be slow with large datasets

## License

    Copyright [2025] [Thy Tran made with ❤️]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.













