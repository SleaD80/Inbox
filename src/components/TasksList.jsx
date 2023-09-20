import Task from './Task';

const TasksList = ({ tasks, selectTask }) => {
  return (
    <>
      {tasks.length !== 0 ? (
        <div
          style={{
            height: '90vh',
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
