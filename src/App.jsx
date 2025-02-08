// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

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
import DaftarBuku from "./buku/Daftarbuku";
import TambahBuku from "./buku/TambahBuku";
import EditBuku from "./buku/EditBuku";
import User from "./user/User";

import "./App.css";
import EditUser from "./user/EditUser";
import TambahUser from "./user/TambahUser";

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
        <Route path="/tambah-user" element={<TambahUser />} />
        <Route path="/siswa" element={<PageSiswa />} />
        <Route path="/edit-siswa/:id" element={<EditSiswa />} />


      </Routes>
    </Router>
  );
}

export default App;
