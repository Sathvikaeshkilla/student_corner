const Note = require("../models/Note");


const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const uploadNote = async (req, res) => {
  try {
    const {
      title,
      description,
      subject,
      branch,
    } = req.body;

    if (!req.file) {
      return res
        .status(400)
        .send("PDF file is required");
    }

    const uploadFile = () =>
      new Promise((resolve, reject) => {
        const stream =
          cloudinary.uploader.upload_stream(
            {
              resource_type: "auto",
              folder: "student-corner-notes",
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

    const note = new Note({
      title,
      description,
      subject,
      branch,
      uploadedBy: req.userId,
      fileUrl: result.secure_url,
    });

    await note.save();

    res.send("Note uploaded successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error uploading note");
  }
};


const getNotes = async (req,res)=>{
    try{
       const notes = await Note.find().sort({ createdAt: -1 });
       res.send(notes);
    }
    catch(error){
         console.log(error);
        res.send("Error fetching notes");
    }
};


const getNoteById = async (req, res) => {
   try {

      // fetch note
     const note= await Note.findById(req.params.id);

     if(!note){
        return res.send("Note doesnot exist");
     }
      // check exists
      return res.send(note);
      // send note

   } catch(error) {

      // handle error
        console.log(error);
        res.send("Error fetching note");
   }
}


const getMyNotes = async (req,res)=>{
    try{
        const notes = (await Note.find({uploadedBy:req.userId}).sort({ createdAt: -1 }));
        res.send(notes);
    }
    catch(error){
        console.log(error);
        res.send("Error fetching my notes");
    }
}



const deleteNote=async (req,res)=>{
    try{
        const note = await Note.findById(req.params.id);
        if(!note){
            return res.send("Notes doesnot exist");
        }
        if(note.uploadedBy.toString()!=req.userId){
            return res.send("This notes doesnot belong to you ");

        }
        await note.deleteOne();
        res.send("Notes deleted successfully");
    }
    catch(error){
         console.log(error);
        res.send("Error deleting notes");
    }
};


module.exports = { uploadNote ,getNotes,getNoteById,getMyNotes,deleteNote};