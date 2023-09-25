import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { closeTask, downloadAttachments } from '../actions';
import { getDate } from '../helpers';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import './TaskInfo.css';

function TaskInfo(props) {
  const dispatch = useDispatch();
  const attachments = useSelector(
    (store) => store.attachments[props.currentTask.id]
  );
  const displayStates = { true: 'Кратко', false: 'Подробнее' };
  const [displayState, setDisplayState] = useState(true);

  const constructDate = (timestamp) => {
    const dateObj = getDate(timestamp);
    return `${dateObj.date} ${dateObj.month} ${dateObj.year}`;
  };
  const dateSent = constructDate(props.currentTask.dateSent);
  const dueDate = constructDate(props.currentTask.dueDate);

  useEffect(() => {
    console.log(props.currentTask.id);
    dispatch(
      downloadAttachments(props.currentTask.id, props.currentTask.content)
    );
    setDisplayState(true);
    // eslint-disable-next-line
  }, [props.currentTask?.id]);

  const expandCollapseBody = () => {
    setDisplayState(!displayState);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">{props.currentTask.title}</h4>
        <span
          style={{ marginRight: '10px', marginBottom: '15px' }}
          className="badge bg-secondary"
        >
          {`От ${dateSent}`}
        </span>
        <span className="badge bg-secondary">{`Выполнить до ${dueDate}`}</span>
        <h6 className="card-subtitle mb-2 text-muted">
          {props.currentTask.stage}
        </h6>
        <p className="card-text">
          {' '}
          {displayState
            ? props.currentTask.body
            : props.currentTask.body.slice(0, 200) + '...'}
        </p>
        <p className="btn-link" onClick={expandCollapseBody}>
          {displayStates[displayState]}
        </p>
        <button
          className="card-link btn btn-primary"
          disabled={props.currentTask.stage !== 'Рассмотрение'}
          onClick={() => dispatch(closeTask(props.currentTask.id, 1))}
        >
          Подписать
        </button>
        <button
          className="card-link btn btn-secondary"
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
