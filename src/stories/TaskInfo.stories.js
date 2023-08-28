import TaskInfo from '../components/TaskInfo';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';
import rootReducer from '../reducers';

const store = createStore(rootReducer);

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Inbox/TaskInfo',
  component: TaskInfo,
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
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = {
  args: {
    currentTask: {
      id: 1,
      stage: 'На подписании',
      title: 'Письмо по проекту П3456-890',
      author: 'Панасенков Г.В.',
      body: 'Задача - пробемная ситуация с явно заданной целью, которую необходимо достичь в более узком смысле задачей также называют саму эту цель, данную в рамках проблемной ситуации, то есть то, что требуется...',
      date: '23 \n Дек',
      level: 'Warn',
      content: 'content.pdf',
    },
    closeTask: () => {
      alert('Closed!');
    },
  },
};
