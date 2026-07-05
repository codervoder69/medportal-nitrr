# 🏥 MedPortal NITRR

MedPortal NITRR is a full-stack MERN (MongoDB, Express, React, Node.js) web application designed for NIT Raipur's dispensary to manage medicine records, events, student health data, and dispensary-related information. It features a clean, responsive UI with secure, role-based access for students, staff, and admins.

---

## ✨ Features

### 🌐 Public (Anyone)

- View **About Us**, **Facilities**, **Staff Members**
- Explore **Gallery**, **Nearby Hospitals**
- View **Medicine Stock** in the dispensary
- Check **Upcoming Events** and **Emergency Contact Numbers**

---

### 🎓 Student (with login & existing records)

- View personal **profile summary**
- Access **past medical visit records**

---

### 👨‍⚕️ Staff

- 🔐 Secure login with JWT & HTTP-only cookies
- 📋 **Register new students** (login credentials auto-sent securely)
- 📝 Create new **medicine issuance records**
- 🧑‍🎓 Update student profile (except roll number & email)
- 💊 Manage **Medicine Stock**:
  - Add new medicines
  - Update quantity or details
  - Delete items
- 📅 Manage **Events**:
  - Create, delete events
- 🏥 Manage **Nearby Hospitals** and **Facilities** (CRUD)
- 🖼️ Update **Gallery** (Add/Delete photos)
- 📂 View all student records with filters by:
  - Roll number
  - Month
  - Year

---

### 🛡️ Admin

- All **staff permissions**, plus:
- 👥 Full **staff management**:
  - Add new staff members
  - Update details
  - Delete accounts

---

## 🔐 Authentication & Security

- **JWT-based authentication**
- **Secure HTTP-only cookies**
- **Password hashing** via `bcrypt`
- **Role-based access** (Student, Staff, Admin)
- Auto-login on valid token
- Logout support with cookie clearing

---

## 🛠️ Tech Stack

| Category      | Tech Used                     |
|---------------|-------------------------------|
| Frontend      | React, Vite, TailwindCSS      |
| Backend       | Node.js, Express              |
| Database      | MongoDB (via Mongoose)        |
| Auth & Crypto | JWT, Cookies, Bcrypt          |
| HTTP Client   | Axios                         |
| Deployment    | Vercel (Frontend), Render (API)

---

## 🗂️ Folder Structure

