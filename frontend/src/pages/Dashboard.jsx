import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import * as productService from '../services/productService';
import * as batchService from '../services/batchService';
import * as inventoryService from '../services/inventoryService';
import * as saleService from '../services/saleService';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    products: 0,
    batches: 0,
    inventory: 0,
    sales: 0,
  });

  useEffect(() => {
    fetchStats();
  }, [user]);

  const fetchStats = async () => {
    try {
      if (user.role === 'manufacturer') {
        const products = await productService.getProducts();
        const batches = await batchService.getBatches();
        setStats({
          products: products.length,
          batches: batches.length,
          inventory: 0,
          sales: 0,
        });
      } else if (user.role === 'distributor' || user.role === 'retailer') {
        const inventory = await inventoryService.getInventory();
        if (user.role === 'retailer') {
          const sales = await saleService.getSales();
          setStats({
            products: 0,
            batches: 0,
            inventory: inventory.length,
            sales: sales.length,
          });
        } else {
          setStats({
            products: 0,
            batches: 0,
            inventory: inventory.length,
            sales: 0,
          });
        }
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const getDashboardTitle = () => {
    switch (user.role) {
      case 'manufacturer':
        return 'Manufacturer Dashboard';
      case 'distributor':
        return 'Distributor Dashboard';
      case 'retailer':
        return 'Retailer Dashboard';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">{getDashboardTitle()}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {user.role === 'manufacturer' && (
          <>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Products</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.products}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Batches</h3>
              <p className="text-3xl font-bold text-green-600">{stats.batches}</p>
            </div>
          </>
        )}

        {(user.role === 'distributor' || user.role === 'retailer') && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Inventory Items</h3>
            <p className="text-3xl font-bold text-purple-600">{stats.inventory}</p>
          </div>
        )}

        {user.role === 'retailer' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Sales</h3>
            <p className="text-3xl font-bold text-red-600">{stats.sales}</p>
          </div>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Welcome to UniBeauty</h2>
        <p className="text-gray-600">
          Manage your beauty products supply chain efficiently with our platform.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
