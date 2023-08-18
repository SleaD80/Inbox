import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="container my-5">
      <div style={{position:'fixed',top:'0'}}>
          <h1 className="fw-light" >Задачи</h1>
      </div>
      <hr />
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2">
          <div className="col" style={{height:'80vh', overflowY:'auto', overscrollBehavior:'contain'}}>
              <Outlet />
          </div>
          <div className="col" style={{height:'100vh', position:'fixed',right:'0'}}>On construction...</div>
      </div>
    </div>
  );
}

export default MainLayout;
