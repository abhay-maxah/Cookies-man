import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../util/AuthContext";

function SignUp() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const { login } = useAuth();

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await fetch("http://localhost:3000/user", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            console.log(formData)
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Signup failed");
            }

            // Store token in localStorage
            // localStorage.setItem("token", data.token);
            login(data.token);

            // Redirect user after signup
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen p-4">
                <div className="w-full max-w-sm p-6 space-y-6 bg-transparent rounded-2xl shadow-2xl sm:p-8 md:p-10 lg:p-12">
                    <h1 className="text-3xl font-extrabold text-center text-[#F64F1A]">Sign Up</h1>
                    
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block mb-2 text-gray-700 text-sm font-medium">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-gray-700 text-sm font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-gray-700 text-sm font-medium">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full p-3 text-white bg-[#F64F1A] rounded-lg hover:bg-red-600 transition-all font-medium"
                        >
                            Sign Up
                        </button>
                    </form>

                    <div className="text-center">
                        <p className="text-gray-600 text-sm">
                            Already have an account?
                            <NavLink to="/account/login" className="text-[#F64F1A] hover:underline ml-1">Login</NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUp;
