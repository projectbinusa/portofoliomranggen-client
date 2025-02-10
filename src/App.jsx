// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

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

import "./App.css";
import EditUser from "./user/EditUser";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rute publik */}
        <Route path="/" element={<Home />} />
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

      </Routes>
    </Router>
  );
}

export default App;
