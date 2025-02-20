import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrash } from "react-icons/fa";
import kodeImage from "../assets/kode.jpg";

const Sambutan = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("Selamat Datang di Bootcamp 2025 ✨");
  const [subMessage, setSubMessage] = useState(
    "Kami sangat senang Anda bergabung dalam perjalanan belajar yang luar biasa ini. Bootcamp ini dirancang untuk membantu Anda mengembangkan keterampilan dan mencapai potensi terbaik Anda. Selamat belajar dan sukses selalu! ✨"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSubMessages, setNewSubMessages] = useState([]);
  const [tempMessage, setTempMessage] = useState(""); // State untuk input sementara

  const handleTambah = () => {
    setIsModalOpen(true);
  };

  const handleHapus = () => {
    setNewSubMessages([]);
  };

  const handleSave = () => {
    if (tempMessage.trim()) {
      setNewSubMessages([...newSubMessages, tempMessage]); // Tambahkan hanya satu masukan
      setTempMessage(""); // Reset input
    }
    setIsModalOpen(false);
  };

  return (
    <div
      className="absolute top-0 left-0 w-full h-full flex items-center justify-center px-4 sm:px-8"
      style={{
        backgroundImage: `url(${kodeImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute top-4 right-4 bg-gradient-to-r from-gray-800 via-black to-gray-900 p-3 rounded-lg shadow-lg text-white flex items-center space-x-3 w-auto px-4">
        <span className="text-sm">Ada masukan?</span>
        <button className="bg-black text-white p-3 rounded-full shadow-lg hover:opacity-90 transition" onClick={handleTambah}>
          <FaPlus size={20} />
        </button>
        <button className="bg-black text-white p-3 rounded-full shadow-lg hover:opacity-90 transition" onClick={handleHapus}>
          <FaTrash size={20} />
        </button>
      </div>
      <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-green-800 text-white p-6 sm:p-12 rounded-2xl shadow-2xl max-w-lg sm:max-w-3xl text-center">
        <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 sm:mb-6 drop-shadow-lg">
          {message}
        </h1>
        <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
          {subMessage}
        </p>
        {newSubMessages.length > 0 && (
          <div className="bg-gradient-to-r from-gray-800 via-black to-green-900 p-4 rounded-lg mt-4">
            <h3 className="text-lg font-bold text-white mb-2">Masukan Anda:</h3> {/* Tambahan teks */}
            {newSubMessages.map((msg, index) => (
              <p key={index} className="text-gray-300 text-base sm:text-lg leading-relaxed">{msg}</p>
            ))}
          </div>
        )}
        <div className="flex flex-row gap-4 justify-center mt-4">
          <button 
            className="bg-black text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:opacity-90 transition"
            onClick={() => navigate("/visimisi")}
          >
            Selengkapnya 🚀
          </button>
          <button
            className="bg-black text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:opacity-90 transition"
            onClick={() => navigate(-1)}
          >
            Kembali 🔙
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
            <h2 className="text-lg font-bold mb-4">Tambah Masukan</h2>
            <textarea
              placeholder="Masukkan pendapat Anda"
              className="w-full p-2 mb-4 border rounded"
              value={tempMessage}
              onChange={(e) => setTempMessage(e.target.value)}
            />
            <div className="flex justify-between">
              <button className="bg-black text-white px-4 py-2 rounded hover:opacity-80" onClick={() => setIsModalOpen(false)}>Batal</button>
              <button className="bg-black text-white px-4 py-2 rounded hover:opacity-80" onClick={handleSave}>Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sambutan;
