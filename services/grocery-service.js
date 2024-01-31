const groceryDBService = require("../datastore/services/groceries")
const getUuid = require("uuid-by-string");

async function addGroceryItems(req, res) {
    const groceries = req.body;
    for (let item of groceries) {
        item.itemid = getUuid(item.name)
    }
    try {
        await groceryDBService.insert(groceries);
        res.status(200).json({message: "Data inserted successfully"})
    } catch (err) {
        console.error("Unable to add grocery items", error.message)
        res.status(500).json({message: "Error while inserting groceries"})
    }
}

async function getAllGroceryItems(req, res) {
    try{
        const groceries = await groceryDBService.get()
        res.status(200).json(groceries)
    } catch (error) {
        console.error("Could not fetch grocery items", error.message)
        res.status(500).json({message: "Error while fetching groceries data."});

    }
}

async function removeItem(req, res) {
    try{
        const itemid = req.params.itemid;
        await groceryDBService.remove(itemid);
        res.status(200).json({message: "Removed data successfully"})
    } catch(err) {
        console.error("Could not remove grocery item ", err.message);
        res.status(500).json({ message: "Error while fetching groceries data." });
    }
}

async function modifyItem(req, res) {
    try {
        const itemid = req.params.itemid;
        const patchData = req.body;
        await groceryDBService.patch(itemid, patchData) 
        res.status(200).json({ message: "Updated data successfully" });
    } catch (error) {
        console.error("Could not remove grocery item ", err.message);
        res.status(500).json({ message: "Error while fetching groceries data." });
    }
}

module.exports.addGroceryItems = addGroceryItems;
module.exports.getAllGroceryItems = getAllGroceryItems;
module.exports.removeItem = removeItem;
module.exports.modifyItem = modifyItem;