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

  return tasks.length !== 0 ? (
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
  ) : (
    <div style={{ textAlign: "center" }}>Нет активных задач</div>
  );
};

export default TasksList;
