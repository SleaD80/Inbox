import Task from "./Task";

const TasksList = (props) => {
    return props.tasks.length !== 0 ? (
        props.tasks.map((task) => {
            return <Task key={task.id} {...task} />;
        })
    ) : (
        <div style={{ textAlign: "center" }}>Нет активных задач</div>
    );
};

export default TasksList;
