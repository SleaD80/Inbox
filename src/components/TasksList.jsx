import Task from './Task';
import Search from './UI/Search';

const TasksList = ({ tasks, selectTask }) => {
  return (
    <>
      <Search />
      {tasks.length !== 0 ? (
        <div
          style={{
            height: '80vh',
            overflowY: 'auto',
            overscrollBehavior: 'contain',
          }}
        >
          {tasks.map((task) => (
            <Task key={task.id} {...task} selectTask={selectTask} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>Нет активных задач</div>
      )}
    </>
  );
};

export default TasksList;
