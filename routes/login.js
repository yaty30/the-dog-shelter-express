var db = require('../firebase')
var utils = require("../utils")

const login = (data) => {
    return db.getDoc("account", data.email).then((res) => {
        if (res === null) {
            console.log("no user found.")
            return "no_user"
        } else {
            let id = res.id
            return db.getDoc("users", `${id}`).then((ex) => {
                if(ex.password === data.password) {
                    console.log("logined")
                    return {
                        id: +id,
                        username: res.name,
                        userType: res.purpose === "adopt" ? "client" : "worker",
                        loginDate: utils.getDatetime("date"),
                        loginTime: utils.getDatetime("time"),
                    }
                } else {
                    console.log("incorrect email/password")
                    return "incorrect"
                }
            })
        }
    })
}


module.exports = {
    login
};
