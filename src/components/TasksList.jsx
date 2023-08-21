import Task from './Task';

const TasksList = (props) => {

  return (
      props.tasks.filter((task) => task.stage === 0).map((task) => <Task key={task.id} {...task} selectTask={props.selectTask} getStage={props.getStage}/>)
  );
}

export default TasksList;
