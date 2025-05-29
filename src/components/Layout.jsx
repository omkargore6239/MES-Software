import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import PropTypes from 'prop-types';
const menuItems = [
  { title: 'Dashboard', path: '/' },
  {
    title: 'Planning',
    submenu: [
      { title: 'Add Production Order Creation' },
      { title: 'List Of Production Order Creation' },
      { title: 'Work Centre Selection' },
      { title: 'Order Status', path: '/planning/OrderStatus' },
      {
        title: 'Scheduling',
        submenu: [
          { title: 'WC Wise' },
          { title: 'ShiftWise' },
          { title: 'Monthly' },
        ],
      },
    ],
  },
  {
    title: 'Production',
    submenu: [
      { title: 'Production Recording', path: '/production/recording' },
      { title: 'Downtime Recording' },
    ],
  },
  {
    title: 'Quality',
    submenu: [
      { title: 'Inspection' , path:'inspection'},
      { title: 'Final Clearance' },
    ],
  },
  {
    title: 'Inventories',
    submenu: [
      { title: 'Inventory Status' },
      { title: 'Stock Adjustment' },
    ],
  },
  {
    title: 'Dispatch',
    submenu: [
      { title: 'Material Movement' },
      { title: 'Loading Slip' },
    ],
  },
  {
    title: 'Reports',
    submenu: [
      { title: 'Production' },
      { title: 'Downtime' },
    ],
  },
  {
    title: 'Security',
    submenu: [
      { title: 'Role Definition', path: '/security/role' },
      { title: 'User Master', path: '/security/user' },
      { title: 'User Table', path: '/security/userTable' },
    ],
  },
  {
    title: 'Configurator',
    submenu: [
      {
        title: 'Master',
        submenu: [
          {
            title: 'Inventory',
            submenu: [
              { title: 'Rm Inventory', path: '/config/master/inventory/RmInventory' },
              { title: 'Finish Goods',  },
            ],
          },
          { title: 'Shift Wise', path: '/config/master/shift-wise' },
          { title: 'Product Master', path: '/config/master/productmaster' },
          { title: 'Customer Master' },
          { title: 'BOM Master', path: '/config/master/bom' },
          { title: 'WorkCenter Master', path: '/config/master/workcenter' },
          { title: 'MasterCode', path: '/config/master/mastercode' },
          { title: 'Process Flow' },
          { title: 'Attributes' },
          { title: 'Unit' },
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
      <div className={`${level > 0 ? 'ml-4' : ''}`}>
        <div
          className={`flex items-center justify px-4 py-2 rounded-md transition-all duration-200 ${
            isActive ? 'bg-indigo-600 text-white' : 'hover:bg-indigo-100 hover:text-indigo-800 text-slate-200'
          }`}
        >
          {hasSubmenu ? (
            <button
              onClick={() => toggleMenu(item.title)}
              className="w-full text-left flex items-center justify-between"
            >
              <span className="whitespace-nowrap overflow-hidden text-ellipsis">{item.title}</span>
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
              className={`block w-full px-2 py-1 ${
                isActive ? 'bg-indigo-600 text-white' : 'hover:bg-indigo-100 hover:text-indigo-800'
              }`}
            >
              {item.title}
            </Link>
          )}
        </div>
        {hasSubmenu && (
          <ul
            className={`overflow-hidden transition-all duration-300 ease-in-out bg-slate-800 rounded-md ${
              openMenus[item.title] ? 'max-h-[1000px] opacity-100 mt-2' : 'max-h-0 opacity-0 invisible'
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

export default function Layout({ handleLogout }) {
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menuTitle) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuTitle]: !prev[menuTitle],
    }));
    MenuItem.propTypes = {
      item: PropTypes.shape({
        title: PropTypes.string.isRequired,
        path: PropTypes.string,
        submenu: PropTypes.arrayOf(PropTypes.object),
      }).isRequired,
      level: PropTypes.number,
      openMenus: PropTypes.object.isRequired,
      toggleMenu: PropTypes.func.isRequired,
    };
    
    Layout.propTypes = {
      handleLogout: PropTypes.func.isRequired,
    };
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavBar handleLogout={handleLogout} />
      <div className="flex mt-16 h-screen">
        {/* Sidebar with internal scrolling */}
        <div className="bg-[#1e293b] text-[#E5E7EB] w-64 flex-shrink-0 shadow-lg p-4 h-[95%] overflow-y-auto font-poppins">
          <nav>
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <MenuItem key={index} item={item} openMenus={openMenus} toggleMenu={toggleMenu} />
              ))}
            </ul>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8 overflow-y-auto h-[calc(100vh-4rem)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
  
}