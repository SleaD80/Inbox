import "./Task.css";
import { useDispatch } from "react-redux";
import { selectTask } from "../actions";

function Task(props) {
    const dispatch = useDispatch();
    return (
        <div
            className="col task"
            onClick={() => dispatch(selectTask(props.id))}
        >
            <small>{props.stage}</small>
            <h4>{props.title}</h4>
            <small>Автор: {props.author}</small>
            <p>{props.body}</p>
        </div>
    );
}

export default Task;
