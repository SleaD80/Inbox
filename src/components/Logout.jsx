import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions';
import Dropdown from './UI/Dropdown';

function Logout() {
  const dispatch = useDispatch();
  let surname, firstName;
  const username = useSelector((store) => store.userProfile.fullname);
  const usernameArr = username ? username.split(' ') : [];
  try {
    [surname, firstName] = [usernameArr[0], usernameArr[1][0]];
  } catch (e) {
    surname = '';
    firstName = '';
  }
  return (
    <Dropdown
      label={`${surname} ${firstName}.`}
      style={{ right: '0', left: 'auto' }}
      options={[
        {
          id: 1,
          label: 'Выход',
          handleClick: () => {
            dispatch(logout());
          },
        },
      ]}
    />
  );
}

export default Logout;
