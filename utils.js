var db = require('./firebase')

const randomString = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

const randomLetters = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

const randomNumbers = (length) => {
    var result = '';
    var characters = '123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

const allowed = (token) => {
    return db.getDoc("token", token).then((res) => {
        return res === null ? false : true
    })
}

const addZero = (val) => {
    return val < 10 ? `0${val}` : val
}

const generateToken = () => {
    return {
        date: getDatetime("date"),
        time: getDatetime("time"),
        token: randomLetters(25)
    }
}

const getDatetime = (type) => {
    var now = new Date();
    if (type === "date") {
        return `${now.getFullYear()}/${addZero(now.getMonth())}/${addZero(now.getDate())}`
    } else {
        return `${addZero(now.getHours())}:${addZero(now.getMinutes())}:${addZero(now.getSeconds())}`
    }
}

module.exports = {
    randomString, getDatetime,
    randomNumbers, generateToken, 
    allowed
}