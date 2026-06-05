const express = require("express");

const router = express.Router();

const { createItem ,getItems,getMyItems,deleteItem,markItemSold,getItemById,editItem} = require("../controllers/itemController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/items", authMiddleware, createItem);
router.get("/items", getItems);
router.get("/my-items", authMiddleware, getMyItems);
router.delete("/items/:id",authMiddleware,deleteItem);
router.patch("/items/:id/sold",authMiddleware,markItemSold);
router.get("/items/:id",getItemById);
router.patch("/items/:id", authMiddleware, editItem);
module.exports = router;


