import React, { useState, useEffect } from 'react';
import * as inventoryService from '../../services/inventoryService';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const data = await inventoryService.getInventory();
      setInventory(data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Inventory</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inventory.map((batch) => (
          <div key={batch._id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Batch {batch.batchNumber}</h3>
            <p className="text-gray-600 mb-2">Product: {batch.product?.name}</p>
            <p className="text-sm text-gray-500 mb-2">Quantity: {batch.quantity}</p>
            <p className="text-sm text-gray-500 mb-2">
              Manufactured: {new Date(batch.manufacturingDate).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">
              Expires: {new Date(batch.expiryDate).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {inventory.length === 0 && (
        <p className="text-gray-500 text-center mt-8">No inventory items found.</p>
      )}
    </div>
  );
};

export default Inventory;
