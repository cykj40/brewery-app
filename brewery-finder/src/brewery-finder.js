import { LitElement, html, css } from 'lit';

class BreweryFinder extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
      font-family: Arial, sans-serif;
    }

    .search-container {
      margin-bottom: 2rem;
    }

    input {
      padding: 0.5rem;
      font-size: 1rem;
      width: 60%;
      margin-right: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    button {
      padding: 0.5rem 1rem;
      background-color: #4caf50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    button:hover {
      background-color: #45a049;
    }

    button:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }

    ul {
      list-style: none;
      padding: 0;
    }

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      margin: 0.5rem 0;
      background-color: white;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .brewery-info {
      flex: 1;
    }

    .brewery-name {
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    .brewery-address {
      color: #666;
      font-size: 0.9rem;
    }

    .error-message {
      color: red;
      padding: 1rem;
      background-color: #ffebee;
      border-radius: 4px;
      margin: 1rem 0;
    }
  `;

  static get properties() {
    return {
      loading: { type: Boolean },
      breweries: { type: Array },
      visitedCount: { type: Number },
      remainingCount: { type: Number },
      searchCity: { type: String },
      error: { type: String },
    };
  }

  constructor() {
    super();
    this.loading = false;
    this.breweries = [];
    this.visitedCount = 0;
    this.remainingCount = 0;
    this.searchCity = '';
    this.error = '';
  }

  updateCounts() {
    this.visitedCount = this.breweries.filter(
      brewery => brewery.visited
    ).length;
    this.remainingCount = this.breweries.length - this.visitedCount;
  }

  async fetchBreweries() {
    if (!this.searchCity.trim()) {
      this.error = 'Please enter a city name';
      return;
    }

    try {
      this.loading = true;
      this.error = '';
      const cityName = this.searchCity.trim().toLowerCase();
      const url = `https://api.openbrewerydb.org/v1/breweries?by_city=${encodeURIComponent(
        cityName
      )}&per_page=50`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      let json = [];

      if (text.trim()) {
        try {
          json = JSON.parse(text);
        } catch (e) {
          throw new Error('Invalid JSON response from API');
        }
      }

      if (!Array.isArray(json) || json.length === 0) {
        this.error = `No breweries found in ${this.searchCity}`;
        this.breweries = [];
      } else {
        this.breweries = json.map(brewery => ({
          name: brewery.name || 'Unknown Name',
          street: brewery.street || '',
          city: brewery.city || '',
          state: brewery.state || '',
          website_url: brewery.website_url || '',
          visited: false,
        }));
      }
      this.updateCounts();
    } catch (error) {
      this.error = 'Error fetching breweries: ' + error.message;
      this.breweries = [];
    } finally {
      this.loading = false;
    }
  }

  toggleVisitedStatus(breweryToUpdate) {
    this.breweries = this.breweries.map(brewery =>
      brewery === breweryToUpdate
        ? { ...brewery, visited: !brewery.visited }
        : brewery
    );
    this.updateCounts();
  }

  render() {
    const handleInput = e => {
      this.searchCity = e.target.value;
    };

    const renderContent = () => {
      if (this.breweries.length > 0) {
        return html`
          <div class="stats">
            <p>${this.visitedCount} breweries visited</p>
            <p>${this.remainingCount} breweries left to visit</p>
          </div>
          <ul>
            ${this.breweries.map(
              brewery => html`
                <li>
                  <div class="brewery-info">
                    <div class="brewery-name">${brewery.name}</div>
                    <div class="brewery-address">
                      ${brewery.street || ''} ${brewery.city}, ${brewery.state}
                      ${brewery.website_url
                        ? html`
                            <br /><a
                              href="${brewery.website_url}"
                              target="_blank"
                              >Website</a
                            >
                          `
                        : ''}
                    </div>
                  </div>
                  <button
                    @click="${() => this.toggleVisitedStatus(brewery)}"
                    ?disabled="${this.loading}"
                    style="background-color: ${brewery.visited
                      ? '#666'
                      : '#4CAF50'}"
                  >
                    ${brewery.visited ? 'Visited' : 'Mark as Visited'}
                  </button>
                </li>
              `
            )}
          </ul>
        `;
      }
      if (this.error) {
        return '';
      }
      return html`<p>No breweries found. Try searching for a city!</p>`;
    };

    return html`
      <h1>Brewery Finder</h1>

      <div class="search-container">
        <input
          type="text"
          .value="${this.searchCity}"
          @input="${handleInput}"
          placeholder="Enter city name..."
          @keyup="${e => e.key === 'Enter' && this.fetchBreweries()}"
        />
        <button @click="${this.fetchBreweries}" ?disabled="${this.loading}">
          ${this.loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      ${this.error ? html`<div class="error-message">${this.error}</div>` : ''}
      ${renderContent()}
    `;
  }
}

customElements.define('brewery-finder', BreweryFinder);
