// import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import React, { useState } from 'react';

const menuItems = [
  { title: 'Dashboard', path: '/' },
  {
    title: 'Planning',
    submenu: [
      { title: 'Add Production Order Creation', path: '/planning/add-order' },
      { title: 'List Of Production Order Creation', path: '/planning/list-order' },
      { title: 'Work Centre Selection', path: '/planning/work-centre' },
      { title: 'Order Status', path: '/planning/order-status' },
      {
        title: 'Scheduling',
        submenu: [
          { title: 'WC Wise', path: '/planning/scheduling/wc-wise' },
          { title: 'ShiftWise', path: '/planning/scheduling/shift-wise' },
          { title: 'Monthly', path: '/planning/scheduling/monthly' },
        ],
      },
    ],
  },
  {
    title: 'Production',
    submenu: [
      { title: 'Production Recording', path: '/production/recording' },
      { title: 'Downtime Recording', path: '/production/downtime' },
    ],
  },
  {
    title: 'Quality',
    submenu: [
      { title: 'Inspection', path: '/quality/inspection' },
      { title: 'Final Clearance', path: '/quality/clearance' },
    ],
  },
  {
    title: 'Inventory',
    submenu: [
      { title: 'Inventory Status', path: '/inventory/status' },
      { title: 'Stock Adjustment', path: '/inventory/adjustment' },
    ],
  },
  {
    title: 'Dispatch',
    submenu: [
      { title: 'Material Movement', path: '/dispatch/material' },
      { title: 'Loading Slip', path: '/dispatch/loading' },
    ],
  },
  {
    title: 'Reports',
    submenu: [
      { title: 'Production', path: '/reports/production' },
      { title: 'Downtime', path: '/reports/downtime' },
    ],
  },
  {
    title: 'Security',
    submenu: [
      { title: 'Role Definition', path: '/security/role' },
      { title: 'User Master', path: '/security/user' },
    ],
  },
  {
    title: 'Configurator',
    submenu: [
      {
        title: 'Master',
        submenu: [
          { title: 'Shift Wise', path: '/config/master/shift-wise' },
          { title: 'Product Master', path: '/config/master/product' },
          { title: 'Customer Master', path: '/config/master/customer' },
          { title: 'Workstation Master', path: '/config/master/workcenter' },
          { title: 'Process Flow', path: '/config/master/process' },
          { title: 'Attributes', path: '/config/master/attributes' },
          { title: 'Unit', path: '/config/master/unit' },
          
        ],
      },
    ],
  },
];

const MenuItem = ({ item, level = 0, openMenus, toggleMenu }) => {
  const location = useLocation();
  const isActive = location.pathname === item.path;
  const hasSubmenu = item.submenu?.length > 0;

  return (
    <li className="relative">
      <div className={`group ${level > 0 ? 'ml-4' : ''}`}>
        <div
          className={`flex items-center justify-between rounded-lg transition-colors duration-200 ${
            isActive
              ? 'bg-violet-600 text-white'
              : 'hover:bg-violet-700 hover:text-white text-violet-100'
          }`}
        >
          {hasSubmenu ? (
            <button
              onClick={() => toggleMenu(item.title)}
              className={`w-full text-left px-4 py-2 flex items-center justify-between`}
            >
              <span>{item.title}</span>
              <svg
                className={`w-4 h-4 transform transition-transform duration-200 ${
                  openMenus[item.title] ? 'rotate-90' : 'rotate-0'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <Link
              to={item.path}
              className={`block w-full px-4 py-2 ${
                isActive ? 'bg-violet-600 text-white' : 'hover:bg-violet-700 hover:text-white'
              }`}
            >
              {item.title}
            </Link>
          )}
        </div>

        {hasSubmenu && (
          <ul
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openMenus[item.title]
                ? 'max-h-[1000px] opacity-100 mt-2'
                : 'max-h-0 opacity-0'
            }`}
          >
            {item.submenu.map((subItem, index) => (
              <MenuItem
                key={index}
                item={subItem}
                level={level + 1}
                openMenus={openMenus}
                toggleMenu={toggleMenu}
              />
            ))}
          </ul>
        )}
      </div>
    </li>
  );
};

export default function Layout() {
  const [openMenus, setOpenMenus] = useState({});
  const toggleMenu = (menuTitle) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuTitle]: !prev[menuTitle],
    }));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="bg-violet-800 text-white w-64 flex-shrink-0 shadow-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-6">MES Dashboard</h1>
          <nav>
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <MenuItem
                  key={index}
                  item={item}
                  openMenus={openMenus}
                  toggleMenu={toggleMenu}
                />
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
}