# HiringStore - Job Portal Platform
HiringStore is a comprehensive job portal platform that connects job seekers with employers. The application provides a seamless experience for users to browse jobs, apply for positions, and manage applications, while employers can post job listings and manage candidates.

## Features

### Job Seekers
- User authentication (signup/login)
- Browse and search job listings
- Apply for jobs
- User profile management
- Track application status
- Save favorite job postings

### Employers
- Post new job listings
- Manage job postings
- View and manage applications
- Candidate management

### General
- Responsive design for all devices
- Secure authentication with JWT
- Modern and intuitive user interface
- Real-time notifications
- Blog section for career advice and tips

## Tech Stack

### Frontend
- **React** (v19.0.0)
- **React Router** (v7.6.0) for navigation
- **Redux Toolkit** for state management
- **Material-UI** (v7.2.0) for UI components
- **Styled Components** for styling
- **Axios** for API requests
- **React Icons** and **Font Awesome** for icons
- **Vite** as build tool

### Backend
- **Node.js** with **Express.js** (v5.1.0)
- **MongoDB** with **Mongoose** (v8.16.2) for database
- **JWT** for authentication
- **Passport.js** for authentication middleware
- **CORS** for cross-origin requests
- **Nodemon** for development server

## Project Structure

```
HiringStore Website/
├── hvibefrontend/           # Frontend React application
│   ├── public/              # Static files
│   └── src/                 # Source code
│       ├── App/             # Main application components
│       ├── components/      # Reusable components
│       ├── redux/           # Redux store and slices
│       ├── services/        # API services
│       ├── signUp/          # Signup components
│       ├── login/           # Login components
│       ├── profile/         # User profile components
│       ├── landingpage/     # Landing page components
│       └── ...
│
└── hvibebackend/            # Backend Node.js application
    ├── controllers/         # Route controllers
    ├── middleware/          # Custom middleware
    ├── model/               # Database models
    ├── routes/              # API routes
    └── index.js             # Entry point
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher) or yarn
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "HiringStore Website - Copy"
   ```

2. **Set up the backend**
   ```bash
   cd hvibebackend
   npm install
   ```
   Create a `.env` file in the backend directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

3. **Set up the frontend**
   ```bash
   cd ../hvibefrontend
   npm install
   ```
   Create a `.env` file in the frontend directory:
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd hvibebackend
   npm start
   ```

2. **Start the frontend development server**
   ```bash
   cd ../hvibefrontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile

### Jobs
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get job by ID
- `POST /api/jobs` - Create new job (protected)
- `PUT /api/jobs/:id` - Update job (protected)
- `DELETE /api/jobs/:id` - Delete job (protected)

### Applications
- `POST /api/applications` - Submit job application
- `GET /api/applications` - Get user's applications (protected)
- `GET /api/applications/:id` - Get application details (protected)

## Environment Variables

### Backend
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT
- `PORT`: Server port (default: 5000)

### Frontend
- `VITE_API_BASE_URL`: Base URL for API requests

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries, please contact [Your Email] or open an issue in the repository.
