import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DarkModeProvider } from "./contextt/DarkModeContext";
import { NotificationProvider } from "./context/NotificationContext";
import "./components/loadingscreen/loadingScreen.css"; // Tambahkan CSS loading

// Loading screen component
const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="loading-screen">
      <div className="dots-loader">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      <div className="loading-text">Loading</div>
    </div>
  );
};

// Import komponen publik
import Home from "./components/Home";
import Login from "./page/Login";
import ForgotPassword from "./page/forgot-password";
import CheckMail from "./page/CheckMail";
import Register from "./page/Register";
import Sambutan from "./sambutan/Sambutan";
import AddSambutan from "./sambutan/AddSambutan";
import VisiMisi from "./visimisi/VisiMisi";
import AddVisiMisi from "./visimisi/AddVisiMisi";
import NotFoundPage from "./page/NotFoundPage";
import UnderConstruction from "./page/under-construction";

// Dashboard
import Dashboard from "./tampilan/Dashboard";

// Siswa
import PageSiswa from "./siswa/PageSiswa";
import TambahSiswa from "./siswa/TambahSiswa";
import EditSiswa from "./siswa/EditSiswa";
import DetailSiswa from "./siswa/DetailSiswa";

// Guru
import PageGuru from "./guru/PageGuru";
import TambahGuru from "./guru/TambahGuru";
import EditGuru from "./guru/EditGuru";
import DetailGuru from "./guru/DetailGuru";

// Kelas
import KategoriKelas from "./kelas/KategoriKelas";
import TambahKategori from "./kelas/TambahKategori";
import EditKategori from "./kelas/EditKategori";

// Organisasi
import PageOrganisasi from "./organisasi/PageOrganisasi";
import TambahOrganisasi from "./organisasi/TambahOrganisasi";
import EditOrganisasi from "./organisasi/EditOrganisasi";
import DetailOrganisasi from "./organisasi/DetailOrganisasi";

// Staff
import DaftarStaff from "./staff/DaftarStaff";
import TambahStaff from "./staff/TambahStaff";
import EditStaff from "./staff/EditStaff";
import DetailStaff from "./staff/DetailStaff";

// Pesanan
import PagePesanan from "./pesanan/PagePesanan";
import TambahPesanan from "./pesanan/TambahPesanan";
import EditPesanan from "./pesanan/EditPesanan";

// Sekolah
import KegiatanSekolah from "./sekolah/KegiatanSekolah";
import TambahKegiatan from "./sekolah/TambahKegiatan";
import EditKegiatan from "./sekolah/EditKegiatan";
import DetailSekolah from "./sekolah/DetailSekolah";

// Produk
import Produk from "./produk/Produk";
import ProdukList from "./produk/ProdukList";
import TambahProduk from "./produk/TambahProduk";
import EditProduk from "./produk/EditProduk";
import ProdukDetails from "./produk/product-details/ProdukDetails";
import Checkout from "./produk/Checkout";

// Buku
import DaftarBuku from "./buku/DaftarBuku";
import TambahBuku from "./buku/TambahBuku";
import EditBuku from "./buku/EditBuku";
import DetailBuku from "./buku/DetailBuku";

// User
import User from "./user/User";
import EditUser from "./user/EditUser";
import TambahUser from "./user/TambahUser";

// Kategori
import PageKategori from "./kategori/PageKategori";
import TambahKategoriA from "./kategori/TambahKategoriA";
import EditKategoriA from "./kategori/EditKategoriA";

// Donasi
import PageDonasi from "./donasi/PageDonasi";
import TambahDonasi from "./donasi/TambahDonasi";
import EditDonasi from "./donasi/EditDonasi";

// Berita
import Berita from "./berita/Berita";
import TambahBerita from "./berita/TambahBerita";
import EditBerita from "./berita/EditBerita";
import DetailBerita from "./berita/DetailBerita";

// Lain-lain
import Navbar from "./tampilan/Navbar";
import Kontak from "./components/Kontak";

// Profil
import ChangePasswordPage from "./profil/profile/ChangePasswordPage";
import SettingsPage from "./profil/profile/SettingsPage";
import Profil from "./profil/profile/Profil";
import Payment from "./profil/profile/Payment";

