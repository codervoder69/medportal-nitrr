const dns = require("dns");
dns.setServers(["1.1.1.1", "1.0.0.1"]);

console.log("DNS:", dns.getServers());

require("dotenv").config();
// Load environment variables first
require('dotenv').config();

// Server Instance
const express = require('express');
const app = express();

// Middleware imports
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");


// 1. Cookie parser first — for authentication tokens
app.use(cookieParser());

// 2. CORS setup — allow your frontend to send credentials (cookies)
app.use(cors({
  origin: [
    "http://localhost:5173",
  "https://medportal-nitrr-liard.vercel.app"
          ], // Your deployed frontend URL
  credentials: true, //  Required to allow cookies
}));

// 3. JSON parser
app.use(express.json());

// 4. File upload config
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/",
}));

// === Database & Cloudinary setup ===
require('./Config/database').dbConnect();
const { cloudinaryConnect } = require("./Config/cloudinary");
cloudinaryConnect();

// === Routes ===
const userRoutes = require('./Routes/user');
const facilityRoutes = require('./Routes/facility');
const medicineRoutes = require('./Routes/medicine');
const hopitalRoutes = require('./Routes/nearByHospital');
const notificationRoutes = require('./Routes/notification');
const galleryRoutes = require('./Routes/gallery');
const historyRoutes = require('./Routes/history');

app.use("/api/auth", userRoutes);
app.use("/api/facility", facilityRoutes);
app.use("/api/medicine", medicineRoutes);
app.use("/api/hospital", hopitalRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/history", historyRoutes);

// === Start Server ===
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running....",
	});
});

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
