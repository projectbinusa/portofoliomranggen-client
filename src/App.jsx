import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import KategoriKelas from "./kategori/KategoriKelas";
import PageSiswa from "./siswa/PageSiswa"; // Update path sesuai folder Siswa
import PageGuru from "./NewPage/PageGuru";
import TambahSiswa from "./siswa/TambahSiswa";
import EditSiswa from "./siswa/EditSiswa";
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
            <Link to="/siswa">Daftar Siswa</Link> {/* Link ke PageSiswa */}
          </li>
          <li>
          <Link to="/pageguru">PageGuru</Link>
          </li>
          <li>
            <Link to="/organisasi">Page Organisasi</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/kelas" element={<KategoriKelas />} />
        <Route path="/siswa" element={<PageSiswa />} /> {/* Daftar siswa */}
        <Route path="/pageguru" element={<PageGuru />} />
        <Route path="/tambahsiswa" element={<TambahSiswa />} />
        <Route path="/editsiswa/:id" element={<EditSiswa />} />
        <Route path="/organisasi" element={<PageOrganisasi />} />
        <Route path="/tambah-organisasi" element={<TambahOrganisasi />} />
        <Route path="/edit-organisasi" element={<EditOrganisasi />} />
      </Routes>
    </Router>
  );
}

export default App;
