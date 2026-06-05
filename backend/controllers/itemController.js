const Item = require("../models/Item");

//create item

const createItem = async (req, res) => {

   try {
    const { title, description, price, type, condition } = req.body;
    if(type==="sell" &&!price){
        return res.send("Price is required for selling items");
    }
    const item= new Item({
        title,
        description,
        price,
        type,
        condition,
        owner:req.userId,
    })
    await item.save();
    res.send("Item created succesfully");
   }
   catch(error){
    console.log(error);
    res.send("Error creating item");
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

      res.send(items);

   }
   catch(error){

      console.log(error);

      res.send("Error fetching items");

   }
}



//get my items
const getMyItems = async (req, res) => {
   try {

      const items = await Item.find({
         owner: req.userId
      });

      res.send(items);

   }
   catch(error){

      console.log(error);

      res.send("Error fetching your items");

   }
};


//delete item
const deleteItem = async (req,res)=>{
   try{
    const item = await Item.findById(req.params.id);
    if(!item){
        return res.send("Item doesnot exist");
    }
    if(item.owner.toString()!==req.userId){
        return res.send("This item doesnot belong to you ");
    }
    await item.deleteOne();
    res.send("Item deleted succesfully");}
catch(error) {
 console.log(error);

      res.send("Error deleting item");
   }

} 


//mark as sold

const markItemSold = async (req, res) => {
   try {
          const item= await Item.findById(req.params.id);

      // find item

      // check exists
if(!item){
return res.send("Item doesnot exist");
}
      // check owner
if(item.owner.toString()!=req.userId){
   return res.send("This item doesnot belong to you ");
}
      // update status
item.status="sold";
      // save
await item.save();
return res.send("Item marked as sold");
      // response

   } catch(error) {
 console.log(error);

      res.send("Error marking item as sold");
   }
}

//show item
const getItemById = async (req, res) => {
   try {

      const item = await Item.findById(req.params.id);

      if(!item){
         return res.send("Item does not exist");
      }

      res.send(item);

   } catch(error){

      console.log(error);

      res.send("Error fetching item");
   }


}

//edit item
const editItem = async (req, res) => {
   try {

      const item = await Item.findById(req.params.id);

      if (!item) {
         return res.send("Item does not exist");
      }

      if (item.owner.toString() !== req.userId) {
         return res.send("This item does not belong to you");
      }

      const { title, description, price, condition } = req.body;

      if (title) item.title = title;
      if (description) item.description = description;
      if (price !== undefined) item.price = price;
      if (condition) item.condition = condition;

      await item.save();

      res.send("Item updated successfully");


   } catch (error) {

      console.log(error);
      res.send("Error updating item");

   }
};






module.exports = {createItem, getItems,getMyItems,deleteItem,markItemSold,getItemById,editItem};









