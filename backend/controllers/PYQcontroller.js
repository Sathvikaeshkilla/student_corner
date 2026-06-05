const PYQ = require("../models/PYQ");


// Upload PYQ
const uploadPYQ = async (req, res) => {
   try {

      const {
         title,
         description,
         subject,
         branch,
         year,
         examType,
         fileUrl
      } = req.body;

      const pyq = new PYQ({
         title,
         description,
         subject,
         branch,
         year,
         examType,
         uploadedBy: req.userId,
         fileUrl
      });

      await pyq.save();

      res.send("PYQ uploaded successfully");

   } catch (error) {

      console.log(error);

      res.send("Error uploading PYQ");

   }
};


// Get all PYQs
const getPYQs = async (req, res) => {
   try {

      const pyqs = await PYQ.find()
         .sort({ createdAt: -1 });

      res.send(pyqs);

   } catch (error) {

      console.log(error);

      res.send("Error fetching PYQs");

   }
};


// Get single PYQ
const getPYQById = async (req, res) => {
   try {

      const pyq = await PYQ.findById(req.params.id);

      if (!pyq) {
         return res.send("PYQ does not exist");
      }

      res.send(pyq);

   } catch (error) {

      console.log(error);

      res.send("Error fetching PYQ");

   }
};


// Get my PYQs
const getMyPYQs = async (req, res) => {
   try {

      const pyqs = await PYQ.find({
         uploadedBy: req.userId
      }).sort({ createdAt: -1 });

      res.send(pyqs);

   } catch (error) {

      console.log(error);

      res.send("Error fetching your PYQs");

   }
};


// Delete PYQ
const deletePYQ = async (req, res) => {
   try {

      const pyq = await PYQ.findById(req.params.id);

      if (!pyq) {
         return res.send("PYQ does not exist");
      }

      if (pyq.uploadedBy.toString() !== req.userId) {
         return res.send("This PYQ does not belong to you");
      }

      await pyq.deleteOne();

      res.send("PYQ deleted successfully");

   } catch (error) {

      console.log(error);

      res.send("Error deleting PYQ");

   }
};


module.exports = {
   uploadPYQ,
   getPYQs,
   getPYQById,
   getMyPYQs,
   deletePYQ
};