# UniBeauty-MERN

A full-stack MERN application for managing beauty products supply chain with role-based access control.

## Features

- **Role-based Access Control**: Supports Manufacturer, Distributor, and Retailer roles
- **Product Management**: Manufacturers can create and manage products
- **Batch Tracking**: Track product batches with manufacturing and expiry dates
- **Inventory Management**: Distributors and retailers can manage their inventory
- **Transfer System**: Secure transfer of products between supply chain actors
- **Sales Tracking**: Retailers can record and track sales

## Tech Stack

- **Frontend**: React.js with React Router
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Tailwind CSS

## Project Structure

```
UniBeauty-MERN/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── models/                   # MongoDB schemas
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Batch.js
│   │   ├── Inventory.js
│   │   ├── Transfer.js
│   │   └── Sale.js
│   ├── controllers/              # Business logic
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── batchController.js
│   │   ├── inventoryController.js
│   │   ├── transferController.js
│   │   └── saleController.js
│   ├── routes/                   # API routes
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── batchRoutes.js
│   │   ├── inventoryRoutes.js
│   │   ├── transferRoutes.js
│   │   └── saleRoutes.js
│   ├── middleware/               # Security & rules
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   └── errorMiddleware.js
│   ├── server.js                 # App entry point
│   ├── .env
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/           # Reusable UI
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/                # Screens
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── manufacturer/
│   │   │   │   ├── Products.jsx
│   │   │   │   ├── Batches.jsx
│   │   │   │   └── TransferToDistributor.jsx
│   │   │   ├── distributor/
│   │   │   │   ├── Inventory.jsx
│   │   │   │   └── TransferToRetailer.jsx
│   │   │   ├── retailer/
│   │   │   │   ├── Inventory.jsx
│   │   │   │   └── Sales.jsx
│   │   ├── services/             # API calls
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── productService.js
│   │   │   ├── inventoryService.js
│   │   │   └── salesService.js
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── App.jsx
│   │   └── index.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone <repository-url>
   cd UniBeauty-MERN
   ```

2. Install backend dependencies
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies
   ```
   cd ../frontend
   npm install
   ```

4. Set up environment variables
   - Create `.env` file in backend directory
   - Add the following variables:
     ```
     NODE_ENV=development
     PORT=5000
     MONGO_URI=mongodb://localhost:27017/unibeauty
     JWT_SECRET=your_jwt_secret_here
     ```

5. Start MongoDB service

6. Start the backend server
   ```
   cd backend
   npm start
   ```

7. Start the frontend development server
   ```
   cd frontend
   npm start
   ```

## Usage

1. Register as a manufacturer, distributor, or retailer
2. Login with your credentials
3. Access role-specific features based on your account type

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products (Manufacturer only)
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Batches (Manufacturer only)
- `GET /api/batches` - Get all batches
- `POST /api/batches` - Create new batch
- `PUT /api/batches/:id` - Update batch
- `DELETE /api/batches/:id` - Delete batch

### Inventory (Distributor & Retailer)
- `GET /api/inventory` - Get inventory
- `GET /api/inventory/details` - Get inventory details

### Transfers
- `GET /api/transfers` - Get transfers
- `POST /api/transfers` - Create transfer
- `PUT /api/transfers/:id` - Update transfer
- `DELETE /api/transfers/:id` - Delete transfer

### Sales (Retailer only)
- `GET /api/sales` - Get sales
- `POST /api/sales` - Record sale
- `GET /api/sales/report` - Get sales report

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
