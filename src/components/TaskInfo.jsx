import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { closeTask, downloadAttachments } from '../actions';
import { getDate } from '../helpers';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import './TaskInfo.css';
import Icon from './Icon';
import { IconTypes } from '../consts/consts';

const MILLISECONDS_IN_DAY = 86400000

function TaskInfo(props) {
  const dispatch = useDispatch();
  const attachments = useSelector(
    (store) => store.attachments[props.currentTask.id]
  );
  const username = useSelector((store) => store.userProfile.fullname);

  const constructDate = (timestamp) => {
    const dateObj = getDate(timestamp, true);
    return `${dateObj.date}.${dateObj.month}.${dateObj.year}`;
  };

  const dueDate = constructDate(props.currentTask.dueDate);
  const daysLeft = (Date.now() - props.currentTask.dueDate) / MILLISECONDS_IN_DAY;

  const users = [
    {
      name: props.currentTask.author,
      role: 'Автор'
    },
    {
      name: username,
      role: 'Исполнитель'
    },
  ];

  useEffect(() => {
    dispatch(
      downloadAttachments(props.currentTask.id, props.currentTask.content)
    );
    // eslint-disable-next-line
  }, [props.currentTask?.id]);

  const renderUserItem = ({ name, role }) => (
    <div className="info_user d-flex align-items-center">
      <div>
        <p className="m-0">{name}</p>
        <p className="m-0 role">{role}</p>
      </div>
      <Icon name={IconTypes.Person} color='#97A2BB'/>
    </div>
  );

  return (
    <div className="main_card">
      <div className="card-header">
        <h4 className="card-title">{props.currentTask.title}</h4>
      </div>
      <div className="card-body">
        <div className="info_wrapper">
          <div className="info_container">
            {users.map(renderUserItem)}
          </div>
          <div className="info_container">
            <div className="info_date">
              <p className="date">{dueDate}</p>
            </div>
            <div className="info_date d-flex justify-content-between">
              <p className="m-0 date_due">{`Осталось ${-Math.round(daysLeft)} дней`}</p>
              <Icon name={IconTypes.Calendar} size="s" color="#6C6E70"/>
            </div>
          </div>
        </div>
        <div className="dropdown_wrapper align-items-center">
          <div class="dropdown">
            <button class="btn btn-primary dropdown-toggle" type="button">
              Принять решение
            </button>
          </div>
          <h6 className="card-subtitle">
            {props.currentTask.stage}
          </h6>
        </div>
        <button
          className="card-link btn btn-primary me-2"
          disabled={props.currentTask.stage !== 'Рассмотрение'}
          onClick={() => dispatch(closeTask(props.currentTask.id, 1))}
        >
          Подписать
        </button>
        <button
          className="card-link btn btn-secondary me-2"
          disabled={props.currentTask.stage !== 'Рассмотрение'}
          onClick={() => dispatch(closeTask(props.currentTask.id, 2))}
        >
          Отклонить
        </button>
        <button
          className="card-link btn btn-secondary"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample"
        >
          Просмотр документа
        </button>
        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="offcanvasExample"
          // bs-offcanvas-width="800px"
          style={{ width: '47%' }}
          aria-labelledby="offcanvasExampleLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasExampleLabel">
              Просмотр документа
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <DocViewer
              documents={
                attachments
                  ? attachments.map((item) => {
                      return { uri: item };
                    })
                  : []
              }
              pluginRenderers={DocViewerRenderers}
              config={{
                header: {
                  disableHeader: props.currentTask.content.length === 1,
                  disableFileName: true,
                  retainURLParams: false,
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskInfo;
