var db = require('../firebase')
var utils = require("../utils")

const getAllWorkers = () => {
    let list = []
    return db.getAllDocs("account")
        .then(res => {
            res.map(r =>
                r.purpose === "charity_worker" && list.push(r)    
            ) 
        })
        .then(() => {
            return list
        })
}

module.exports = {
    getAllWorkers
};