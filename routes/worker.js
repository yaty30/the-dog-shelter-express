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

const getAllWorkerIDs = () => {
    let workerIDs = []
    return db.getAllDocs("account")
        .then(res => {
            res.filter(x => x.purpose !== "adopt").map(id => 
                workerIDs.push(+id.id)    
            )
        })
        .then(() => workerIDs)
}

module.exports = {
    getAllWorkers, getAllWorkerIDs
};