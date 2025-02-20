import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DarkModeProvider } from "./contextt/DarkModeContext"; // ✅ Perbaikan path
import { NotificationProvider } from "./context/NotificationContext";

// **Import Komponen Publik**
import Home from "./components/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import Sambutan from "./sambutan/Sambutan";
import AddSambutan from "./sambutan/AddSambutan";
import VisiMisi from "./visimisi/VisiMisi"; // ✅ Pastikan konsisten dengan nama file
import AddVisiMisi from "./visimisi/AddVisiMisi"; // ✅ Pastikan konsisten dengan nama file
import NotFoundPage from "./page/NotFoundPage";

// **Import Komponen Dashboard**
import Dashboard from "./tampilan/Dashboard";

// **Import Komponen Lainnya**
import PageSiswa from "./siswa/PageSiswa";
import TambahSiswa from "./siswa/TambahSiswa";
import EditSiswa from "./siswa/EditSiswa";
import DetailSiswa from "./siswa/DetailSiswa";

import PageGuru from "./guru/PageGuru";
import TambahGuru from "./guru/TambahGuru";
import EditGuru from "./guru/EditGuru";
import DetailGuru from "./guru/DetailGuru";

import KategoriKelas from "./kelas/KategoriKelas";
import TambahKategori from "./kelas/TambahKategori";
import EditKategori from "./kelas/EditKategori";

import PageOrganisasi from "./organisasi/PageOrganisasi";
import TambahOrganisasi from "./organisasi/TambahOrganisasi";
import EditOrganisasi from "./organisasi/EditOrganisasi";
import DetailOrganisasi from "./organisasi/DetailOrganisasi";

import DaftarStaff from "./staff/DaftarStaff";
import TambahStaff from "./staff/TambahStaff";
import EditStaff from "./staff/EditStaff";
import DetailStaff from "./staff/DetailStaff";

import PagePesanan from "./pesanan/PagePesanan";
import TambahPesanan from "./pesanan/TambahPesanan";
import EditPesanan from "./pesanan/EditPesanan";

import KegiatanSekolah from "./sekolah/KegiatanSekolah";
import TambahKegiatan from "./sekolah/TambahKegiatan";
import EditKegiatan from "./sekolah/EditKegiatan";
import DetailSekolah from "./sekolah/DetailSekolah";

import ProdukList from "./produk/ProdukList";
import TambahProduk from "./produk/TambahProduk";
import EditProduk from "./produk/EditProduk";

import DaftarBuku from "./buku/DaftarBuku";
import TambahBuku from "./buku/TambahBuku";
import EditBuku from "./buku/EditBuku";

import User from "./user/User";
import EditUser from "./user/EditUser";
import TambahUser from "./user/TambahUser";
import PageProfil from "./profil/PageProfil";

import PageKategori from "./kategori/PageKategori";
import TambahKategoriA from "./kategori/TambahKategoriA";
import EditKategoriA from "./kategori/EditKategoriA";

import PageDonasi from "./donasi/PageDonasi";
import TambahDonasi from "./donasi/TambahDonasi";
import EditDonasi from "./donasi/EditDonasi";

import Berita from "./berita/Berita";
import TambahBerita from "./berita/TambahBerita";
import EditBerita from "./berita/EditBerita";

import Navbar from "./tampilan/Navbar";

import "./App.css";

function App() {
  return (
    <DarkModeProvider>
      {" "}
      {/* ✅ Pindahkan agar mencakup semua halaman */}
      <NotificationProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/sambutan" element={<Sambutan />} />
            <Route path="/addsambutan" element={<AddSambutan />} />
            <Route path="/visi-misi" element={<VisiMisi />} />
            <Route path="/addvisi-misi" element={<AddVisiMisi />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Routes untuk Siswa */}
            <Route path="/siswa" element={<PageSiswa />} />
            <Route path="/tambah-siswa" element={<TambahSiswa />} />
            <Route path="/edit-siswa/:id" element={<EditSiswa />} />
            <Route path="/detail-siswa/:id" element={<DetailSiswa />} />

            {/* Routes untuk Guru */}
            <Route path="/guru" element={<PageGuru />} />
            <Route path="/tambah-guru" element={<TambahGuru />} />
            <Route path="/edit-guru/:id" element={<EditGuru />} />
            <Route path="/detail-guru/:id" element={<DetailGuru />} />

            {/* Routes untuk Kategori/Kelas */}
            <Route path="/kategori-kelas" element={<KategoriKelas />} />
            <Route path="/tambah-kategori-kelas" element={<TambahKategori />} />
            <Route path="/edit-kategori-kelas/:id" element={<EditKategori />} />

            {/* Routes untuk Organisasi */}
            <Route path="/organisasi" element={<PageOrganisasi />} />
            <Route path="/tambah-organisasi" element={<TambahOrganisasi />} />
            <Route path="/edit-organisasi/:id" element={<EditOrganisasi />} />
            <Route
              path="/detail-organisasi/:id"
              element={<DetailOrganisasi />}
            />

            {/* Routes untuk Staff */}
            <Route path="/staff" element={<DaftarStaff />} />
            <Route path="/tambah-staff" element={<TambahStaff />} />
            <Route path="/edit-staff/:id" element={<EditStaff />} />
            <Route path="/detail-staff/:id" element={<DetailStaff />} />

            {/* Routes untuk Pesanan */}
            <Route path="/pesanan" element={<PagePesanan />} />
            <Route path="/tambah-pesanan" element={<TambahPesanan />} />
            <Route path="/edit-pesanan/:id" element={<EditPesanan />} />

            {/* Routes untuk Sekolah */}
            <Route path="/kegiatan-sekolah" element={<KegiatanSekolah />} />
            <Route path="/tambah-kegiatan" element={<TambahKegiatan />} />
            <Route path="/edit-kegiatan/:id" element={<EditKegiatan />} />
            <Route path="/detail-sekolah/:id" element={<DetailSekolah />} />

            {/* Routes untuk Produk */}
            <Route path="/produk" element={<ProdukList />} />
            <Route path="/tambah-produk" element={<TambahProduk />} />
            <Route path="/edit-produk/:id" element={<EditProduk />} />

            {/* Routes untuk Buku */}
            <Route path="/buku" element={<DaftarBuku />} />
            <Route path="/tambah-buku" element={<TambahBuku />} />
            <Route path="/edit-buku/:id" element={<EditBuku />} />

            {/* Routes untuk User */}
            <Route path="/user" element={<User />} />
            <Route path="/tambah-user" element={<TambahUser />} />
            <Route path="/edit-user/:id" element={<EditUser />} />
            <Route path="/page-profil" element={<PageProfil />} />

            {/* Routes untuk Kategori */}
            <Route path="/page-kategori" element={<PageKategori />} />
            <Route path="/tambah-kategori-a" element={<TambahKategoriA />} />
            <Route path="/edit-kategori-a/:id" element={<EditKategoriA />} />

            {/* Routes untuk Donasi */}
            <Route path="/donasi" element={<PageDonasi />} />
            <Route path="/tambah-donasi" element={<TambahDonasi />} />
            <Route path="/edit-donasi/:id" element={<EditDonasi />} />

            {/* Routes untuk Berita */}
            <Route path="/berita" element={<Berita />} />
            <Route path="/tambah-berita" element={<TambahBerita />} />
            <Route path="/edit-berita/:id" element={<EditBerita />} />

            {/* Route Navbar */}
            <Route path="/navbar" element={<Navbar />} />

            {/* Halaman 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </NotificationProvider>
    </DarkModeProvider>
  );
}

export default App;
