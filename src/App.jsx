import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./page/Home";
import About from "./page/About";
import Contact from "./page/Contact";
import KategoriKelas from "./kategori/KategoriKelas";
import PageSiswa from "./Siswa/PageSiswa"; // Update path sesuai folder Siswa
import PageGuru from "./NewPage/PageGuru";
import TambahSiswa from "./Siswa/TambahSiswa";
import EditSiswa from "./Siswa/EditSiswa";
import PageOrganisasi from "./Organisasi/PageOrganisasi";
import TambahOrganisasi from "./Organisasi/TambahOrganisasi";
import EditOrganisasi from "./Organisasi/EditOrganisasi";
import "./App.css";

function App() {
  return (
    <Router>
      <nav className="nav-bar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/siswa">Daftar Siswa</Link> {/* Link ke PageSiswa */}
          </li>
          <li>
          <Link to="/pageguru">PageGuru</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/kelas" element={<KategoriKelas />} />
        <Route path="/siswa" element={<PageSiswa />} /> {/* Daftar siswa */}
        <Route path="/pageguru" element={<PageGuru />} />
        <Route path="/tambah-siswa" element={<TambahSiswa />} />
        <Route path="/edit-siswa/:id" element={<EditSiswa />} />
        <Route path="/organisasi" element={<PageOrganisasi />} />
        <Route path="/tambah-organisasi" element={<TambahOrganisasi />} />
        <Route path="/edit-organisasi" element={<EditOrganisasi />} />
      </Routes>
    </Router>
  );
}

export default App;
