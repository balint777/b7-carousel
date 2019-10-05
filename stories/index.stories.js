import { storiesOf, html, withKnobs, withClassPropertiesKnobs } from '@open-wc/demoing-storybook';

import { B7Carousel } from '../src/B7Carousel.js';
import '../b7-carousel.js';

storiesOf('b7-carousel', module)
  .addDecorator(withKnobs)
  .add('Documentation', () => withClassPropertiesKnobs(B7Carousel))
  .add(
    'Alternative Title',
    () => html`
      <b7-carousel .title=${'Something else'}></b7-carousel>
    `,
  );
