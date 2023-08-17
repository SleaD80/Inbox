import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className="container my-5">
      <h1 className="fw-light">Задачи</h1>
      <hr />
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2">
        <Outlet />
        {/* <img className="rounded-image" src="img.jpg" alt="Denis" />
          <h1 className="fw-light">Denis Sarantsev</h1>
          <p className="lead text-muted">
            I'm studying the best course. In this HTML course I will build my
            personal web site.
          </p> */}
        <div className="col">On construction...</div>
      </div>
    </div>
  )
}

export default MainLayout
