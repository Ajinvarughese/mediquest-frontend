import React from 'react';
import { FaTachometerAlt, FaUserInjured, FaCalendarCheck, FaMoneyCheck, FaCog, FaDoorOpen } from 'react-icons/fa';

function Sidebar() {
  return (
    <div className="w-56 bg-[#0e4d3a] text-white h-screen flex flex-col fixed rounded-tr-2xl rounded-br-2xl">
      <div className="text-2xl font-bold mt-6 mb-8 ml-4">Medi-Quest</div>
      <ul className="ml-4 space-y-2">
        <li className="bg-[#166d57] font-semibold px-4 py-3 rounded cursor-pointer flex items-center gap-2">
          <FaTachometerAlt /> Dashboard
        </li>
        <br />
        <li className="hover:bg-[#166d57] font-semibold px-4 py-3 rounded cursor-pointer flex items-center gap-2">
          <FaDoorOpen /> Logout
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
