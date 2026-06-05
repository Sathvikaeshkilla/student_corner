const Note = require("../models/Note");

const uploadNote = async (req, res) => {
   try {

      const {
         title,
         description,
         subject,
         branch,
         fileUrl
      } = req.body;

      const note = new Note({
         title,
         description,
         subject,
         branch,
         uploadedBy: req.userId,
         fileUrl
      });

      await note.save();

      res.send("Note uploaded successfully");

   } catch (error) {

      console.log(error);

      res.send("Error uploading note");

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