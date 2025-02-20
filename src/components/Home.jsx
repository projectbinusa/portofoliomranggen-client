import { useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={
        darkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"
      }
    >
      {/* Navbar */}
      <header className="flex justify-between items-center p-4 shadow-lg bg-[#00b894] text-white rounded-b-xl">
        <h1 className="text-2xl font-extrabold">Binus</h1>
        <nav>
          <ul className="flex gap-6">
            {[
              { name: "Home", path: "/" },
              { name: "Visi Misi", path: "/visi-misi" },
              { name: "Sambutan", path: "/sambutan" },
            ].map((item) => (
              <li key={item.name}>
                <a
                  href={item.path}
                  className="hover:underline hover:text-gray-200 transition-all text-lg font-medium"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-3 bg-gray-800 rounded-full transition-all hover:bg-gray-700 shadow-md"
        >
          {darkMode ? (
            <Moon className="text-yellow-400" />
          ) : (
            <Sun className="text-white" />
          )}
        </button>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 bg-[#00b894] text-white rounded-xl mx-4 mt-4 shadow-lg">
        <h2 className="text-5xl font-extrabold">
          Selamat Datang di Sekolah Binusa
        </h2>
        <p className="mt-4 text-xl">
          Membangun generasi unggul dengan pendidikan berkualitas
        </p>
      </section>

      {/* Fitur Sekolah */}
      <section className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {["Fasilitas Lengkap", "Guru Berkualitas", "Program Unggulan"].map(
          (item, index) => (
            <div
              key={index}
              className="p-6 bg-[#dfe6e9] rounded-lg shadow-lg hover:shadow-xl transition-all dark:bg-gray-700 transform hover:-translate-y-2"
            >
              <h3 className="font-bold text-xl text-[#00b894]">{item}</h3>
              <p className="mt-3 text-gray-700 dark:text-gray-300">
                {index === 0 &&
                  "Laboratorium, perpustakaan, dan lapangan olahraga yang modern."}
                {index === 1 &&
                  "Tenaga pengajar yang berpengalaman dan bersertifikasi."}
                {index === 2 && "Kurikulum berbasis teknologi dan kreativitas."}
              </p>
            </div>
          )
        )}
      </section>

      {/* Program Sekolah */}
      <section className="p-8 bg-gray-100 dark:bg-gray-800 rounded-xl mx-4 shadow-lg">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-[#00b894]">
          Program Sekolah
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "Program Sains",
            "Program Seni",
            "Program Olahraga",
            "Program Teknologi",
            "Program Bahasa",
            "Program Kewirausahaan",
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2"
            >
              <h3 className="font-bold text-xl text-[#00b894]">{item}</h3>
              <p className="mt-3 text-gray-700 dark:text-gray-300">
                {index === 0 &&
                  "Eksperimen dan penelitian untuk mengembangkan keterampilan ilmiah."}
                {index === 1 &&
                  "Mengembangkan kreativitas siswa dalam seni musik, lukis, dan tari."}
                {index === 2 &&
                  "Pembinaan atlet muda melalui berbagai cabang olahraga."}
                {index === 3 &&
                  "Pelatihan coding, robotika, dan inovasi digital."}
                {index === 4 &&
                  "Kursus bahasa asing untuk mempersiapkan siswa menghadapi dunia global."}
                {index === 5 &&
                  "Mengajarkan siswa keterampilan bisnis dan manajemen usaha."}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center p-5 bg-gray-800 text-white mt-8 rounded-t-xl shadow-lg">
        <p className="text-lg">
          &copy; 2025 Sekolah Binusa. Semua hak dilindungi.
        </p>
      </footer>
    </div>
  );
}
