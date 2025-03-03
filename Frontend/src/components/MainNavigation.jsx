import { useState } from "react";
import { Menu, X, ShoppingCart, User, Cookie, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../util/AuthContext";
import UserInfo from "./UserInfo";

export default function MainNavbar() {
  const { token, logout } = useAuth(); // Get token & logout function
  const [isOpen, setIsOpen] = useState(false);
  const [userLogo, setUserLogo] = useState(null);

  // Update user image when logged in
  useState(() => {
    if (token) {
      setUserLogo(
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      );
    } else {
      setUserLogo(null);
    }
  }, [token]);

  return (
    <nav className="sticky top-0 left-0 w-full bg-[#ebe4e4] text-[#F64F1A] shadow-md sm:p-4 border-b-2 border-[#e4b1af] z-50 ">
      <div className="container mx-auto flex justify-between items-center px-2 sm:px-6">
        {/* Left Side */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          <NavLink
            to="/"
            className="flex items-center space-x-2 text-sm sm:text-lg font-semibold"
          >
            <Cookie className="w-6 h-6" />
            <span>Cookies Man</span>
          </NavLink>
          <NavLink to="/" className="hover:bg-red-300 px-2 py-1 rounded-md">
            Home
          </NavLink>
          <NavLink
            to="/product/cookies/1"
            className="hover:bg-red-300 px-2 py-1 rounded-md"
          >
            Cookies
          </NavLink>
          <NavLink
            to="/product/chocolate/2"
            className="hover:bg-red-300 px-2 py-1 rounded-md"
          >
            Chocolate
          </NavLink>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center space-x-4">
          <NavLink to="/cart" className="hover:bg-red-300 block py-2">
            <ShoppingCart className=" mx-auto w-5 h-5" />
            <span>Cart</span>
          </NavLink>

          {token ? (
            <>
              <UserInfo userLogo={userLogo} token={token} />
              <button
                onClick={logout}
                className="hover:bg-red-300 px-2 py-1 rounded-md flex items-center gap-2"
              >
                <LogOut className="w-5 h-5 text-red-500" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <NavLink
              to="/account/login"
              className="hover:bg-red-300 px-2 py-1 rounded-md"
            >
              <User className="w-5 h-5" />
              <span>Account</span>
            </NavLink>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden text-center bg-[#ebe4e4] p-3 rounded-md">
          <NavLink to="/cart" className="hover:bg-red-300 block py-2">
            <ShoppingCart className=" mx-auto w-5 h-5" />
            <span>Cart</span>
          </NavLink>

          {token ? (
            <>
              {userLogo && (
                <div className="flex justify-center items-center pt-2 pb-2">
                    <UserInfo userLogo={userLogo} token={token} />
                </div>
              )}
              <button
                onClick={logout}
                className="hover:bg-red-300 mx-auto mt-1 px-2 pt-1 rounded-md flex items-center justify-center gap-2"
              >
                <LogOut className="w-5 h-5 text-red-500" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <NavLink
              to="/account/login"
              className="hover:bg-red-300 mx-auto mt-1 px-2 pt-1 rounded-md flex items-center justify-center gap-2"
            >
              <User className="w-5 h-5" />
              <span>Account</span>
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
}
