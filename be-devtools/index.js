require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express()
// const Storage  = require('@google-cloud/storage');
const { v4: uuidv4 } = require("uuid");


const uploadRoutes = require('./routes/uploadRoutes');
app.use('/api/upload', uploadRoutes);

const sequelize = require("./config/dbconn")
const adminRoutes = require("./routes/adminRoutes")
const donateRoutes = require("./routes/donateRoutes")
const webhookRoutes = require("./routes/webhookRoutes")

app.use("/webhook", webhookRoutes)
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
// app.use("/api/users", userRoutes)
app.use("/api/donate", donateRoutes)
app.use("/api/admin", adminRoutes)

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