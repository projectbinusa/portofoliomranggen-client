import React from "react";
import { useNavigate } from "react-router-dom";
import kodeImage from "../assets/kode.jpg";

const Sambutan = () => {
  const navigate = useNavigate();

  return (
    <div
      className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
      style={{
        backgroundImage: `url(${kodeImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-black p-12 rounded-2xl shadow-2xl max-w-4xl text-center">
        <h1 className="text-5xl font-extrabold text-white mb-6 drop-shadow-lg">
          Selamat Datang di Bootcamp 2025 ✨
        </h1>
        <p className="text-gray-300 text-lg mb-8 leading-relaxed">
          Kami sangat senang Anda bergabung dalam perjalanan belajar yang luar
          biasa ini. Bootcamp ini dirancang untuk membantu Anda mengembangkan
          keterampilan dan mencapai potensi terbaik Anda. Selamat belajar dan
          sukses selalu! ✨
        </p>
        <div className="flex gap-4 justify-center">
          <button className="bg-gradient-to-r from-green-500 to-green-800 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:opacity-90 transition">
            Selengkapnya 🚀
          </button>
          <button
            className="bg-gradient-to-r from-red-500 to-red-800 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:opacity-90 transition"
            onClick={() => navigate(-1)}
          >
            Kembali 🔙
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sambutan;
