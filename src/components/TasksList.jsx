import Task from "./Task";
import { useSelector } from "react-redux";

function getStage(stageId) {
    const stages = { 0: "Рассмотрение", 1: "Согласовано", 2: "Отклонено" };
    return stages[stageId];
}

const TasksList = (props) => {
    const tasks = useSelector((state) => state.tasks);
    return tasks.length !== 0 ? (
        tasks
            .filter((task) => task.stage === 0)
            .map((task) => {
                const taskModified = { ...task, stage: getStage(task.stage) };
                return (
                    <Task
                        key={task.id}
                        {...taskModified}
                        selectTask={props.selectTask}
                    />
                );
            })
    ) : (
        <div style={{ textAlign: "center" }}>Нет активных задач</div>
    );
};

export default TasksList;
