import Filter from './Filter';

const FiltersList = (props) => {
  const filters = [
    {
      id: 0,
      title: 'Все задачи',
      number: props.taskNumbers.all,
      criterium: 'all',
    },
    {
      id: 1,
      title: 'Активные',
      number: props.taskNumbers.active,
      criterium: 'active',
    },
    {
      id: 2,
      title: 'Подписанные',
      number: props.taskNumbers.approved,
      criterium: 'approved',
    },
    {
      id: 3,
      title: 'Отклоненные',
      number: props.taskNumbers.rejected,
      criterium: 'rejected',
    },
    {
      id: 4,
      title: 'Приближается дедлайн',
      number: props.taskNumbers.deadline,
      criterium: 'deadline',
    },
    {
      id: 5,
      title: 'Просроченные',
      number: props.taskNumbers.overdue,
      criterium: 'overdue',
    },
  ];

  return (
    <fieldset className="form-group">
      <legend className="mt-4 container">Фильтрация</legend>
      <ul className="list-group">
        {filters.map((item) => (
          <Filter
            title={item.title}
            number={item.number}
            criterium={item.criterium}
            key={item.id}
          />
        ))}
      </ul>
    </fieldset>
  );
};

export default FiltersList;
