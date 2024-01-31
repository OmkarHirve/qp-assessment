const express = require("express");
const router = express.Router();
const groceryService = require('../services/grocery-service')

router.get("/grocery/view", groceryService.getAllGroceryItems);

router.post("/grocery/addItems", groceryService.addGroceryItems);

router.delete("/grocery/remove/:itemid", groceryService.removeItem);

router.patch("/grocery/item/:itemid", groceryService.modifyItem);

module.exports = router;
