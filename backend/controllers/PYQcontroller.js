const PYQ = require("../models/PYQ");


// Upload PYQ
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const uploadPYQ = async (req, res) => {
  try {
    const {
      title,
      description,
      subject,
      branch,
      year,
      examType,
    } = req.body;

    if (!req.file) {
      return res.status(400).send("PDF file is required");
    }

    const uploadFile = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "auto",
            folder: "student-corner-pyqs",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        streamifier
          .createReadStream(req.file.buffer)
          .pipe(stream);
      });

    const result = await uploadFile();

    const pyq = new PYQ({
      title,
      description,
      subject,
      branch,
      year,
      examType,
      uploadedBy: req.userId,
      fileUrl: result.secure_url,
    });

    await pyq.save();

    res.send("PYQ uploaded successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error uploading PYQ");
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