import "./App.css";

function App() {
  return (
    <DarkModeProvider>
      <NotificationProvider>
        <LoadingScreen />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/check-mail" element={<CheckMail />} />
            <Route path="/register" element={<Register />} />
            <Route path="/sambutan" element={<Sambutan />} />
            <Route path="/addsambutan" element={<AddSambutan />} />
            <Route path="/visi-misi" element={<VisiMisi />} />
            <Route path="/addvisi-misi" element={<AddVisiMisi />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/kontak" element={<Kontak />} />

            {/* Siswa */}
            <Route path="/siswa" element={<PageSiswa />} />
            <Route path="/tambah-siswa" element={<TambahSiswa />} />
            <Route path="/edit-siswa/:id" element={<EditSiswa />} />
            <Route path="/detail-siswa/:id" element={<DetailSiswa />} />

            {/* Guru */}
            <Route path="/guru" element={<PageGuru />} />
            <Route path="/tambah-guru" element={<TambahGuru />} />
            <Route path="/edit-guru/:id" element={<EditGuru />} />
            <Route path="/detail-guru/:id" element={<DetailGuru />} />

            {/* Kategori/Kelas */}
            <Route path="/kategori-kelas" element={<KategoriKelas />} />
            <Route path="/tambah-kategori-kelas" element={<TambahKategori />} />
            <Route path="/edit-kategori-kelas/:id" element={<EditKategori />} />

            {/* Organisasi */}
            <Route path="/organisasi" element={<PageOrganisasi />} />
            <Route path="/tambah-organisasi" element={<TambahOrganisasi />} />
            <Route path="/edit-organisasi/:id" element={<EditOrganisasi />} />
            <Route path="/detail-organisasi/:id" element={<DetailOrganisasi />} />

            {/* Staff */}
            <Route path="/staff" element={<DaftarStaff />} />
            <Route path="/tambah-staff" element={<TambahStaff />} />
            <Route path="/edit-staff/:id" element={<EditStaff />} />
            <Route path="/detail-staff/:id" element={<DetailStaff />} />

            {/* Produk */}
            <Route path="/produk" element={<Produk />} />
            <Route path="/produk-list" element={<ProdukList />} />
            <Route path="/tambah-produk" element={<TambahProduk />} />
            <Route path="/edit-produk/:id" element={<EditProduk />} />
            <Route path="/detail-produk/:id" element={<ProdukDetails />} />
            <Route path="/checkout" element={<Checkout />} />

            {/* Profil */}
            <Route path="/payment" element={<Payment />} />
            <Route path="/password" element={<ChangePasswordPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/page-profil" element={<Profil />} />

            {/* Buku */}
            <Route path="/buku" element={<DaftarBuku />} />
            <Route path="/tambah-buku" element={<TambahBuku />} />
            <Route path="/edit-buku/:id" element={<EditBuku />} />
            <Route path="/detail-buku/:id" element={<DetailBuku />} />

            {/* User */}
            <Route path="/user" element={<User />} />
            <Route path="/edit-user/:id" element={<EditUser />} />
            <Route path="/tambah-user" element={<TambahUser />} />

            {/* Kategori */}
            <Route path="/kategori" element={<PageKategori />} />
            <Route path="/tambah-kategori" element={<TambahKategoriA />} />
            <Route path="/edit-kategori/:id" element={<EditKategoriA />} />

            {/* Donasi */}
            <Route path="/donasi" element={<PageDonasi />} />
            <Route path="/tambah-donasi" element={<TambahDonasi />} />
            <Route path="/edit-donasi/:id" element={<EditDonasi />} />

            {/* Berita */}
            <Route path="/berita" element={<Berita />} />
            <Route path="/tambah-berita" element={<TambahBerita />} />
            <Route path="/edit-berita/:id" element={<EditBerita />} />
            <Route path="/detail-berita/:id" element={<DetailBerita />} />

            {/* Halaman tambahan */}
            <Route path="/navbar" element={<Navbar />} />
            <Route path="/under-construction" element={<UnderConstruction />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </NotificationProvider>
    </DarkModeProvider>
  );
}

export default App;
