import { NavLink } from "react-router-dom";
function MainNavigation() {
  return (
    <>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/account/login" end>
          login
        </NavLink>
        <NavLink to="/account/signup" end>
          signup
        </NavLink>
      </nav>
    </>
  );
}

export default MainNavigation;
