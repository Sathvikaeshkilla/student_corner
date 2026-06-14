const Item = require("../models/Item");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
//create item

const createItem = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      type,
      condition,
    } = req.body;

    if (type === "sell" && !price) {
      return res
        .status(400)
        .send("Price is required for selling items");
    }

    if (!req.file) {
      return res
        .status(400)
        .send("Item image is required");
    }

    const uploadImage = () =>
      new Promise((resolve, reject) => {
        const stream =
          cloudinary.uploader.upload_stream(
            {
              folder: "student-corner-items",
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

    const result = await uploadImage();

    const item = new Item({
      title,
      description,
      price,
      type,
      condition,
      imageUrl: result.secure_url,
      owner: req.userId,
    });

    await item.save();

    res.status(201).send(item);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating item");
  }
};
//get items
const getItems = async (req, res) => {
   try {

      const { type,condition } = req.query;
      const filter = {
         status: "available"
      };

      if (type) {
         filter.type = type;
      }
      if(condition){
         filter.condition=condition;
      }

      const items = await Item.find(filter);

      res.status(200).send(items);

   }
   catch(error){

      console.log(error);

      res.status(500).send("Error fetching items");

   }
}



//get my items
const getMyItems = async (req, res) => {
   try {

      const items = await Item.find({
         owner: req.userId
      });

      res.status(200).send(items);

   }
   catch(error){

      console.log(error);

      res.status(500).send("Error fetching your items");

   }
};


//delete item
const deleteItem = async (req,res)=>{
   try{
    const item = await Item.findById(req.params.id);
    if(!item){
        return res.status(404).send("Item doesnot exist");
    }
    if(item.owner.toString()!==req.userId){
        return res.status(403).send("This item doesnot belong to you ");
    }
    await item.deleteOne();
    res.status(200).send("Item deleted succesfully");}
catch(error) {
 console.log(error);

      res.status(500).send("Error deleting item");
   }

} 


//mark as sold

const markItemSold = async (req, res) => {
   try {
          const item= await Item.findById(req.params.id);

      // find item

      // check exists
if(!item){
return res.status(404).send("Item doesnot exist");
}
      // check owner
if(item.owner.toString()!=req.userId){
   return res.status(403).send("This item doesnot belong to you ");
}
      // update status
item.status="sold";
      // save
await item.save();
return res.status(200).send("Item marked as sold");
      // response

   } catch(error) {
 console.log(error);

      res.status(500).send("Error marking item as sold");
   }
}

//show item
const getItemById = async (req, res) => {
   try {

      const item = await Item.findById(req.params.id);

      if(!item){
         return res.status(404).send("Item does not exist");
      }

      res.status(200).send(item);

   } catch(error){

      console.log(error);

      res.status(500).send("Error fetching item");
   }


}

//edit item
const editItem = async (req, res) => {
   try {

      const item = await Item.findById(req.params.id);

      if (!item) {
         return res.status(404).send("Item does not exist");
      }

      if (item.owner.toString() !== req.userId) {
         return res.status(403).send("This item does not belong to you");
      }

      const { title, description, price, condition } = req.body;

      if (title) item.title = title;
      if (description) item.description = description;
      if (price !== undefined) item.price = price;
      if (condition) item.condition = condition;

      await item.save();

      res.status(200).send("Item updated successfully");


   } catch (error) {

      console.log(error);
      res.status(500).send("Error updating item");

   }
};






module.exports = {createItem, getItems,getMyItems,deleteItem,markItemSold,getItemById,editItem};









