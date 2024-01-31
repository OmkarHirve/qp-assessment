const express = require('express')
const router = express.Router()
const groceryUserService = require('../services/grocery-user-service')

router.get("/grocery/view", groceryUserService.viewItems);

router.post("/grocery/book", groceryUserService.bookItems);

module.exports = router