import { Camera } from "lucide-react";

export default function ProfileCard({ fotoProfil, formData, onFotoChange }) {
  return (
    <div className="w-1/3 bg-gray-50 p-6 rounded-lg shadow-md flex flex-col items-center">
      {/* Foto Profil */}
      <div className="relative w-28 h-28">
        <img src={fotoProfil} alt="Profile" className="w-full h-full rounded-full object-cover border-4 border-gray-300" />
        <label htmlFor="profilePicUpload" className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer">
          <Camera className="w-6 h-6 text-blue-500" />
        </label>
        <input type="file" id="profilePicUpload" className="hidden" onChange={onFotoChange} />
      </div>

      {/* Nama dan Jabatan */}
      <h2 className="mt-4 text-xl font-bold">{formData.username || "User Name"}</h2>
      <p className="text-gray-500">{formData.designation || "Your Job Title"}</p>

      {/* Statistik */}
      <div className="flex justify-between w-full mt-4 text-center">
        {["86 Post", "40 Project", "4.5K Members"].map((item, index) => (
          <div key={index}>
            <p className="text-lg font-semibold">{item.split(" ")[0]}</p>
            <p className="text-gray-500 text-sm">{item.split(" ")[1]}</p>
          </div>
        ))}
      </div>

      {/* Social Media */}
      <div className="mt-4 flex space-x-3">
        <button className="bg-red-500 text-white p-2 rounded-full">G</button>
        <button className="bg-blue-500 text-white p-2 rounded-full">f</button>
        <button className="bg-gray-900 text-white p-2 rounded-full">𝕏</button>
      </div>
    </div>
  );
}
