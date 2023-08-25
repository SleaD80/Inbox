import "./Task.css";
import { useDispatch } from "react-redux";
import { selectTask } from "../actions";

function Task(props) {
    const dispatch = useDispatch();
    let classesString = "col task alert";
    classesString += props.active ? " alert-secondary" : " alert-light";
    return (
        <div
            className={classesString}
            role="alert"
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
