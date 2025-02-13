import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const eventImages = [
  "https://media.istockphoto.com/id/1227322603/id/vektor/template-tiket-konser-acara-musik-tiket-tiket-tiket-tiket-desain-flyer.jpg?s=612x612&w=0&k=20&c=h9SET1t1b-Wohr0PGib_ZwqYMetXEY4kUdJLwwr18mM=",
  "https://media.kompas.tv/library/image/content_article/article_img/20210802121301.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0dSN8ImfRwYdQ5BrvEa5z5wYUIAZszRKG_g&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaOmGcdZQ-pCjFN5UItfgx9MnP_5Py47j0wA&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtTdWEuGRgu558zr376dyS9cuPlcJA6zTSfkJQGtJZsaSOqj83CeiGs4rx0kNzJh7UxCM&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9KT3zQ-5kPsUS14IMSd_ltxEw9vANBi9jxA&s",
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#00b894] to-[#0984e3] flex flex-col items-center p-4 md:p-8">
      <motion.h1
        className="text-4xl md:text-6xl font-extrabold mb-6 md:mb-8 text-white drop-shadow-lg text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Selamat Datang di <span className="text-yellow-300">AppTicket</span>
      </motion.h1>

      <motion.div
        className="w-full max-w-3xl bg-transparent shadow-2xl backdrop-blur-lg rounded-3xl p-6 md:p-8 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-base md:text-lg text-gray-100 mb-4 md:mb-6 font-medium">
          Temukan dan pesan tiket untuk acara, konser, dan pertunjukan favorit
          Anda dengan mudah dan cepat!
        </p>
        <button
          className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-semibold py-2 px-4 md:py-3 md:px-6 rounded-lg shadow-lg transition-all duration-300 mb-4"
          onClick={() => navigate("/login")}
        >
          Masuk
        </button>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <motion.button
            className="bg-gradient-to-r from-green-400 to-teal-500 hover:from-teal-500 hover:to-green-400 text-white font-semibold py-2 px-4 md:py-3 md:px-6 rounded-lg shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/visimisi")}
          >
            Visi & Misi
          </motion.button>
          <motion.button
            className="bg-gradient-to-r from-orange-400 to-red-500 hover:from-red-500 hover:to-orange-400 text-white font-semibold py-2 px-4 md:py-3 md:px-6 rounded-lg shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/sambutan")}
          >
            Sambutan
          </motion.button>
        </div>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4 md:px-10">
        {eventImages.map((image, index) => (
          <motion.div
            key={index}
            className="bg-transparent shadow-lg backdrop-blur-md rounded-xl p-4 flex flex-col items-center text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            whileHover={{ scale: 1.07 }}
          >
            <img
              src={image}
              alt={`Acara ${index + 1}`}
              className="h-40 sm:h-60 w-full rounded-lg mb-4 object-cover"
            />
            <h2 className="text-xl md:text-2xl font-semibold text-white">
              Acara Menarik {index + 1}
            </h2>
            <p className="text-gray-200 text-sm md:text-base">
              Tanggal: Segera Diumumkan
            </p>
            <button className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 md:py-2 md:px-6 rounded-lg shadow-md transition-all duration-300">
              Dapatkan Tiket
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;
