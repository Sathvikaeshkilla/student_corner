const express = require("express");
const connectDB = require("./config/db");

const app = express();

const authRoutes = require("./routes/authRoutes");
const itemRoutes = require("./routes/itemRoutes");
const noteRoutes = require("./routes/noteRoutes");
const pyqRoutes = require("./routes/pyqRoutes");
const messageRoutes = require("./routes/messageRoutes");

app.use(express.json());

app.use(authRoutes);
app.use(itemRoutes);
app.use(messageRoutes);
app.use(noteRoutes);
app.use(pyqRoutes);


app.get("/", (req, res) => {
   res.send("Backend running");
});

connectDB();

app.listen(3000, () => {
   console.log("Server running");
});