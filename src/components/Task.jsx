import './Task.css';

function Task({
  id,
  stage,
  title,
  author,
  body,
  selectTask,
  getStage,
  backgroundColor,
}) {
  const stageStr = getStage(stage);
  return (
    <div
      className="col task"
      style={backgroundColor && { backgroundColor }}
      onClick={() => selectTask(id)}
    >
      {/* <small>{id}</small> */}
      <small>{stageStr}</small>
      <h4>{title}</h4>
      <small>Автор: {author}</small>
      <p>{body}</p>
    </div>
  );
}

export default Task;
