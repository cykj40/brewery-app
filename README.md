# 🍺 Brewery Finder

A web application that helps you discover and track breweries in different cities. Built with Lit Element and the Open Brewery DB API.

## Features

- Search for breweries by city name
- View brewery details including address and website
- Track visited/unvisited breweries
- Clean, responsive interface
- Running count of visited breweries

## 🚀 Getting Started

### Prerequisites

- Node.js (v10 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
2. bash
3. git clone https://github.com/yourusername/brewery-finder.git
4. cd brewery-finder
5. npm i
6. Start the development server:
   npm start

The application will be available at `http://localhost:8000`

## 📝 Available Scripts

Reference to package.json:
"lint": "eslint --ext .js,.html . --ignore-path .gitignore && prettier \"**/*.js\" --check --ignore-path .gitignore",
    "format": "eslint --ext .js,.html . --fix --ignore-path .gitignore && prettier \"**/*.js\" --write --ignore-path .gitignore",
    "test": "web-test-runner --coverage",
    "test:watch": "web-test-runner --watch",
    "storybook": "npm run analyze -- --exclude dist && web-dev-server -c .storybook/server.mjs",
    "storybook:build": "npm run analyze -- --exclude dist && build-storybook",
    "build": "rimraf dist && rollup -c rollup.config.js && npm run analyze -- --exclude dist",
    "start:build": "web-dev-server --root-dir dist --app-index index.html --open",
    "analyze": "cem analyze --litelement",
    "start": "web-dev-server"


## 🛠️ Built With

- [Lit](https://lit.dev/) - For creating fast, lightweight web components
- [Open Brewery DB](https://www.openbrewerydb.org/) - Free brewery data API
- [Open WC](https://open-wc.org/) - Web components development tools

## 💡 Usage

1. Enter a city name in the search bar
2. Press Enter or click the Search button
3. Browse through the list of breweries
4. Click "Mark as Visited" to track breweries you've been to
5. Use the counter at the top to track your progress

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.
