# User Management Module

This project is a practice application where I integrate React with an Express.js backend to create a small user management module. The project covers various fundamental concepts including image uploads to Cloudinary, session management using JSON Web Tokens (JWT), password hashing using bcrypt, and CRUD operations using MongoDB Atlas.

## Features

- **User Authentication**: Login users with JWT-based authentication.
- **Password Security**: Hash passwords using bcrypt.
- **Image Uploads**: Upload and manage user images using Cloudinary.
- **CRUD Operations**: Create, read, update, and delete user profiles stored in MongoDB Atlas.
- **React Frontend**: A responsive frontend built with React.

## Technologies Used

### Backend

- Node.js
- Express.js
- Tailwind CSS
- MongoDB Atlas
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt
- Multer
- Cloudinary

### Frontend

- React
- Axios (for HTTP requests)
- React Router (for routing)

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/your-repo-name.git
    cd your-repo-name
    ```

2. **Install backend dependencies**:
    ```bash
    cd backend
    npm install
    ```

3. **Install frontend dependencies**:
    ```bash
    cd ../frontend
    npm install
    ```

4. **Set up environment variables**:
    - Create a `.env` file in the `backend` directory and add the following variables:
      ```env
      MONGODB_URI=your_mongodb_atlas_uri
      JWT_SECRET=your_jwt_secret
      CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
      CLOUDINARY_API_KEY=your_cloudinary_api_key
      CLOUDINARY_API_SECRET=your_cloudinary_api_secret
      ```

5. **Run the application**:
    - Start the backend server:
      ```bash
      cd backend
      npm start
      ```
    - Start the frontend development server:
      ```bash
      cd ../frontend
      npm start
      ```
## Note

To use the application fully, you need to create users directly in the database, as there is no user registration endpoint available. This involves manually adding users and storing their bcrypt hashed passwords in the database. Below are the steps to create a user:

1. Generate a bcrypt hash for your password. You can use an online bcrypt generator or write a small script to generate it.
2. Connect to your MongoDB Atlas cluster using a MongoDB client (like MongoDB Compass or the Mongo Shell).
3. Insert a new user document into the `users` collection with the hashed password. For example:

    ```json
    {
      "email": "admin@example.com",
      "password": "$2a$10$E9s6kG5bixPeF/8QdsR9aeiaGHl17RfX6yT.5YxCEOm1kpCuZGqPO", // this should be your hashed password
      "role": "Admin"
    }
    ```
