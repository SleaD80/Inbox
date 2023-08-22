import Task from "./Task";

const TasksList = (props) => {
    console.log(props.tasks);
    return props.tasks.map((task) => (
        <Task key={task.id} {...task} selectTask={props.selectTask} />
    ));
};

export default TasksList;
