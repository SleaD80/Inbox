import Task from './Task';

const TasksList = (data) => {

  return (
    data.tasks.map((task) => <Task key={task.id} {...task} />)
  );
}

export default TasksList;
