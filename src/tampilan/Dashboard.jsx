import { FiUsers, FiBook, FiBriefcase, FiCalendar, FiLayers } from "react-icons/fi";

export default function Dashboard() {
  return (
    <div className="p-6 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-800 min-h-screen">
      <div className="flex items-center justify-between p-6 bg-gray-900 rounded-lg shadow-md text-white">
        <div>
          <p className="text-sm text-gray-400">Guru</p>
          <h3 className="text-3xl font-bold">1,200</h3>
        </div>
        <FiUsers className="text-4xl text-green-400" />
      </div>
      
      <div className="flex items-center justify-between p-6 bg-orange-200 rounded-lg shadow-md text-gray-900">
        <div>
          <p className="text-sm text-gray-700">Siswa</p>
          <h3 className="text-3xl font-bold">20,500</h3>
        </div>
        <FiBook className="text-4xl text-gray-800" />
      </div>
      
      <div className="flex items-center justify-between p-6 bg-green-200 rounded-lg shadow-md text-gray-900">
        <div>
          <p className="text-sm text-gray-700">Organisasi</p>
          <h3 className="text-3xl font-bold">50</h3>
        </div>
        <FiBriefcase className="text-4xl text-gray-800" />
      </div>
      
      <div className="flex items-center justify-between p-6 bg-gray-900 rounded-lg shadow-md text-white">
        <div>
          <p className="text-sm text-gray-400">Kegiatan Sekolah</p>
          <h3 className="text-3xl font-bold">120</h3>
        </div>
        <FiCalendar className="text-4xl text-purple-400" />
      </div>
      
      <div className="flex items-center justify-between p-6 bg-gray-900 rounded-lg shadow-md text-white">
        <div>
          <p className="text-sm text-gray-400">Kategori Kelas</p>
          <h3 className="text-3xl font-bold">30</h3>
        </div>
        <FiLayers className="text-4xl text-blue-400" />
      </div>
    </div>
  );
}
