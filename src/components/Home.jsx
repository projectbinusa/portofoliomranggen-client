import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-emerald-600 flex flex-col items-center p-6">
      <motion.h1
        className="text-5xl font-extrabold mb-6 text-white drop-shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Selamat Datang di TicketMaster
      </motion.h1>

      <motion.div
        className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-6 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-lg text-gray-700 mb-4">
          Temukan dan pesan tiket untuk acara, konser, dan pertunjukan favorit
          Anda!
        </p>
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
          onClick={() => navigate("/login")}
        >
          Masuk
        </button>
      </motion.div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {[1, 2, 3, 4, 5, 6].map((event) => (
          <motion.div
            key={event}
            className="bg-white shadow-lg rounded-xl p-4 flex flex-col items-center text-center"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/131/2024/08/09/Screenshot_20240809-154726-2513334198.jpg"
              alt="Acara"
              className="h-40 w-full rounded-lg mb-4 object-cover"
            />

            <h2 className="text-xl font-semibold text-gray-800">
              Acara Menarik {event}
            </h2>
            <p className="text-gray-600 text-sm">Tanggal: Segera Diumumkan</p>
            <button className="mt-3 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg">
              Dapatkan Tiket
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;
