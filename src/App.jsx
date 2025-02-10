// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

import Dashboard from "./tampilan/Dashboard";

// **Import Komponen Siswa**
import PageSiswa from "./siswa/PageSiswa";
import TambahSiswa from "./siswa/TambahSiswa";
import EditSiswa from "./siswa/EditSiswa";

// **Import Komponen Guru**
import PageGuru from "./guru/PageGuru";
import TambahGuru from "./guru/TambahGuru";
import EditGuru from "./guru/EditGuru";

// **Import Komponen Kategori/Kelas**
import KategoriKelas from "./kelas/KategoriKelas";
import TambahKategori from "./kelas/TambahKategori";
import EditKategori from "./kelas/EditKategori";

// **Import Komponen Organisasi**
import PageOrganisasi from "./organisasi/PageOrganisasi";
import TambahOrganisasi from "./organisasi/TambahOrganisasi";
import EditOrganisasi from "./organisasi/EditOrganisasi";

// **Import Komponen Staff**
import DaftarStaff from "./staff/DaftarStaff";
import TambahStaff from "./staff/TambahStaff";
import EditStaff from "./staff/EditStaff";

// **Import Komponen Autentikasi**
import Login from "./page/Login";
import Register from "./page/Register";

// **Import Komponen Pesanan**
import TambahPesanan from "./pesanan/TambahPesanan";
import EditPesanan from "./pesanan/EditPesanan";
import PagePesanan from "./pesanan/PagePesanan";

// **Import Komponen Sekolah**
import KegiatanSekolah from "./sekolah/KegiatanSekolah";
import TambahKegiatan from "./sekolah/TambahKegiatan";
import EditKegiatan from "./sekolah/EditKegiatan";

// **Import Komponen Produk**
import ProdukList from "./produk/ProdukList";
import TambahProduk from "./produk/TambahProduk";
import EditProduk from "./produk/EditProduk";

// **Import Komponen Buku**
import DaftarBuku from "./buku/DaftarBuku";
import TambahBuku from "./buku/TambahBuku";
import EditBuku from "./buku/EditBuku";

// **Import Komponen User**
import User from "./user/User";
import EditUser from "./user/EditUser";

// **Import Komponen Utama**
import Home from "./components/Home";

// **Import Komponen Kategori**
import PageKategori from "./kategori/PageKategori";
import TambahKategoriA from "./kategori/TambahKategoriA";
import EditKategoriA from "./kategori/EditKategoriA";


import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rute Publik */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rute yang dilindungi dengan PrivateRoute */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
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
          path="/page-pesanan"
          element={
            <PrivateRoute>
              <PagePesanan />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-pesanan/:id"
          element={
            <PrivateRoute>
              <EditPesanan />
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
          path="/buku"
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
          path="/edit-buku/:id"
          element={
            <PrivateRoute>
              <EditBuku />
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
          path="/edit-user/:id"
          element={
            <PrivateRoute>
              <EditUser />
            </PrivateRoute>
          }
        />
         <Route
          path="/page-kategori"
          element={
            <PrivateRoute>
              <PageKategori />
            </PrivateRoute>
          }
        />
        <Route
          path="/tambah-kategori-a"
          element={
            <PrivateRoute>
              <TambahKategoriA />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-kategori-a/:id"
          element={
            <PrivateRoute>
              <EditKategoriA />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
