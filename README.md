# BlogApp REST API

A robust RESTful API for a blogging platform, built with Node.js, Express, MongoDB, and Cloudinary. This API supports user authentication, blog post creation (with image upload), likes, comments, and user profile management.

---

## 🚀 Features

- **User Registration & Login** (with JWT authentication)
- **Google OAuth Login**
- **Create, Read Blog Posts** (with optional image upload to Cloudinary)
- **Like/Unlike Posts** (only once per user)
- **Comment on Posts** (only as authenticated user)
- **Delete Your Own Comments**
- **User Profile** (view and update name, email, and profile picture)

---

## 📦 Project Structure

```
BlogApp/
  ├── controllers/
  ├── models/
  ├── routes/
  ├── config/
  ├── middleware/
  ├── index.js
  └── ...
```

---

## 🛠️ Setup Instructions

1. **Clone the repository**
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Create a `.env` file** in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. **Start the server**
   ```bash
   npm start
   # or for development
   npm run dev
   ```

---

## 📚 API Endpoints

### **Auth & User**
- `POST /api/users/register` — Register a new user
- `POST /api/users/login` — Login and get JWT
- `GET /api/users/google` — Google OAuth login
- `GET /api/users/profile` — Get your profile (JWT required)
- `PUT /api/users/profile` — Update your profile (JWT required, supports profilePic upload)

### **Posts**
- `POST /api/v1/posts/create` — Create a post (JWT required, supports image upload)
- `GET /api/v1/posts` — Get all posts

### **Likes**
- `POST /api/v1/likes/like` — Like a post (JWT required)
- `POST /api/v1/likes/unlike` — Unlike a post (JWT required)

### **Comments**
- `POST /api/v1/comments/create` — Comment on a post (JWT required)
- `DELETE /api/v1/comments/:commentId` — Delete your comment (JWT required)

---

## 🔐 Authentication
- Most endpoints require a JWT token in the `Authorization` header:
  ```
  Authorization: Bearer <your_token>
  ```

---

## 🧪 How to Test (Postman, Thunder Client, etc.)

1. **Import the endpoints** into your API client (Postman, Thunder Client, Hoppscotch, etc.).
2. **Register or login** to get a JWT token.
3. **Set the JWT token** in the `Authorization` header for protected routes.
4. **For file uploads** (post images, profile pictures), use `form-data` and add the file field (`image` for posts, `profilePic` for profile).
5. **Try all endpoints** as described above!

---

## 💡 What This Project Offers
- A full-featured backend for a blog platform
- Secure authentication (JWT, Google OAuth)
- Media upload support (Cloudinary)
- Clean, modular code structure
- Ready for frontend or mobile integration

---

## 📬 Contributing & Feedback
Feel free to fork, open issues, or suggest improvements! 