Excel Analytics Platform
Overview

Excel Analytics Platform is a full-stack web application that allows users to upload Excel files, analyze data visually using charts, and manage uploaded files securely. The platform provides a simple interface to convert raw Excel data into meaningful insights through dynamic visualizations.

The system also includes an admin panel where administrators can monitor users and manage uploaded files. Role-based authentication ensures secure access to different parts of the application.

This project demonstrates full-stack development using the MERN ecosystem with secure authentication, file handling, data visualization, and role-based authorization.

Key Features
User Features

• Secure user registration and login using JWT authentication
• Upload Excel files (.xlsx or .xls)
• Automatic parsing of Excel data
• Generate dynamic charts from Excel data
• Support for multiple chart types:

Bar Chart

Line Chart

Pie Chart

• Dynamic column selection for X-axis and Y-axis
• View upload history
• Re-analyze previously uploaded files
• Delete uploaded files
• Export generated charts as PDF
• Dashboard showing statistics such as number of uploads, rows, and columns


Admin Features

• View all registered users
• Monitor file uploads per user
• Delete users from the system
• Access system-level analytics and management controls

Technology Stack
Frontend

React (Vite)
Tailwind CSS
React Router
Axios
Recharts (Data Visualization)
html2canvas
jsPDF

Backend

Node.js
Express.js
MongoDB Atlas
Mongoose
JWT (Authentication)
bcryptjs (Password hashing)
multer (File uploads)
xlsx (Excel file parsing)


System Architecture

The application follows a client-server architecture.

Frontend:

Built with React using Vite

Handles UI rendering and user interaction

Communicates with backend APIs via Axios

Backend:

Built with Node.js and Express

Handles authentication, file processing, and database operations

Database:

MongoDB Atlas stores users and file metadata

Authentication & Security

The system uses JWT-based authentication.

Workflow:

User registers with email and password

Password is hashed using bcrypt

On login, a JWT token is generated

Token is stored on the client side

Protected routes verify the token

Role-based authorization restricts admin functionality

Data Processing Workflow

User uploads an Excel file

Backend stores the file using Multer

Excel data is parsed using the xlsx library

Parsed data is returned to the frontend

Frontend generates charts using Recharts

Users can interactively select data columns for visualization


Installation & Setup
Clone the Repository
git clone https://github.com/yourusername/excel-analytics-platform.git
cd excel-analytics-platform

Backend Setup
cd backend
npm install

Create a .env file:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run backend server:

npm run dev
Frontend Setup
cd frontend
npm install
npm run dev

Frontend will run at:

http://localhost:5173

Backend runs at:

http://localhost:5000

API Endpoints

Authentication

POST /api/register
POST /api/login
GET /api/me

File Management

POST /api/files/upload
GET /api/files/history
GET /api/files/stats
GET /api/files/reanalyze/:id
DELETE /api/files/delete/:id

Admin

GET /api/users/all-users
DELETE /api/users/delete-user/:id

Future Improvements

• Advanced analytics features
• Dashboard filters and search
• Pagination for large datasets
• Cloud storage for file uploads
• Real-time analytics updates

Author

Vedant Sanjay Gawande
CSE(2025)
Full Stack Developer

