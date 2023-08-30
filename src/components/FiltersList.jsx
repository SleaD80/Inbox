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
    <>
      {filters.map((item) => (
        <Filter
          key={item.id}
          title={item.title}
          number={item.number}
          criterium={item.criterium}
        />
      ))}
    </>
  );
};

export default FiltersList;
