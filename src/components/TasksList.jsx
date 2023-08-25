import { useState, useEffect } from "react";
import Task from "./Task";
import Search from "./UI/Search";

const TasksList = ({ tasks, selectTask }) => {
  const [found, setFound] = useState(tasks);
  useEffect(() => {
    setFound(tasks);
  }, [tasks]);

  function handleSearchChange(text) {
    setFound(tasks.filter((task) => task.title.includes(text)));
  }

  return (
    <>
      <Search handleSearchChange={handleSearchChange} />
      <div
        style={{
          height: "100vh",
          overflowY: "auto",
          overscrollBehavior: "contain",
        }}
      >
        {found.map((task) => (
          <Task key={task.id} {...task} selectTask={selectTask} />
        ))}
      </div>
    </>
  );
};

export default TasksList;
