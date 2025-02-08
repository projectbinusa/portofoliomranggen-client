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
import Uang from "./keuangan/Uang";
import TambahUang from "./keuangan/TambahUang";
import EditUang from "./keuangan/EditUang";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rute publik */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rute yang memerlukan autentikasi */}
        <Route
          path="/siswa"
          element={
            <PrivateRoute>
              <PageSiswa />
            </PrivateRoute>
          }
        />
        <Route
          path="/tambah-siswa"
          element={
            <PrivateRoute>
              <TambahSiswa />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-siswa/:id"
          element={
            <PrivateRoute>
              <EditSiswa />
            </PrivateRoute>
          }
        />
        <Route
          path="/guru"
          element={
            <PrivateRoute>
              <PageGuru />
            </PrivateRoute>
          }
        />
        <Route
          path="/tambah-guru"
          element={
            <PrivateRoute>
              <TambahGuru />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-guru/:id"
          element={
            <PrivateRoute>
              <EditGuru />
            </PrivateRoute>
          }
        />
        <Route
          path="/kategori-kelas"
          element={
            <PrivateRoute>
              <KategoriKelas />
            </PrivateRoute>
          }
        />
        <Route
          path="/tambah-kategori"
          element={
            <PrivateRoute>
              <TambahKategori />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-kategori/:id"
          element={
            <PrivateRoute>
              <EditKategori />
            </PrivateRoute>
          }
        />
        <Route
          path="/organisasi"
          element={
            <PrivateRoute>
              <PageOrganisasi />
            </PrivateRoute>
          }
        />
        <Route
          path="/tambah-organisasi"
          element={
            <PrivateRoute>
              <TambahOrganisasi />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-organisasi/:id"
          element={
            <PrivateRoute>
              <EditOrganisasi />
            </PrivateRoute>
          }
        />
        <Route
          path="/staff"
          element={
            <PrivateRoute>
              <DaftarStaff />
            </PrivateRoute>
          }
        />
        <Route
          path="/tambah-staff"
          element={
            <PrivateRoute>
              <TambahStaff />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-staff/:id"
          element={
            <PrivateRoute>
              <EditStaff />
            </PrivateRoute>
          }
        />
        <Route
          path="/produk"
          element={
            <PrivateRoute>
              <ProdukList />
            </PrivateRoute>
          }
        />
        <Route
          path="/tambah-produk"
          element={
            <PrivateRoute>
              <TambahProduk />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-produk/:id"
          element={
            <PrivateRoute>
              <EditProduk />
            </PrivateRoute>
          }
        />
        <Route
          path="/kegiatan-sekolah"
          element={
            <PrivateRoute>
              <KegiatanSekolah />
            </PrivateRoute>
          }
        />
        <Route
          path="/tambah-kegiatan"
          element={
            <PrivateRoute>
              <TambahKegiatan />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-kegiatan/:id"
          element={
            <PrivateRoute>
              <EditKegiatan />
            </PrivateRoute>
          }
        />
        <Route
          path="/uang"
          element={
            <PrivateRoute>
              <Uang />
            </PrivateRoute>
          }
        />
        <Route
          path="/tambah-uang"
          element={
            <PrivateRoute>
              <TambahUang />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-uang/:id"
          element={
            <PrivateRoute>
              <EditUang />
            </PrivateRoute>
          }
        />
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <User />
            </PrivateRoute>
          }
        />
        <Route
          path="/page-pesanan"
          element={
            <PrivateRoute>
              <PagePesanan />
            </PrivateRoute>
          }
        />
        <Route
          path="/tambah-pesanan"
          element={
            <PrivateRoute>
              <TambahPesanan />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-pesanan"
          element={
            <PrivateRoute>
              <EditPesanan />
            </PrivateRoute>
          }
        />
        <Route
          path="/daftar-buku"
          element={
            <PrivateRoute>
              <DaftarBuku />
            </PrivateRoute>
          }
        />
        <Route
          path="/tambah-buku"
          element={
            <PrivateRoute>
              <TambahBuku />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-buku"
          element={
            <PrivateRoute>
              <EditBuku />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
