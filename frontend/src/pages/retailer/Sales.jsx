import React, { useState, useEffect } from 'react';
import * as saleService from '../../services/saleService';

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    batch: '',
    quantity: '',
    price: '',
    customerName: '',
    customerContact: '',
  });

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const data = await saleService.getSales();
      setSales(data);
    } catch (error) {
      console.error('Error fetching sales:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saleService.createSale(formData);
      setFormData({
        batch: '',
        quantity: '',
        price: '',
        customerName: '',
        customerContact: '',
      });
      setShowForm(false);
      fetchSales();
    } catch (error) {
      console.error('Error creating sale:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sales</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {showForm ? 'Cancel' : 'Record Sale'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Batch ID
              </label>
              <input
                type="text"
                name="batch"
                value={formData.batch}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                step="0.01"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Customer Name
              </label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Customer Contact
              </label>
              <input
                type="text"
                name="customerContact"
                value={formData.customerContact}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Record Sale
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sales.map((sale) => (
          <div key={sale._id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Sale #{sale._id.slice(-6)}</h3>
            <p className="text-gray-600 mb-2">Batch: {sale.batch?.batchNumber}</p>
            <p className="text-sm text-gray-500 mb-2">Quantity: {sale.quantity}</p>
            <p className="text-sm text-gray-500 mb-2">Price: ${sale.price}</p>
            <p className="text-sm text-gray-500 mb-2">Customer: {sale.customerName}</p>
            <p className="text-sm text-gray-500">
              Date: {new Date(sale.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sales;
