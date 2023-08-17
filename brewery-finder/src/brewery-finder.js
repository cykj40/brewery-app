import { LitElement, html } from 'lit';

class BreweryFinder extends LitElement {
  static get properties() {
    return {
      loading: { type: Boolean },
      breweries: { type: Array },
      visitedCount: { type: Number },
      remainingCount: { type: Number },
    };
  }

  constructor() {
    super();
    this.loading = false;
    this.breweries = [];
    this.visitedCount = 0;
    this.remainingCount = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchBreweries();
  }

  async fetchBreweries() {
    try {
      this.loading = true;
      const response = await fetch(
        'https://api.openbrewerydb.org/breweries?by_city=minneapolis'
      );
      const json = await response.json();
      this.breweries = json;
      this.loading = false;

      // Calculate the visited and remaining counts
      this.visitedCount = this.breweries.filter(
        brewery => brewery.visited
      ).length;
      this.remainingCount = this.breweries.length - this.visitedCount;
    } catch (error) {
      console.error('Error fetching breweries:', error);
      this.loading = false;
    }
  }

  render() {
    return html`
      <h1>Brewery Finder</h1>

      <h2>Breweries</h2>

      <p>${this.visitedCount} breweries visited</p>
      <p>${this.remainingCount} breweries left to visit</p>

      <ul>
        ${this.breweries.map(
          brewery => html`
            <li>
              ${brewery.name}
              <button
                @click="${() => this.toggleVisitedStatus(brewery)}"
                ?disabled="${this.loading}"
              >
                ${brewery.visited ? 'Visited' : 'Not Visited'}
              </button>
            </li>
          `
        )}
      </ul>
    `;
  }

  toggleVisitedStatus(breweryToUpdate) {
    this.breweries = this.breweries.map(brewery =>
      brewery === breweryToUpdate
        ? { ...brewery, visited: !brewery.visited }
        : brewery
    );

    // Recalculate the visited and remaining counts after toggling
    this.visitedCount = this.breweries.filter(
      brewery => brewery.visited
    ).length;
    this.remainingCount = this.breweries.length - this.visitedCount;
  }
}

customElements.define('brewery-finder', BreweryFinder);
