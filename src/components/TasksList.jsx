import Task from "./Task";

const TasksList = (props) => {
    return props.tasks.length !== 0 ? (
        props.tasks.map((task) => (
            <Task key={task.id} {...task} selectTask={props.selectTask} />
        ))
    ) : (
        <div style={{ textAlign: "center" }}>Нет активных задач</div>
    );
};

export default TasksList;
