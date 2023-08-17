import { html } from 'lit';
import '../src/brewery-finder.js';

export default {
  title: 'BreweryFinder',
  component: 'brewery-finder',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ header, backgroundColor }) {
  return html`
    <brewery-finder
      style="--brewery-finder-background-color: ${backgroundColor || 'white'}"
      .header=${header}
    >
    </brewery-finder>
  `;
}

export const App = Template.bind({});
App.args = {
  header: 'My app',
};
