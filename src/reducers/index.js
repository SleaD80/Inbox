import { combineReducers } from "redux";
import { FETCH_TASKS, CLOSE_TASK } from "../actions";

function tasks(state = [], action) {
    switch (action.type) {
        case FETCH_TASKS:
            return action.tasks;
        case CLOSE_TASK:
            const index = state.findIndex((item) => item.id === action.taskId);
            const taskToChange = { ...state[index], stage: action.stageId };
            return state
                .slice(0, index)
                .concat([taskToChange], state.slice(index + 1));

        default:
            return state;
    }
}

const rootReducer = combineReducers({ tasks });
export default rootReducer;
