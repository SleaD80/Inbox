import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { closeTask, togglePreview } from '../actions';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import './TaskInfo.css';

function TaskInfo(props) {
  const dispatch = useDispatch();
  const displayStates = { true: 'Кратко', false: 'Подробнее' };
  const [displayState, setDisplayState] = useState(true);

  useEffect(() => {
    setDisplayState(true);
  }, [props.currentTask?.id]);

  const expandCollapseBody = () => {
    setDisplayState(!displayState);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">{props.currentTask.title}</h4>
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
          class="offcanvas offcanvas-start"
          tabindex="-1"
          id="offcanvasExample"
          // bs-offcanvas-width="800px"
          style={{ width: '47%' }}
          aria-labelledby="offcanvasExampleLabel"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel">
              Просмотр документа
            </h5>
            <button
              type="button"
              class="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <DocViewer
              documents={props.currentTask.content.map((item) => {
                return { uri: require(`../data/${item}`) };
              })}
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
