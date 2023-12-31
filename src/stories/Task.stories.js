import Task from '../components/Task';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Inbox/Task',
  component: Task,
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

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = {
  args: {
    level: 'Warn',
    stage: 'Рассмотрение',
    title: 'Письмо по проекту П3456-890',
    author: 'Панасенков Г.В.',
    body: 'Задача - проблемная ситуация с явно заданной целью, которую необходимо достичь в более узком смысле задачей также называют саму эту цель, данную в рамках проблемной ситуации, то есть то, что требуется...',
    dateSent: 1676026800000,
    getStage: (stage) => {
      return stage;
    },
  },
};
