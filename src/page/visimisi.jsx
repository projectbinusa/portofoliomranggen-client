import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const VisiMisi = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fadeElements = document.querySelectorAll(".fade-in");
    fadeElements.forEach((el) => el.classList.add("show"));
  }, []);

  return (
    <div className="bg-gradient-to-br from-green-600 to-green-900 min-h-screen flex items-center justify-center px-6 py-10 text-gray-100">
      <div className="max-w-4xl w-full bg-white bg-opacity-10 backdrop-blur-md rounded-2xl shadow-lg p-8 sm:p-12">
        <div className="text-center fade-in">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-yellow-300 mb-4 drop-shadow-lg">
            Visi & Misi Task Bootcamp 2025
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 max-w-lg mx-auto">
            Membangun generasi profesional yang siap menghadapi tantangan dunia
            kerja.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white bg-opacity-20 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-green-300 fade-in transform transition duration-500 hover:scale-105 hover:border-yellow-400">
            <h2 className="text-2xl font-bold text-green-400 mb-3">Visi</h2>
            <p className="text-gray-100">
              Menjadi program pelatihan terbaik yang menciptakan talenta digital
              unggul, inovatif, dan siap kerja di era industri 4.0.
            </p>
          </div>

          <div className="bg-white bg-opacity-20 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-teal-300 fade-in transform transition duration-500 hover:scale-105 hover:border-yellow-400 max-h-64 overflow-y-auto">
            <h2 className="text-2xl font-bold text-teal-400 mb-3">Misi</h2>
            <ul className="list-disc list-inside text-gray-100 text-base space-y-2">
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
          <button
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-700 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:opacity-90 transition"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="text-lg" /> Kembali
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisiMisi;
