import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions';
import Dropdown from './UI/Dropdown';

function Logout(props) {
  const dispatch = useDispatch();
  const username = useSelector((store) => store.userProfile.fullname);
  return (
    <Dropdown
      label={getUserName(props?.username ? props.username : username)}
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

  function getUserName(username) {
    let surname, firstName;
    const usernameArr = username ? username.split(' ') : [];
    try {
      [surname, firstName] = [usernameArr[0], usernameArr[1][0]];
    } catch (e) {
      surname = '';
      firstName = '';
    }
    return `${surname} ${firstName}.`;
  }
}

export default Logout;
