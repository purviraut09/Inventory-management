import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/manufacturer/Products';
import Batches from './pages/manufacturer/Batches';
import TransferToDistributor from './pages/manufacturer/TransferToDistributor';
import Inventory from './pages/distributor/Inventory';
import TransferToRetailer from './pages/distributor/TransferToRetailer';
import Sales from './pages/retailer/Sales';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products"
              element={
                <ProtectedRoute allowedRoles={['manufacturer']}>
                  <Products />
                </ProtectedRoute>
              }
            />
            <Route
              path="/batches"
              element={
                <ProtectedRoute allowedRoles={['manufacturer']}>
                  <Batches />
                </ProtectedRoute>
              }
            />
            <Route
              path="/transfer-to-distributor"
              element={
                <ProtectedRoute allowedRoles={['manufacturer']}>
                  <TransferToDistributor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/inventory"
              element={
                <ProtectedRoute allowedRoles={['distributor', 'retailer']}>
                  <Inventory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/transfer-to-retailer"
              element={
                <ProtectedRoute allowedRoles={['distributor']}>
                  <TransferToRetailer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sales"
              element={
                <ProtectedRoute allowedRoles={['retailer']}>
                  <Sales />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
