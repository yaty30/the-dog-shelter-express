var db = require('../firebase')
var utils = require("../utils")

const createUser = (item) => {
    let data = {
        email: item.email,
        password: item.password
    }
    db.addDoc("users", item.id, data)
}

const register = (data) => {
    db.getDoc("account", data.email).then((res) => {
        if (res === null) {
            let token = utils.generateToken()
            let id = utils.randomNumbers(5)
            let accData = {
                id: +id,
                email: data.email,
                password: data.password,
                name: data.name,
                phone: data.phone,
                gender: data.gender,
                haveDog: data.haveDog,
                purpose: data.purpose,
                isAdult: data.isAdult,
                isStaff: data.isStaff,
                code: data.code,
                workerToken: data.purpose === "worker" ? token : {}
            }
            db.addDoc("account", data.email, accData)
            db.addDoc("token", token.token, { date: token.date, time: token.time })
            
            if(data.purpose === "adopt") {
                db.addDoc("favouriteList", `${id}`, { list: [] })
            }
            
            let userData = {
                id: accData.id,
                email: accData.email,
                password: accData.password
            }
            createUser(userData)

            console.log('done.')
            return "Done"
        } else {
            console.log('Registered')
            return "Registered"
        }
    })
}


module.exports = {
    register
};
