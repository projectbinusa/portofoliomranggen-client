import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  HiHome,
  HiUser,
  HiClipboardList,
  HiShoppingCart,
  HiLogout,
  HiMenu,
  HiX,
  HiChevronDown,
  HiMoon,
  HiSun,
} from "react-icons/hi";
import Notifikasi from "../notif/Notifikasi"; // Import Notifikasi

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [dropdowns, setDropdowns] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const navigate = useNavigate();

  // Apply dark mode class to the root element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDropdown = (menu) => {
    setDropdowns((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda akan keluar dari akun!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, keluar!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        window.dispatchEvent(new Event("authChange"));
        navigate("/login", { replace: true });
      }
    });
  };

  return (
    <div className="flex h-screen relative">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen transition-all duration-300 transform bg-gradient-to-b from-green-500 to-green-700 text-white shadow-lg overflow-y-auto overflow-x-hidden dark:from-gray-800 dark:to-gray-900 ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="relative flex items-center justify-between p-6 border-b border-green-400 dark:border-gray-700">
          <h1
            className={`text-xl font-bold tracking-wide transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            Sidebar Menu
          </h1>

          {/* Tambahkan Notifikasi */}
          <Notifikasi />

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-green-700 p-2 rounded-full shadow-md hover:bg-green-600 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            {isOpen ? (
              <HiX className="w-5 h-5" />
            ) : (
              <HiMenu className="w-5 h-5" />
            )}
          </button>
        </div>

        <ul className="mt-4 space-y-2 px-4">
          <SidebarItem
            isOpen={isOpen}
            icon={<HiHome />}
            text="Dashboard"
            to="/dashboard"
          />
          <SidebarItem
            isOpen={isOpen}
            icon={<HiUser />}
            text="Profil"
            to="/page-profil"
          />
          <DropdownItem
            isOpen={isOpen}
            icon={<HiClipboardList />}
            text="Data Akademik"
            menuKey="dataAkademik"
            dropdowns={dropdowns}
            toggleDropdown={toggleDropdown}
            items={[
              { text: "Guru", to: "/guru" },
              { text: "Siswa", to: "/siswa" },
              { text: "Staf", to: "/staff" },
              { text: "Organisasi", to: "/organisasi" },
              { text: "Kategori Kelas", to: "/kategori-kelas" },
              { text: "Kegiatan Sekolah", to: "/kegiatan-sekolah" },
            ]}
          />
          <DropdownItem
            isOpen={isOpen}
            icon={<HiClipboardList />}
            text="Data Pendukung"
            menuKey="dataPendukung"
            dropdowns={dropdowns}
            toggleDropdown={toggleDropdown}
            items={[
              { text: "Produk", to: "/produk" },
              { text: "Buku", to: "/buku" },
              { text: "User", to: "/user" },
              { text: "Kategori", to: "/page-kategori" },
              { text: "Donasi", to: "/donasi" },
              { text: "Pesanan", to: "/pesanan" },
              { text: "Berita", to: "/berita" },
            ]}
          />
          <SidebarItem
            isOpen={isOpen}
            icon={<HiShoppingCart />}
            text="Pesanan"
            to="/pesanan"
          />
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-4 p-3 w-full text-left rounded-md hover:bg-green-600 transition dark:hover:bg-gray-600"
            >
              <span className="text-xl">
                <HiLogout />
              </span>
              {isOpen && <span>Logout</span>}
            </button>
          </li>
        </ul>

        {/* Dark Mode Toggle */}
        <div className="p-4 border-t border-green-400 dark:border-gray-700">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex items-center space-x-4 p-3 w-full text-left rounded-md hover:bg-green-600 transition dark:hover:bg-gray-600"
          >
            <span className="text-xl">
              {isDarkMode ? <HiSun /> : <HiMoon />}
            </span>
            {isOpen && <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>}
          </button>
        </div>
      </aside>

      {/* Tombol untuk membuka sidebar */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-5 left-5 bg-green-600 p-3 rounded-full shadow-lg text-white hover:bg-green-500 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          <HiMenu className="w-6 h-6" />
        </button>
      )}

      <div className="flex-1 p-10 overflow-y-auto overflow-x-hidden max-h-screen"></div>
    </div>
  );
}

// Komponen SidebarItem
function SidebarItem({ icon, text, to, isOpen }) {
  return (
    <li>
      <Link
        to={to}
        className="flex items-center space-x-4 p-3 rounded-md hover:bg-green-600 transition dark:hover:bg-gray-600"
      >
        <span className="text-xl">{icon}</span>
        {isOpen && <span>{text}</span>}
      </Link>
    </li>
  );
}

// Komponen DropdownItem
function DropdownItem({
  icon,
  text,
  items,
  isOpen,
  dropdowns,
  toggleDropdown,
  menuKey,
}) {
  return (
    <li>
      <button
        onClick={() => toggleDropdown(menuKey)}
        className="flex items-center justify-between w-full p-3 rounded-md hover:bg-green-600 transition dark:hover:bg-gray-600"
      >
        <div className="flex items-center space-x-4">
          <span className="text-xl">{icon}</span>
          {isOpen && <span>{text}</span>}
        </div>
        {isOpen && (
          <HiChevronDown
            className={`transform ${
              dropdowns[menuKey] ? "rotate-180" : "rotate-0"
            }`}
          />
        )}
      </button>
      {dropdowns[menuKey] && (
        <ul className="ml-6 mt-2 space-y-2">
          {items.map((item, index) => (
            <SidebarItem
              key={index}
              icon={null}
              text={item.text}
              to={item.to}
              isOpen={isOpen}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
