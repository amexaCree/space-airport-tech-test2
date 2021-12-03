const dbPool = require('../db');
const mysql = require('mysql');

class SpaceDataStore {
    
    async show (id) {
        try {
            let sql = "SELECT * FROM spaceData WHERE id=?";
            sql = mysql.format(sql, [id]);
            const result = await dbPool.query(sql);
            let spaceData = result[0] ? result[0] : null
            
            if (!!spaceData) {
                const spaceItem = spaceData.spaceItem
                const spaceItemData = JSON.parse(spaceItem)
                spaceData = {id, ...spaceItemData}
            }
    
            return spaceData
        } catch (err) {
            throw new Error(`Could not find spaceData ${id}. ${err}`)
        }
    }

    async create (spaceData) {
        const {id, ...spaceItem} = spaceData
        const spaceItemString = JSON.stringify(spaceItem)

        try {
            let sql = 'INSERT INTO spaceData (id, spaceItem) VALUES (?, ?)';
            sql = mysql.format(sql, [id, spaceItemString]);
            const result = await dbPool.query(sql);

            return result
        } catch (err) {
            throw new Error(`Could not create new landingPad ${id}. ${err}`)
        }
    }
}

module.exports = SpaceDataStore