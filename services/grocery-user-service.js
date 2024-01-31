const _ = require('lodash');
const {Mutex} = require("async-mutex");
const groceryDBService = require("../datastore/services/groceries");

const mutex = new Mutex()

async function viewItems(req, res) {
    try {
        let filters = req.body;
        if (_.isEmpty(filters)) {
            filters = {}
        }
        let groceries = await groceryDBService.get(filters);
        groceries = JSON.parse(JSON.stringify(groceries))
        res.status(200).json(groceries)
    } catch (error) {
        console.error("Unable to fetch items with error", error)
        res.status(500).json({"message": "Error fetching items"})
    }
}

async function bookItems(req, res) {
  try {
    let bookings = req.body;
    let response = {
        statusCode: 200,
        successfullyBookedItems: [],
        failedToBookItems: []
    }
    for (let booking of bookings) {
      let { itemid, count } = booking;
        await mutex.runExclusive(async () => {
        let grocery = await groceryDBService.get({
          where: {
            itemid: itemid,
          },
        });

        if (grocery[0].availableCount - count >= 0) {
          await groceryDBService.patch(itemid, {
            availableCount: grocery[0].availableCount - count,
          });
          response.successfullyBookedItems.push(itemid);
        } else {
          response.statusCode = 422
          response.failedToBookItems.push(itemid)
          return;
        }
        
      });
    }
    res.status(response.statusCode)
    .json({ 
            "Orders placed for": response.successfullyBookedItems,
            "Failed to place orders for": response.failedToBookItems
    });
  } catch (error) {
    console.error("Failed to book items");
    res.status(500).json({ message: "Error in booking items" });
  }
}

module.exports = {
    viewItems, bookItems
}