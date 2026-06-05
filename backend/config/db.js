const mongoose = require("mongoose");

const connectDB = async () => {

   try {

      await mongoose.connect("mongodb+srv://student_corner:student_corner@cluster0.ovy0fzk.mongodb.net/?appName=Cluster0");

      console.log("MongoDB connected");

   }
   catch(error){

      console.log(error);

   }

};

module.exports = connectDB;