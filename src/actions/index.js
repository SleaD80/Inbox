import data from "../data/tasks";
export const FETCH_TASKS = "FETCH_TASKS";
export const CLOSE_TASK = "CLOSE_TASK";

export const fetchTasks = () => async (dispatch) => {
    try {
        const result = data;
        dispatch({
            type: FETCH_TASKS,
            tasks: result,
        });
    } catch (e) {
        dispatch({
            type: FETCH_TASKS,
            tasks: [],
        });
    }
};

export const closeTask = (taskId, stageId) => {
    return { type: CLOSE_TASK, taskId: taskId, stageId: stageId };
};
