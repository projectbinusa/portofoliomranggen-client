import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./page/Home";
import About from "./page/About";
import Contact from "./page/Contact";
import KategoriKelas from "./kategori/KategoriKelas";
import PageSiswa from "./Siswa/PageSiswa"; // Update path sesuai folder Siswa
import PageGuru from "./NewPage/PageGuru";

import "./App.css";

function App() {
  return (
    <Router>
      <nav className="nav-bar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/kategori-kelas">Kelas</Link>
            <Link to="/siswa">Daftar Siswa</Link> {/* Link ke PageSiswa */}
          </li>
          <li>
          <Link to="/pageguru">PageGuru</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/kategori-kelas" element={<KategoriKelas />} />
        <Route path="/siswa" element={<PageSiswa />} /> {/* Daftar siswa */}
        <Route path="/pageguru" element={<PageGuru />} />

      </Routes>
    </Router>
  );
}

export default App;
