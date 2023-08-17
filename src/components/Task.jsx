import './Task.css'

function Task({ stage, title, author, body }) {
  return (
    <div className="col task">
      {/* <small>{id}</small> */}
      <small>{stage}</small>
      <h4>{title}</h4>
      <small>Автор: {author}</small>
      <p>{body}</p>
    </div>
  )
}

export default Task
