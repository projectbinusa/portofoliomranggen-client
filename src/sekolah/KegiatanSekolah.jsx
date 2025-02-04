import React from "react";

const kegiatanSekolah = [
  {
    nama: "Lomba Sains",
    deskripsi: "Kompetisi sains tingkat sekolah",
    tingkat: "Sekolah",
    penyelenggara: "OSIS",
    penanggungJawab: "Pak Budi",
    hasil: "Piala & Sertifikat",
  },
  {
    nama: "Lomba Basket",
    deskripsi: "Turnamen basket antar kelas",
    tingkat: "Sekolah",
    penyelenggara: "Ekstrakurikuler Basket",
    penanggungJawab: "Bu Siti",
    hasil: "Medali",
  },
  {
    nama: "Olimpiade Matematika",
    deskripsi: "Kompetisi matematika tingkat nasional",
    tingkat: "Nasional",
    penyelenggara: "Dinas Pendidikan",
    penanggungJawab: "Pak Joko",
    hasil: "Sertifikat & Beasiswa",
  },
];

const KegiatanSekolah = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Daftar Kegiatan Sekolah</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Nama Kegiatan</th>
              <th className="p-3 border">Deskripsi Kegiatan</th>
              <th className="p-3 border">Tingkat Kegiatan</th>
              <th className="p-3 border">Penyelenggara</th>
              <th className="p-3 border">Penanggung Jawab</th>
              <th className="p-3 border">Hasil</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {kegiatanSekolah.map((kegiatan, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-3 border">{kegiatan.nama}</td>
                <td className="p-3 border">{kegiatan.deskripsi}</td>
                <td className="p-3 border">{kegiatan.tingkat}</td>
                <td className="p-3 border">{kegiatan.penyelenggara}</td>
                <td className="p-3 border">{kegiatan.penanggungJawab}</td>
                <td className="p-3 border">{kegiatan.hasil}</td>
                <td className="p-3 border">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Edit
                  </button>
                  <button className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                    Hapus
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

export default KegiatanSekolah;