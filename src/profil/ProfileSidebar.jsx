import { FaUser, FaCreditCard, FaLock, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


export default function ProfileSidebar() {
    const navigate = useNavigate();

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <ul className="space-y-4">
        <li className="flex items-center p-3 bg-blue-100 text-blue-600 rounded-lg">
          <FaUser className="mr-3" />
          <span>Personal Information</span>
        </li>
        <li className="flex items-center p-3 hover:bg-gray-100 rounded-lg">
          <FaCreditCard className="mr-3" />
          <span onClick={() => navigate("/payment")}>Payment</span>
        </li>
        <li className="flex items-center p-3 hover:bg-gray-100 rounded-lg">
          <FaLock className="mr-3" />
          <span onClick={() => navigate("/change-password")}>Change Password</span>
        </li>
        <li className="flex items-center p-3 hover:bg-gray-100 rounded-lg">
          <FaCog className="mr-3" />
          <span>Settings</span>
        </li>
      </ul>
    </div>
  );
}
