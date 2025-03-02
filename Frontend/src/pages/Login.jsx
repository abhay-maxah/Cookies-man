import { useState } from "react";
import { NavLink,Form, useNavigate } from "react-router-dom";
import { useAuth } from "../util/AuthContext";
const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(formData)
      const data = await response.json();
      console.log(data)
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      // localStorage.setItem("token", data.token);
      login(data.token);
       navigate("/"); // Redirect to dashboard after login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-sm p-6 space-y-6 bg-transparent rounded-2xl shadow-2xl sm:p-8 md:p-10 lg:p-12">
          <h1 className="text-3xl font-extrabold text-center text-[#F64F1A]">Login</h1>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <Form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block mb-2 text-gray-700 text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-gray-700 text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 text-white bg-[#F64F1A] rounded-lg hover:bg-red-700 transition-all font-medium">
              Login
            </button>
          </Form>
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Don’t have an account?
              <NavLink to="/account/signup" className="text-[#F64F1A] font-semibold hover:underline ml-1">
                Sign up
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
