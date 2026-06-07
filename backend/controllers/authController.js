
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const User = require("../models/User");

const signup = async (req, res) => {

   try {

      const { name, email, password } = req.body;

      const existingUser = await User.findOne({ email });

      if(existingUser){
         return res.send("User already exists");
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
         name,
         email,
         password: hashedPassword
      });

      await user.save();

      res.send("User created successfully");

   }
   catch(error){

      console.log(error);

      res.send("Error creating user");

   }

};

const login = async (req, res) => {

   try {

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if(!user){
         return res.send("Invalid email");
      }


      const isMatch=await bcrypt.compare(password,user.password);
      if(!isMatch){
         return res.send("Invalid password");
      }
      else
      {
         const token = jwt.sign(
         { userId: user._id },
          "secretkey")
      res.send(token);

}

   }
   catch(error){

      console.log(error);

      res.send("Login failed");

   }

};


const getProfile = async (req, res) => {
   try {

      const user = await User.findById(req.userId);

      if (!user) {
         return res.send("User not found");
      }

      res.send(user);

   } catch (error) {

      console.log(error);
      res.send("Error fetching profile");

   }
};

module.exports = {
   signup,
   login,
   getProfile
};