import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Get A Joke</Link>
          </li>
          <li>
            <Link to="/Create">Create a Joke</Link>
          </li>
          <li>
            <Link to="/View">View Your Jokes</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;