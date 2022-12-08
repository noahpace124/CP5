import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div id="navbar">
        <Link class="col-l" to="/view"><h3>View Your Jokes</h3></Link>
        <Link class="col-m" to="/"><h2>Tell Me A Joke</h2></Link>
        <Link class="col-r" to="/create"><h3>Create A Joke</h3></Link>
      </div>
      <Outlet />
    </>
  )};

export default Layout;