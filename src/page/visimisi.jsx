import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaReact,
  FaNodeJs,
  FaTiktok,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const VisiMisi = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fadeElements = document.querySelectorAll(".fade-in");
    fadeElements.forEach((el) => el.classList.add("show"));
  }, []);

  return (
    <div className="bg-gradient-to-r from-green-500 to-green-900 min-h-screen text-gray-900 flex flex-col items-center justify-center px-4 sm:px-8 py-6">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="text-center fade-in">
          <h1 className="text-3xl sm:text-4xl font-bold text-yellow-300 mb-4">
            Visi & Misi Task Bootcamp 2025
          </h1>
          <p className="text-base sm:text-lg text-gray-200">
            Membangun generasi profesional yang siap menghadapi tantangan dunia
            kerja.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-xl shadow-lg border-4 border-green-400 fade-in transform transition duration-500 hover:scale-105 hover:border-yellow-400">
            <h2 className="text-xl font-semibold text-green-500 mb-4">Visi</h2>
            <p className="text-gray-700">
              Menjadi program pelatihan terbaik yang menciptakan talenta digital
              unggul, inovatif, dan siap kerja di era industri 4.0.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-lg border-4 border-teal-400 fade-in transform transition duration-500 hover:scale-105 hover:border-yellow-400 max-h-56 sm:max-h-64 overflow-y-auto">
            <h2 className="text-xl font-semibold text-teal-500 mb-4">Misi</h2>
            <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base">
              <li>
                Menyediakan pelatihan berbasis industri dengan kurikulum
                terkini.
              </li>
              <li>
                Membantu peserta mengembangkan keterampilan teknis dan soft
                skills.
              </li>
              <li>Memberikan pengalaman proyek nyata untuk kesiapan kerja.</li>
              <li>Menjalin kemitraan dengan perusahaan untuk peluang kerja.</li>
              <li>
                Mengembangkan jaringan alumni yang solid untuk dukungan karir.
              </li>
              <li>Mendorong inovasi melalui pembelajaran berbasis proyek.</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold text-yellow-300 mb-4">
            Technologies We Use
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-white p-4 rounded-xl shadow-lg border-4 border-green-500 hover:bg-green-500 hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
              <FaReact size={40} />
              <p className="mt-2 text-sm sm:text-lg font-semibold">React</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-lg border-4 border-teal-500 hover:bg-teal-500 hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
              <FaNodeJs size={40} />
              <p className="mt-2 text-sm sm:text-lg font-semibold">Node.js</p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold text-yellow-300 mb-4">
            Follow Us
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="https://tiktok.com"
              className="bg-white p-4 rounded-xl shadow-lg border-4 border-black hover:bg-black hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
            >
              <FaTiktok size={30} />
              <p className="mt-2 text-sm sm:text-lg font-semibold">Tiktok</p>
            </a>
            <a
              href="https://instagram.com"
              className="bg-white p-4 rounded-xl shadow-lg border-4 border-pink-500 hover:bg-pink-500 hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
            >
              <FaInstagram size={30} />
              <p className="mt-2 text-sm sm:text-lg font-semibold">Instagram</p>
            </a>
            <a
              href="https://youtube.com"
              className="bg-white p-4 rounded-xl shadow-lg border-4 border-red-600 hover:bg-red-600 hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
            >
              <FaYoutube size={30} />
              <p className="mt-2 text-sm sm:text-lg font-semibold">YouTube</p>
            </a>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            className="bg-gradient-to-r from-red-500 to-red-800 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:opacity-90 transition"
            onClick={() => navigate(-1)}
          >
            Kembali 🔙
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisiMisi;
