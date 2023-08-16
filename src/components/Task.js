import './Task.css'

function Post({ id, title, userId, body }) {
  return (
    <div className="task">
      <small>{id}</small>
      <h2>{title}</h2>
      <p>{body}</p>
      <h3>User ID: {userId}</h3>
    </div>
  )
}

export default Post
