import { useSelector, useDispatch } from 'react-redux';
import Search from './UI/Search';
import Dropdown from './UI/Dropdown';
import Logout from './Logout';
import { changeTheme } from '../actions';

function Header(props) {
  const dispatch = useDispatch();
  const theme = useSelector((store) => store.theme);
  const dataBsTheme = theme === 'slate' ? 'dark' : 'light';

  return (
    <nav
      className={`navbar navbar-expand-lg bg-${dataBsTheme}`}
      data-bs-theme={dataBsTheme}
    >
      <div className="container-fluid">
        <span className="navbar-brand">Задачи</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item dropdown">
              <Dropdown
                id="theme-selector"
                label="Темы"
                options={[
                  {
                    id: 'materia',
                    label: 'Materia',
                    handleClick: () => dispatch(changeTheme('materia')),
                  },
                  {
                    id: 'slate',
                    label: 'Slate',
                    handleClick: () => dispatch(changeTheme('slate')),
                  },
                  {
                    id: 'cerulean',
                    label: 'Cerulean',
                    handleClick: () => dispatch(changeTheme('cerulean')),
                  },
                  {
                    id: 'target',
                    label: 'Целевая Сибур',
                    handleClick: () => dispatch(changeTheme('target')),
                  },
                ]}
              />
            </li>
          </ul>
          <form className="d-flex">
            <Search />
          </form>
          <div className="d-flex">
            <ul
              className="nav navbar-right"
              style={{
                marginLeft: '5px',
                minWidth: '100px',
              }}
            >
              <li className="nav-item dropdown">
                <Logout {...props} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
