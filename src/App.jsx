import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import PageSiswa from "./Siswa/PageSiswa";
import TambahSiswa from "./Siswa/TambahSiswa";
import EditSiswa from "./Siswa/EditSiswa";
import PageGuru from "./Guru/PageGuru";
import TambahGuru from "./Guru/TambahGuru";
import EditGuru from "./Guru/EditGuru";
import KategoriKelas from "./kelas/KategoriKelas";
import TambahKategori from "./kelas/TambahKategori";
import EditKategori from "./kelas/EditKategori";
import PageOrganisasi from "./Organisasi/PageOrganisasi";
import TambahOrganisasi from "./Organisasi/TambahOrganisasi";
import EditOrganisasi from "./Organisasi/EditOrganisasi";
import DaftarStaff from "./staff/DaftarStaff";
import TambahStaff from "./staff/TambahStaff";
import EditStaff from "./staff/EditStaff";
import Login from "./page/Login";
import Register from "./page/Register";
import TambahPesanan from "./Pesanan/TambahPesanan";
import KegiatanSekolah from "./sekolah/KegiatanSekolah";
import TambahKegiatan from "./sekolah/TambahKegiatan";
import EditKegiatan from "./sekolah/EditKegiatan";
import Home from "./components/Home";
import ProdukList from "./produk/ProdukList";
import TambahProduk from "./produk/TambahProduk";
import EditProduk from "./produk/EditProduk";
import EditPesanan from "./Pesanan/EditPesanan";
import PagePesanan from "./Pesanan/PagePesanan";
import DaftarBuku from "./buku/Daftarbuku";
import TambahBuku from "./buku/TambahBuku";
import EditBuku from "./buku/EditBuku";
import User from "./user/User";
import Uang from "./keuangan/Uang";
import TambahUang from "./keuangan/TambahUang";
import EditUang from "./keuangan/EditUang";
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
        <Route path="/edit-produk/:id" element={<EditProduk />} />

        <Route path="/kegiatan-sekolah" element={<KegiatanSekolah />} />
        <Route path="/tambah-kegiatan" element={<TambahKegiatan />} />
        <Route path="/edit-kegiatan/:id" element={<EditKegiatan />} />


        <Route path="/buku" element={<DaftarBuku />} />
        <Route path="/tambah-buku" element={<TambahBuku />} />
        <Route path="/edit-buku/:id" element={<EditBuku />} />

        <Route path="/user" element={<User />} />

        <Route path="/uang" element={<Uang />} />
        <Route path="/tambah-uang" element={<TambahUang />} />
        <Route path="/edit-uang/:id" element={<EditUang />} />


      </Routes>
    </Router>
  );
}

export default App;
