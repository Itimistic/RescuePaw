require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express()
// const Storage  = require('@google-cloud/storage');
const { v4: uuidv4 } = require("uuid");


const sequelize = require("./config/dbconn")
const userRoutes = require("./routes/userRoutes")
const reportRoutes = require("./routes/reportRoutes")
const donateRoutes = require("./routes/donateRoutes")
const webhookRoutes = require("./routes/webhookRoutes")

app.use("/webhook", webhookRoutes)
// app.use(cors()); 
const userRoutes = require("./routes/userRoutes")
const petRoutes = require("./routes/petRoutes")
const authRoutes = require("./routes/authRoutes");
const { verifyToken, verifyAdmin } = require("./middleware/authMiddleware");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: process.env.API_CLIENT_BASE_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));  

// Routes
// app.use("/api/users", userRoutes)
app.use("/api/donate", donateRoutes)

app.use("/api/users", userRoutes)
app.use("/api/report", reportRoutes);
app.use("/api/pets", petRoutes)
app.use("/api/auth", authRoutes);

app.get("/api/admin", verifyToken, verifyAdmin, (req, res) => {
  res.json({ message: "Welcome Admin!" });
});



sequelize
.sync({ alter: true })
.then(() => {
    console.log("Database synced");
})
.catch((err) => console.error("Error syncing DB:", err));


app.get("/", (req, res) => {
    res.send("Hello World")
})

// app.get("/reportform", (req, res) -> {
//     res.render("report");
// })

app.listen(process.env.PORT, () => console.log(`Server is running on http://localhost:${process.env.PORT}`))

