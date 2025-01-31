import { Pencil, Trash2 } from "lucide-react"; // Import ikon

const KategoriKelas = () => {
  const kelasData = [
    { id: 1, nama: "Kelas A" },
    { id: 2, nama: "Kelas B" },
    { id: 3, nama: "Kelas C" },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Kategori Kelas</h1>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
          Tambah Kelas
        </button>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">Kelas</th>
              <th className="px-6 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {kelasData.map((kelas, index) => (
              <tr
                key={kelas.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 font-medium">{kelas.nama}</td>
                <td className="px-6 py-4 flex gap-3">
                  {/* Tombol Edit */}
                  <button className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition">
                    <Pencil size={18} />
                  </button>
                  {/* Tombol Hapus */}
                  <button className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KategoriKelas;