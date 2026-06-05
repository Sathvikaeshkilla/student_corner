const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

   try {

      const authHeader = req.headers.authorization;

      const token = authHeader.split(" ")[1];

      const decoded = jwt.verify(token, "secretkey");

      req.userId = decoded.userId;

      next();

   }
   catch(error){

      res.send("Unauthorized");

   }

};

module.exports = authMiddleware;