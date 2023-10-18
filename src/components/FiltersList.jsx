import Filter from './Filter';
import styles from './FiltersList.module.css';
import IconExpectation from './icons/IconExpectation';
import IconFolder from './icons/IconFolder';
import IconSchedule from './icons/IconSchedule';
import IconTask from './icons/IconTask';
import IconTaskSignature from './icons/IconTaskSignature';
import IconUnchecked from './icons/IconUnchecked';

const FiltersList = (props) => {
  const filters = [
    {
      id: 0,
      title: 'Все задачи',
      number: props.taskNumbers.all,
      criterium: 'all',
      icon: <IconFolder/>,
    },
    {
      id: 1,
      title: 'Активные',
      number: props.taskNumbers.active,
      criterium: 'active',
      icon: <IconTask/>,
    },
    {
      id: 2,
      title: 'Подписанные',
      number: props.taskNumbers.approved,
      criterium: 'approved',
      icon: <IconTaskSignature/>,
    },
    {
      id: 3,
      title: 'Отклоненные',
      number: props.taskNumbers.rejected,
      criterium: 'rejected',
      icon: <IconUnchecked/>
    },
    {
      id: 4,
      title: 'Срочные',
      number: props.taskNumbers.deadline,
      criterium: 'deadline',
      icon: <IconSchedule/>,
    },
    {
      id: 5,
      title: 'Просроченные',
      number: props.taskNumbers.overdue,
      criterium: 'overdue',
      icon: <IconExpectation/>,
    },
  ];

  return (
    <fieldset className="form-group container">
      <legend className="mt-4">Фильтрация</legend>
      <div className={`btn-group-vertical ${styles.filtersList} navigation`}>
        {filters.map((item) => (
          <Filter
            title={item.title}
            number={item.number}
            criterium={item.criterium}
            key={item.id}
            icon={item.icon}
          />
        ))}
      </div>
    </fieldset>
  );
};

export default FiltersList;
