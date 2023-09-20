import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userLogin } from '../actions';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [rememberUser, setRememberUser] = useState(false);

  const handleLogin = (e) => {
    setLogin(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleCheckBox = (e) => {
    setRememberUser(e.target.checked);
  };

  const handleSubmit = async () => {
    await dispatch(userLogin(login, password, rememberUser));
    navigate('app/tasks');
  };

  return (
    <section className="vh-100" style={{ backgroundColor: '#508bfc' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card shadow-2-strong"
              style={{ borderRadius: '1rem' }}
            >
              <div className="card-body p-5 text-center">
                <h3 className="mb-5">Вход в систему</h3>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="typeEmailX-2"
                    placeholder="Имя пользователя"
                    className="form-control form-control-lg"
                    onChange={handleLogin}
                  />
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="typePasswordX-2"
                    className="form-control form-control-lg"
                    placeholder="Пароль"
                    onChange={handlePassword}
                  />
                </div>

                <div className="form-check d-flex justify-content-start mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="form1Example3"
                    onChange={handleCheckBox}
                  />
                  <label className="form-check-label" htmlFor="form1Example3">
                    {' '}
                    Запомнить меня{' '}
                  </label>
                </div>

                <button
                  className="btn btn-primary btn-lg btn-block"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Вход
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
