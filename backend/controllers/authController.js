
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const User = require("../models/User");

const signup = async (req, res) => {

   try {

      const { name, email, password } = req.body;

      const existingUser = await User.findOne({ email });

      if(existingUser){
         return res.status(400).send("User already exists");
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
         name,
         email,
         password: hashedPassword
      });

      await user.save();

      res.status(201).send("User created successfully");

   }
   catch(error){

      console.log(error);

      res.status(500).send("Error creating user");

   }

};

const login = async (req, res) => {

   try {

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if(!user){
   return res.status(401).json({
      message: "Invalid email"
   });
}


      const isMatch=await bcrypt.compare(password,user.password);
      if(!isMatch){
         return res.status(401).json({
            message: "Invalid password"
         });
      }
      else
      {
         const token = jwt.sign(
         { userId: user._id },
          "secretkey")
      res.status(200).json({token});

}

   }
   catch(error){

      console.log(error);

     res.status(500).json({
   message: "Login failed"
});

   }

};


const getProfile = async (req, res) => {
   try {

      const user = await User.findById(req.userId);

      if (!user) {
         return res.status(404).send("User not found");
      }

      res.json({_id: user._id,name: user.name,email: user.email
});

   } catch (error) {

      console.log(error);
      res.status(500).send("Error fetching profile");

   }
};

module.exports = {
   signup,
   login,
   getProfile
};