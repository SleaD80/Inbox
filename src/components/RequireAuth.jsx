import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function RequireAuth() {
  const authenticated = useSelector((store) => store.userProfile.authenticated);
  return authenticated === true ? <Outlet /> : <Navigate to="/" replace />;
}

export default RequireAuth;
