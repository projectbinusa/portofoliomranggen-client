import React from "react";
import { MapPin, Phone, Mail, Clock, Globe, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Kontak = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-emerald-500 hover:underline mb-4"
        >
          <ArrowLeft className="w-5 h-5" /> Kembali
        </button>
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
          Kontak Sekolah BINUSA
        </h3>
        <p className="text-gray-600 mb-6">
          Sekolah BINUSA berkomitmen untuk memberikan pendidikan berkualitas
          dengan fasilitas modern dan pengajar berkualifikasi tinggi. Hubungi
          kami untuk informasi lebih lanjut.
        </p>
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-gray-700">
            <MapPin className="w-6 h-6 text-emerald-500" />
            <span>Jl. Mondosari No. 123, Demak</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Phone className="w-6 h-6 text-emerald-500" />
            <span>+62 123 4567 890</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="w-6 h-6 text-emerald-500" />
            <span>info@binusa.edu</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Clock className="w-6 h-6 text-emerald-500" />
            <span>Senin - Sabtu, 08:00 - 16:00</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Globe className="w-6 h-6 text-emerald-500" />
            <a
              href="https://www.binusa.edu"
              className="text-emerald-500 hover:underline"
            >
              www.binusa.edu
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kontak;
