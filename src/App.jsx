import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./tampilan/Dashboard";

// **Import Komponen Publik**
import Home from "./components/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import Sambutan from "./page/Sambutan";
import VisiMisi from "./page/visimisi";
import NotFoundPage from "./page/NotFoundPage";

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

// **Import Komponen Pesanan**
import PagePesanan from "./pesanan/PagePesanan";
import TambahPesanan from "./pesanan/TambahPesanan";
import EditPesanan from "./pesanan/EditPesanan";

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
import TambahUser from "./user/TambahUser";


import PageProfil from "./profil/PageProfil";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sambutan" element={<Sambutan />} />
        <Route path="/visimisi" element={<VisiMisi />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Routes untuk Siswa */}
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

        {/* Routes untuk Guru */}
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

        {/* Routes untuk Kategori/Kelas */}
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

        {/* Routes untuk Organisasi */}
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

        {/* Routes untuk Staff */}
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

        {/* Routes untuk Pesanan */}
        <Route
          path="/pesanan"
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
          path="/edit-pesanan/:id"
          element={
            <PrivateRoute>
              <EditPesanan />
            </PrivateRoute>
          }
        />

        {/* Routes untuk Sekolah */}
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

        {/* Routes untuk Produk */}
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

        {/* Routes untuk Buku */}
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

        {/* Routes untuk User */}
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <User />
            </PrivateRoute>
          }
        />
        <Route
          path="/tambah-user"
          element={
            <PrivateRoute>
              <TambahUser />
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
          path="/page-profil"
          element={
            <PrivateRoute>
              <PageProfil />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />

         
      </Routes>
    </Router>
  );
}

export default App;
