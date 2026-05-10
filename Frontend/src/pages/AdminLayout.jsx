// AdminLayout.jsx - MERGED VERSION (Clean design + Material Icons)
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Navbar from '../LandingPage/components/Navbar';

const AdminLayout = () => {
  return (
    <div className="bg-[#0A0F0D] text-[#E8FFF8] min-h-screen font-['Inter'] selection:bg-[#b5fe00] selection:text-[#415e00]">
      {/* Full Original Navbar - stays at top */}
      <Navbar />

      {/* Flex container for sidebar + main content */}
      <div className="flex pt-16">
        {/* Sidebar - CONTROL_UNIT */}
        <aside className="w-64 flex-shrink-0 bg-[#0A0F0D] border-r border-[#B6FF00]/10 font-['Inter'] uppercase tracking-widest text-[10px] min-h-screen">
          <div className="px-6 py-6">
            <div className="text-lg font-bold text-[#B6FF00] tracking-[0.2em] mb-1">ADMIN PAGE</div>
            <p className="text-[10px] text-[#E8FFF8]/40">Control Panel</p>
          </div>
          
          <nav className="flex flex-col space-y-2 py-4 flex-grow">
            {/* Dashboard Tab */}
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) => 
                `group flex items-center px-6 py-4 cursor-pointer active:opacity-80 transition-all duration-200 ${
                  isActive 
                    ? 'text-[#B6FF00] border-r-4 border-[#B6FF00] bg-gradient-to-r from-[#B6FF00]/10 to-transparent' 
                    : 'text-[#E8FFF8]/40 hover:text-[#E8FFF8] hover:bg-[#E8FFF8]/5'
                }`
              }
            >
              <span className="material-symbols-outlined mr-4 text-xl">dashboard</span>
              <span>DASHBOARD</span>
            </NavLink>

            {/* Problem Creator Tab */}
            <NavLink
              to="/admin/create"
              className={({ isActive }) => 
                `group flex items-center px-6 py-4 cursor-pointer active:opacity-80 transition-all duration-200 ${
                  isActive 
                    ? 'text-[#B6FF00] border-r-4 border-[#B6FF00] bg-gradient-to-r from-[#B6FF00]/10 to-transparent' 
                    : 'text-[#E8FFF8]/40 hover:text-[#E8FFF8] hover:bg-[#E8FFF8]/5'
                }`
              }
            >
              <span className="material-symbols-outlined mr-4 text-xl">add_box</span>
              <span>PROBLEM CREATOR</span>
            </NavLink>

            {/* Problem Update Tab */}
            <NavLink
              to="/admin/update"
              className={({ isActive }) => 
                `group flex items-center px-6 py-4 cursor-pointer active:opacity-80 transition-all duration-200 ${
                  isActive 
                    ? 'text-[#B6FF00] border-r-4 border-[#B6FF00] bg-gradient-to-r from-[#B6FF00]/10 to-transparent' 
                    : 'text-[#E8FFF8]/40 hover:text-[#E8FFF8] hover:bg-[#E8FFF8]/5'
                }`
              }
            >
              <span className="material-symbols-outlined mr-4 text-xl">edit_note</span>
              <span>PROBLEM UPDATE</span>
            </NavLink>

            {/* Problem Delete Tab */}
            <NavLink
              to="/admin/delete"
              className={({ isActive }) => 
                `group flex items-center px-6 py-4 cursor-pointer active:opacity-80 transition-all duration-200 ${
                  isActive 
                    ? 'text-[#B6FF00] border-r-4 border-[#B6FF00] bg-gradient-to-r from-[#B6FF00]/10 to-transparent' 
                    : 'text-[#E8FFF8]/40 hover:text-[#E8FFF8] hover:bg-[#E8FFF8]/5'
                }`
              }
            >
              <span className="material-symbols-outlined mr-4 text-xl">delete_sweep</span>
              <span>PROBLEM DELETE</span>
            </NavLink>

            {/* Video Solution Tab */}
            <NavLink
              to="/admin/video"
              className={({ isActive }) => 
                `group flex items-center px-6 py-4 cursor-pointer active:opacity-80 transition-all duration-200 ${
                  isActive 
                    ? 'text-[#B6FF00] border-r-4 border-[#B6FF00] bg-gradient-to-r from-[#B6FF00]/10 to-transparent' 
                    : 'text-[#E8FFF8]/40 hover:text-[#E8FFF8] hover:bg-[#E8FFF8]/5'
                }`
              }
            >
              <span className="material-symbols-outlined mr-4 text-xl">smart_display</span>
              <span>VIDEO SOLUTION</span>
            </NavLink>
          </nav>
          
          <div className="p-6 mt-auto"></div>
        </aside>

        {/* Main Content - Outlet renders child routes */}
        <main className="flex-1 min-h-screen overflow-auto">
          <Outlet />
        </main>
      </div>

      
    </div>
  );
};

export default AdminLayout;