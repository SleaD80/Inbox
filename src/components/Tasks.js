import { useState, useEffect } from 'react'
import Task from './Task'

const API_URL = 'https://jsonplaceholder.typicode.com/posts'

function Posts() {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((posts) => setPosts(posts))
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false))
  }, [])

  if (error) {
    return <h1>Error: {error}</h1>
  }

  return (
    <>
      <h1>Задачи</h1>
      <hr />
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        posts.map((post) => <Task key={post.id} {...post} />)
      )}
    </>
  )
}

export default Posts
