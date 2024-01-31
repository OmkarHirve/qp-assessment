const {Groceries} = require('../models/groceries')
const {sequelize} = require('../connection')
const _ = require('lodash')
const jp = require('jsonpath')

const insert = async (groceryData) => {
    sequelize.sync('groceries')
    try {
        let existingData = await get({ attributes: ["itemid"] });
        let existingIds = jp.query(existingData, "$..itemid");
        console.log(
          "existing IDs are --> ",
          existingIds
        );
        let newIds = _.difference(jp.query(groceryData, "$..itemid"), existingIds)
        if (newIds.length > 0) {
          await Groceries.bulkCreate(groceryData, { ignoreDuplicates: true }); 
        }
        console.log("Added ", newIds.length, " new entries. Duplicates ignored.")
    } catch (error) {
        console.log("Unable to create record for grocery ", error.message, error.code)
        throw error;
    }
}

const get = async (filters={}) => {
    let options = {}
    let filterKeys = Object.keys(filters)
    console.log("filterkeys ", filterKeys);
    if (filterKeys.length !== 0) {
        filterKeys.forEach(key => {
            options[key] = filterKeys[key]
        })
    }
    sequelize.sync('groceries')
    try {
        const groceries = await Groceries.findAll(options)
        console.log(
          "Found groceries with filters: ",
          filters,
          " with result ",
          JSON.parse(JSON.stringify(groceries))
        );
        return JSON.parse(JSON.stringify(groceries));
    } catch (error) {
        console.log("Unable to perform operation for to search record for grocery with filters", filters)
        throw error;
    }

}

const patch = async (itemid, groceryData) => {
    sequelize.sync('groceries')
    try {
        await Groceries.update(groceryData, {
            where: {
                itemid: itemid,
            }
        })
        console.log("Updated grocery with itemid ", itemid)
    } catch (error) {
        console.log("Unable to update record for grocery with itemid ", itemid)
    }
}

const remove = async (itemid) => {
    sequelize.sync('groceries')
    try {
        await Groceries.destroy({
            where: {
                itemid: itemid,
            }
        })
        console.log("Removed grocery with itemid ", itemid)

    } catch (error) {
        console.log("Unable to remove record for grocery with itemid ", itemid)
    }
}

module.exports = {
    insert,
    get,
    patch,
    remove
}
