import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const schoolEventImage =
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEji4cTKAWFMoX7coLaT1iewV281bbXNGeJjCemXcm3yAh6yVny-ZKymiX8v2OYgIvjMUFVZ2A0L_MobxEq4VsVzJB2Ou8OVaUFMSxM_OgOwtkTnfBjwAeL9TLAzcl-Rv64YW3FEt6D7Imou/s640/IMG_4455.jpg"; // Replace with a relevant school event image URL

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#00b894] to-[#2c6b32] flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      <motion.h1
        className="text-4xl md:text-6xl font-extrabold mb-6 md:mb-8 text-white drop-shadow-lg text-center animate__animated animate__fadeIn animate__delay-1s"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Selamat Datang di <span className="text-yellow-300">Sekolahku</span>
      </motion.h1>

      <motion.div
        className="w-full max-w-3xl bg-transparent shadow-2xl backdrop-blur-lg rounded-3xl p-6 md:p-8 text-center mb-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-base md:text-lg text-gray-100 mb-4 md:mb-6 font-medium">
          Temukan informasi acara, kegiatan, dan pengumuman sekolah dengan mudah
          dan cepat!
        </p>
        <button
          className="w-full md:w-auto bg-gradient-to-r from-[#00b894] to-[#16a085] hover:from-[#16a085] hover:to-[#00b894] text-white font-semibold py-2 px-4 md:py-3 md:px-6 rounded-lg shadow-lg transition-all duration-300 mb-4"
          onClick={() => navigate("/login")}
        >
          Masuk
        </button>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <motion.button
            className="bg-gradient-to-r from-[#ff6347] to-[#ff4500] hover:from-[#ff4500] hover:to-[#ff6347] text-white font-semibold py-2 px-4 md:py-3 md:px-6 rounded-lg shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/visimisi")}
          >
            Visi & Misi
          </motion.button>
          <motion.button
            className="bg-gradient-to-r from-[#ff8c00] to-[#f08080] hover:from-[#f08080] hover:to-[#ff8c00] text-white font-semibold py-2 px-4 md:py-3 md:px-6 rounded-lg shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/sambutan")}
          >
            Sambutan
          </motion.button>
        </div>
      </motion.div>

      {/* Gambar Acara Sekolah */}
      <div className="w-full max-w-5xl px-4 md:px-10 mt-12 mb-10">
        <motion.img
          src={schoolEventImage}
          alt="Acara Sekolah"
          className="w-full h-80 md:h-96 object-cover rounded-lg shadow-xl transform hover:scale-105 transition-all duration-500"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        />
      </div>

      {/* Keterangan Acara */}
      <div className="mt-6 text-center text-white">
        <h2 className="text-3xl font-semibold mb-4">Acara Sekolah Menarik</h2>
        <p className="text-gray-200 text-lg md:text-xl mb-6">
          Jangan lewatkan acara seru di sekolah kami! Bergabunglah untuk
          berbagai kegiatan, lomba, dan pengumuman penting yang akan membuat
          pengalaman sekolah Anda lebih berwarna.
        </p>
      </div>

      {/* Background Animations */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full opacity-30 animate__animated animate__pulse animate__infinite"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, repeat: Infinity }}
      ></motion.div>
      <motion.div
        className="absolute top-24 right-16 w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-700 rounded-full opacity-30 animate__animated animate__pulse animate__infinite"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, repeat: Infinity }}
      ></motion.div>

      {/* Informational Section */}
      <motion.div
        className="w-full max-w-5xl text-white bg-transparent shadow-2xl backdrop-blur-lg rounded-3xl p-6 md:p-8 mt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl md:text-3xl font-semibold mb-4">
          Informasi Terkini
        </h3>
        <p className="text-base md:text-lg text-gray-200 mb-4">
          Dapatkan informasi terbaru seputar kegiatan dan perkembangan sekolah
          kami! Kami selalu siap memberikan yang terbaik.
        </p>
      </motion.div>
    </div>
  );
};

export default Home;
