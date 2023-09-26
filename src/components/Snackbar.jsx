import './Snackbar.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { removeSnackbar } from '../actions';

function Snackbar() {
  const dispatch = useDispatch();
  const message = useSelector((store) => store.snackbar.text);
  const snackbarState = useSelector((store) => store.snackbar.show);

  let timer;
  const handleSnackbarTimeout = () => {
    timer = setTimeout(() => {
      dispatch(removeSnackbar());
    }, 3000);
  };

  useEffect(() => {
    if (snackbarState) {
      handleSnackbarTimeout();
    }
    return () => {
      clearTimeout(timer);
    };
    //eslint-disable-next-line
  }, [snackbarState, timer]);

  return <div className="snackbar">{message}</div>;
}

export default Snackbar;
