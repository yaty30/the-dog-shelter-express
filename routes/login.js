var db = require('../firebase')
var utils = require("../utils")

const login = (data) => {
    db.getDoc("account", data.email).then((res) => {
        if (res === null) {
            console.log("no user found.")
            return "no_user"
        } else {
            let id = res.id
            db.getDoc("users", id).then((ex) => {
                if(ex.password === data.password) {
                    console.log("logined")
                    return true
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
