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
import DaftarStaff from "./staff/DaftarStaff";
import TambahStaff from "./staff/TambahStaff";
import EditStaff from "./staff/EditStaff";
import Login from "./page/Login";
import Register from "./page/Register";
import TambahPesanan from "./pesanan/TambahPesanan";
import KegiatanSekolah from "./sekolah/KegiatanSekolah";
import TambahKegiatan from "./sekolah/TambahKegiatan";
import EditKegiatan from "./sekolah/EditKegiatan";
import Home from "./components/Home";
import ProdukList from "./produk/ProdukList";
import TambahProduk from "./produk/TambahProduk";
import EditProduk from "./produk/EditProduk";
import EditPesanan from "./pesanan/EditPesanan";
import PagePesanan from "./pesanan/PagePesanan";
import User from "./user/User";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
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
        <Route path="/edit-organisasi/:id" element={<EditOrganisasi />} />

        <Route path="/staff" element={<DaftarStaff />} />
        <Route path="/tambah-staff" element={<TambahStaff />} />
        <Route path="/edit-staff/:id" element={<EditStaff />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/page-pesanan" element={<PagePesanan />} />
        <Route path="/edit-pesanan/:id" element={<EditPesanan />} />
        <Route path="/tambah-pesanan" element={<TambahPesanan />} />


        <Route path="/produk" element={<ProdukList />} />
        <Route path="/tambah-produk" element={<TambahProduk />} />
        <Route path="/edit-produk" element={<EditProduk />} />

        <Route path="/kegiatan-sekolah" element={<KegiatanSekolah />} />
        <Route path="/tambah-kegiatan" element={<TambahKegiatan />} />
        <Route path="/edit-kegiatan/:id" element={<EditKegiatan />} />

        <Route path="/user" element={<User />} />

      </Routes>
    </Router>
  );
}

export default App;
