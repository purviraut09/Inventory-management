import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const menuItems = {
    manufacturer: [
      { path: '/', label: 'Dashboard' },
      { path: '/products', label: 'Products' },
      { path: '/batches', label: 'Batches' },
      { path: '/transfer-to-distributor', label: 'Transfer to Distributor' },
    ],
    distributor: [
      { path: '/', label: 'Dashboard' },
      { path: '/inventory', label: 'Inventory' },
      { path: '/transfer-to-retailer', label: 'Transfer to Retailer' },
    ],
    retailer: [
      { path: '/', label: 'Dashboard' },
      { path: '/inventory', label: 'Inventory' },
      { path: '/sales', label: 'Sales' },
    ],
  };

  const currentMenu = (user && menuItems[user.role]) || [];

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">UniBeauty</h2>
        <nav>
          <ul>
            {currentMenu.map((item) => (
              <li key={item.path} className="mb-2">
                <Link
                  to={item.path}
                  className={`block px-4 py-2 rounded ${
                    location.pathname === item.path
                      ? 'bg-blue-600'
                      : 'hover:bg-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
