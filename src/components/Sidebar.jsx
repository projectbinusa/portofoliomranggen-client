import { useState } from "react";
import {
  HiHome,
  HiUser,
  HiClipboardList,
  HiOfficeBuilding,
  HiAcademicCap,
  HiUsers,
  HiLogout,
} from "react-icons/hi";

export default function App() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 w-64 h-screen bg-gradient-to-b from-green-500 to-green-700 text-white transition-transform duration-300`}
      >
        <div className="p-5 flex justify-center items-center border-b border-green-400">
          <h1 className="text-2xl font-extrabold tracking-wider text-white text-center">
            TICKET
          </h1>
        </div>
        <ul className="mt-4 space-y-2 px-3">
          <SidebarItem icon={<HiHome />} text="Dashboard" href="/home" />
          <SidebarItem icon={<HiUser />} text="Guru" href="/guru" />
          <SidebarItem
            icon={<HiClipboardList />}
            text="Kategori"
            href="/kategori-kelas"
          />
          <SidebarItem
            icon={<HiOfficeBuilding />}
            text="Organisasi"
            href="/organisasi"
          />
          <SidebarItem icon={<HiAcademicCap />} text="Siswa" href="/siswa" />
          <SidebarItem icon={<HiUsers />} text="Staf" href="/staff" />
          <SidebarItem icon={<HiLogout />} text="Logout" href="/logout" />
        </ul>
      </aside>

      {/* Content */}
    </div>
  );
}

function SidebarItem({ icon, text, href }) {
  return (
    <li>
      <a
        href={href}
        className="flex items-center space-x-3 p-3 rounded-md hover:bg-green-600 transition"
      >
        <span className="text-xl">{icon}</span>
        <span>{text}</span>
      </a>
    </li>
  );
}
