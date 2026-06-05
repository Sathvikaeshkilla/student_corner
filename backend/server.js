const express = require("express");
const connectDB = require("./config/db");

const app = express();

const authRoutes = require("./routes/authRoutes");
const itemRoutes = require("./routes/itemRoutes");

app.use(express.json());

app.use(authRoutes);
app.use(itemRoutes);

app.get("/", (req, res) => {
   res.send("Backend running");
});

connectDB();

app.listen(3000, () => {
   console.log("Server running");
});