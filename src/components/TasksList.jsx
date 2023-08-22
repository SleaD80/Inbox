import Task from "./Task";

const TasksList = (props) => {
    return props.tasks.map((task) => (
        <Task
            key={task.id}
            {...task}
            selectTask={props.selectTask}
            getStage={props.getStage}
        />
    ));
};

export default TasksList;
