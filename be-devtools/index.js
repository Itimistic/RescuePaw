require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express()

const sequelize = require("./config/dbconn")
const userRoutes = require("./routes/userRoutes")
const petRoutes = require('./routes/petRoutes');

// app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: process.env.API_CLIENT_BASE_URL,
    methods: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));  

// Routes
app.use("/api/users", userRoutes)
app.use("/api/pets", petRoutes)

sequelize
.sync()
.then(() => {
    console.log("Database synced");
})
.catch((err) => console.error("Error syncing DB:", err));


app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(process.env.PORT, () => console.log(`Server is running on http://localhost:${process.env.PORT}`))