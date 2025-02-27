import { useState, useEffect } from "react";
import { User } from "lucide-react";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Import jwtDecode

const UserInfo = ({ userLogo, token }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    setUserInfo(null);
    setShowCard(false);
   
  }, [token]);
  
  const fetchUserInfo = async () => {
    console.log("start")
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(decoded)
        console.log("featching")
        setUserId(decoded.id); // Assuming userId is stored as userId in token payload
        console.log("featch")
      } catch (error) {
        console.error("Invalid Token", error);
      }
    }
    if (!userId) return new Error ("User ID is required");
    try {
      console.log("Call Api")
      const response = await axios.get(`http://localhost:3000/user/profile/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("response Generate")
      console.log(response.data, response.status);
      setUserInfo(response.data);
      setShowCard(true);
    } catch (error) {
      console.error("Failed to fetch user info", error);
    }
  };

  const closeCard = () => {
    setShowCard(false);
  };

  return (
    <div className="relative">
      {userLogo ? (
        <img
          src={userLogo}
          alt="User Logo"
          className="w-8 h-8 rounded-full border border-[#F64F1A] cursor-pointer"
          onClick={fetchUserInfo}
        />
      ) : (
        <User className="w-6 h-6 cursor-pointer" onClick={fetchUserInfo} />
      )}

      {showCard && userInfo && (
        <div className="absolute bg-white border rounded-lg p-4 shadow-lg top-12 right-0 w-64">
          <button className="absolute top-1 right-1 w-6 h-6 text-red-500" onClick={closeCard}>
            X
          </button>
          <img src={userLogo} alt="User Logo" className="w-16 h-16 rounded-full mx-auto mb-2" />
          <label className="block text-lg font-semibold text-center">
            Username: <span className="text-lg">{userInfo.name}</span>
          </label>
          <label className="block text-lg font-semibold text-center">
            Email: <span className="text-lg">{userInfo.email}</span>
          </label>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
