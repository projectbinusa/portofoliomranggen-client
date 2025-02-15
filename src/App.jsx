import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import DetailSiswa from "./siswa/DetailSiswa";


// **Import Komponen Guru**
import PageGuru from "./guru/PageGuru";
import TambahGuru from "./guru/TambahGuru";
import EditGuru from "./guru/EditGuru";
import DetailGuru from "./guru/DetailGuru";

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
import DetailStaff from "./staff/DetailStaff";

// **Import Komponen Pesanan**
import PagePesanan from "./pesanan/PagePesanan";
import TambahPesanan from "./pesanan/TambahPesanan";
import EditPesanan from "./pesanan/EditPesanan";

// **Import Komponen Sekolah**
import KegiatanSekolah from "./sekolah/KegiatanSekolah";
import TambahKegiatan from "./sekolah/TambahKegiatan";
import EditKegiatan from "./sekolah/EditKegiatan";
import DetailSekolah from "./sekolah/DetailSekolah";

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

// **Import Komponen Kategori**
import PageKategori from "./kategori/PageKategori";
import TambahKategoriA from "./kategori/TambahKategoriA";
import EditKategoriA from "./kategori/EditKategoriA";

import PageDonasi from "./donasi/PageDonasi";
import TambahDonasi from "./donasi/TambahDonasi";
import EditDonasi from "./donasi/EditDonasi";


import "./App.css";
import Berita from "./berita/Berita";
import TambahBerita from "./berita/TambahBerita";
import EditBerita from "./berita/EditBerita";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sambutan" element={<Sambutan />} />
        <Route path="/visimisi" element={<VisiMisi />} />
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
        
        <Route path="/page-profil" element={<PageProfil />} /> 

        {/* Routes untuk Kategori */}
        <Route path="/page-kategori" element={<PageKategori />} />
        <Route path="/tambah-kategori-a" element={<TambahKategoriA />} />
        <Route path="/edit-kategori-a/:id" element={<EditKategoriA />} />


        <Route path="/donasi" element={<PageDonasi />} />
        <Route path="/tambah-donasi" element={<TambahDonasi />} />
        <Route path="/edit-donasi/:id" element={<EditDonasi />} />

        <Route path="*" element={<NotFoundPage />} />

        {/* Routes untuk Berita */}
        <Route path="/berita" element={<Berita />} />
        <Route path="/tambah-berita" element={<TambahBerita />} />
        <Route path="/edit-berita/:id/:idAdmin" element={<EditBerita />} />
        
      </Routes>
    </Router>
  );
}

export default App;
