import Dropdown from '../components/UI/Dropdown';

export default {
  title: 'UI/Dropdown',
  component: Dropdown,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

export const Default = {
  args: {
    label: 'Выпадающий список',
    options: [
      { label: 'Действие 1', handleClick: () => console.log('Action 1') },
      { label: 'Действие 2', handleClick: () => console.log('Action 2') },
      { label: 'Действие 3', handleClick: () => console.log('Action 3') },
    ],
  },
};
