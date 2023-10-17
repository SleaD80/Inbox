/** @type { import('@storybook/react').Preview } */
import '../public/materia/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { withThemeByDataAttribute } from '@storybook/addon-styling';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import rootReducer from '../src/reducers';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      expanded: true,
      hideNoControlsWarning: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

export const decorators = [
  withThemeByDataAttribute({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
    attributeName: 'data-bs-theme',
  }),
];

export default preview;
