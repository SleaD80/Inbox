/** @type { import('@storybook/react').Preview } */
// import './bootstrap/dist/css/bootstrap.min.css';
import './bootstrap/dist/css/bootstrap.min.css';
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;