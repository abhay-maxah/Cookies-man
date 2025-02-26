import { useState } from "react";
import { Menu, X, ShoppingCart, User, Cookie } from "lucide-react";
import { Form, NavLink,useRouteLoaderData } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const token = useRouteLoaderData('root');
  console.log(token)
  return (
    <nav className="fixed top-0 left-0 w-full bg-[#ebe4e4] text-[#F64F1A] shadow-md sm:p-4 border-b-2 border-[#e4b1af] z-50">
      <div className="container mx-auto flex justify-between items-center px-2 sm:px-6">
        {/* Left Side */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          <NavLink 
            to="/" 
            className="flex items-center space-x-1 sm:space-x-2 text-sm sm:text-lg font-semibold transition-all duration-300  px-2 py-1 sm:px-3 sm:py-2 rounded-md"
          >
            <Cookie className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>Cookies Man</span>
          </NavLink>
          <NavLink to="/" className="text-sm sm:text-lg font-semibold transition-all duration-300 hover:bg-red-300 px-2 py-1 sm:px-3 sm:py-2 rounded-md">
            Home
          </NavLink>
          <NavLink to="/product/cookies" className="text-sm sm:text-lg font-semibold transition-all duration-300 hover:bg-red-300 px-2 py-1 sm:px-3 sm:py-2 rounded-md">
            Cookies
          </NavLink>
          {/* Visible only on large screens */}
          <NavLink to="/product/chocolate" className="text-sm sm:text-lg font-semibold transition-all duration-300 hover:bg-red-300 px-2 py-1 sm:px-3 sm:py-2 rounded-md">
            Chocolate
          </NavLink>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center space-x-4 sm:space-x-6">
          <a href="#" className="flex items-center space-x-1 transition-all duration-300 hover:bg-red-300px-2 py-1 sm:px-3 sm:py-2 rounded-md">
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Cart</span>
          </a>
          
          {!token && 
          <NavLink to='/account/login' className="flex items-center space-x-1 transition-all duration-300 hover:bg-red-300 px-2 py-1 sm:px-3 sm:py-2 rounded-md">
          <User className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Account</span>
        </NavLink>
          }
          {token&&
          <Form method="post" action="/logout">
          <button>logout</button>
          </Form>
          }

        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-red-500" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-3 space-y-2 text-center bg-[#ebe4e4]  p-3 rounded-md">
          {/* Chocolate is now in the mobile menu */}

          <a href="#" className="flex items-center justify-center space-x-1 text-sm hover:bg-red-300 px-3 py-2 rounded-md">
            <ShoppingCart className="w-4 h-4" />
            <span>Cart</span>
          </a>
          
          {!token &&<NavLink to='/account/login' className="flex items-center space-x-1 transition-all duration-300 hover:bg-red-300 px-2 py-1 sm:px-3 sm:py-2 rounded-md">
          <User className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Account</span>
        </NavLink>
          } 
          {token&&
          <Form method="post" action="/logout">
          <button>logout</button>
          </Form>
          }
        </div>
      )}
    </nav>
  );
}
