import { useState, useEffect } from 'react'
import Task from './Task'
import data from '../data/tasks'

function Tasks() {
  const [tasks, setTasks] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      setTasks(data)
      setIsLoading(false)
    } catch (error) {
      setError(error.message)
    }
    // fetch(API_URL)
    //   .then((res) => res.json())
    //   .then((tasks) => setTasks(tasks))
    //   .catch((error) => setError(error.message))
    //   .finally(() => setIsLoading(false))
  }, [])

  if (error) {
    return <h1>Error: {error}</h1>
  }

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        tasks.map((task) => <Task key={task.id} {...task} />)
      )}
    </>
  )
}

export default Tasks
