# 🚗 CarGoRent — MERN Stack Web App

CarGoRent is a full-stack web application that allows users to browse, book, and manage car rentals online.  
Built using the **MERN (MongoDB, Express, React, Node.js)** stack with JWT authentication and a modern responsive UI.

---

## 🌟 Features

- 🔐 Secure user authentication (JWT + bcrypt)
- 🚘 Car listing with images, price, and availability
- 📅 Booking system with date validation
- 🧾 User dashboard for viewing bookings
- ⚙️ Admin panel for car management
- ☁️ Deployed frontend (Vercel) and backend (Render)

---

## 🧩 Tech Stack

### Frontend
- React + Vite  
- Tailwind CSS  
- Axios  
- React Router DOM  
- React Hot Toast  

### Backend
- Node.js + Express  
- MongoDB + Mongoose  
- JWT (Authentication)  
- bcrypt (Password Hashing)  
- CORS  

---

## 📁 Folder Structure

```
CarGoRent/
│
├── client/          # React frontend
├── server/          # Node.js backend
└── README.md        # Main project documentation
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/shubhamyadav965/CarGoRent.git
cd CarGoRent
```

### 2️⃣ Setup Backend
```bash
cd server
npm install
npm run server
```

### 3️⃣ Setup Frontend
```bash
cd ../client
npm install
npm run dev
```

🖥️ The frontend runs on port **5173**, and the backend runs on port **5000** by default.

---

## 🔐 Environment Variables

Create `.env` files in both `server` and `client` directories.

### ➡️ `/server/.env`:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

### ➡️ `/client/.env`:

```env
VITE_BACKEND_URL=http://localhost:5000
VITE_CURRENCY=₹
```

---

## 🚀 Deployment

- **Frontend:** Vercel
- **Backend:** Render

Make sure to update `VITE_BACKEND_URL` with your deployed backend URL.

---

## 👨‍💻 Author

**Shubham Yadav**  
Full Stack Developer  
🌐 [GitHub Profile](https://github.com/shubhamyadav965)

