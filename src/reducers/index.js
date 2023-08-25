import { combineReducers } from "redux";
import { FETCH_TASKS, CLOSE_TASK, SELECT_TASK, SORT } from "../actions";

function clearSelection(arr) {
    const newState = Object.assign(
        [],
        arr.map((item) => {
            return { ...item, active: 0 };
        })
    );
    return newState;
}

function selectFirstActive(arr) {
    for (const item of arr) {
        if (item.stage === 0) {
            item.active = 1;
            break;
        }
    }
    return arr;
}

function tasks(state = [], action) {
    let newState = [];
    switch (action.type) {
        case FETCH_TASKS:
            newState = clearSelection(action.tasks);
            newState[0].active = 1;
            return newState;
        case CLOSE_TASK:
            newState = clearSelection(state);
            const index = newState.findIndex(
                (item) => item.id === action.taskId
            );
            const taskToChange = { ...newState[index], stage: action.stageId };
            newState = newState
                .slice(0, index)
                .concat([taskToChange], newState.slice(index + 1));
            return selectFirstActive(newState);
        case SELECT_TASK:
            newState = clearSelection(state);
            const selected = newState.find((item) => item.id === action.taskId);
            selected.active = 1;
            return newState;
        case SORT:
            newState = clearSelection(
                Object.assign(
                    [],
                    state.sort((a, b) =>
                        a[action.sorterField].localeCompare(
                            b[action.sorterField]
                        )
                    )
                )
            );
            return selectFirstActive(newState);
        default:
            return state;
    }
}

const rootReducer = combineReducers({ tasks });
export default rootReducer;
