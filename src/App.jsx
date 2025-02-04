import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import PageSiswa from "./siswa/PageSiswa";
import TambahSiswa from "./siswa/TambahSiswa";
import EditSiswa from "./siswa/EditSiswa";
import PageGuru from "./guru/PageGuru";
import TambahGuru from "./guru/TambahGuru";
import EditGuru from "./guru/EditGuru";
import KategoriKelas from "./kategori/KategoriKelas";
import TambahKategori from "./kategori/TambahKategori";
import EditKategori from "./kategori/EditKategori";
import PageOrganisasi from "./organisasi/PageOrganisasi";
import TambahOrganisasi from "./organisasi/TambahOrganisasi";
import EditOrganisasi from "./organisasi/EditOrganisasi";

import "./App.css";

function App() {
  return (
    <Router>
      <nav className="nav-bar">
        <ul>
          <li>
            <Link to="/siswa">Daftar Siswa</Link>

          </li>
          <li>
            <Link to="/pageguru">PageGuru</Link> {/* Link ke PageGuru */}
          </li>
          <li>
            <Link to="/organisasi">Page Organisasi</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/siswa" element={<PageSiswa />} />
        <Route path="/tambah-siswa" element={<TambahSiswa />} />
        <Route path="/edit-siswa/:id" element={<EditSiswa />} />

        <Route path="/guru" element={<PageGuru />} />
        <Route path="/tambah-guru" element={<TambahGuru />} />
        <Route path="/edit-guru/:id" element={<EditGuru />} />

        <Route path="/kategori-kelas" element={<KategoriKelas />} />
        <Route path="/tambah-kategori" element={<TambahKategori />} />
        <Route path="/edit-kategori/:id" element={<EditKategori />} />

        <Route path="/organisasi" element={<PageOrganisasi />} />
        <Route path="/tambah-organisasi" element={<TambahOrganisasi />} />
        <Route path="/edit-organisasi" element={<EditOrganisasi />} />
        <Route path="/kategori-kelas" element={<KategoriKelas />} />
      </Routes>
    </Router>
  );
}

export default App;
