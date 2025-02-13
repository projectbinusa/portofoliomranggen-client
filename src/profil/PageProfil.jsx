import { useState, useEffect } from "react";
import { Camera } from "lucide-react";
import { API_ADMIN } from "../utils/BaseUrl";

export default function ProfilePage() {
  const [profilePic, setProfilePic] = useState(
    "https://via.placeholder.com/150"
  );
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await fetch(`${API_ADMIN}/admin/1`);
        if (!response.ok) throw new Error("Failed to fetch admin data");
        const data = await response.json();
        setFormData({
          username: data.username,
          email: data.email,
          password: data.password,
          role: data.role,
        });
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };
    fetchAdminData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-green-300 p-6">
      <div className="w-full max-w-lg p-8 bg-white rounded-3xl shadow-2xl transform transition duration-500 hover:scale-105">
        <h1 className="text-4xl font-bold mb-6 text-green-700 text-center">
          Profile
        </h1>

        <div className="flex justify-center mb-6">
          <div className="relative w-28 h-28">
            <img
              src={profilePic}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-green-500"
            />
            <label
              htmlFor="profilePicUpload"
              className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-green-200"
            >
              <Camera className="w-6 h-6 text-green-600" />
            </label>
            <input
              type="file"
              id="profilePicUpload"
              className="hidden"
              onChange={handleProfilePicChange}
            />
          </div>
        </div>

        <form className="space-y-6">
          {Object.keys(formData).map((id) => (
            <div key={id} className="flex flex-col">
              <label
                htmlFor={id}
                className="text-sm font-medium text-green-700"
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </label>
              <input
                id={id}
                type={id === "password" ? "password" : "text"}
                className="p-3 border border-green-300 rounded-lg shadow-sm focus:ring focus:ring-green-200"
                value={formData[id]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
        </form>
      </div>
    </div>
  );
}
