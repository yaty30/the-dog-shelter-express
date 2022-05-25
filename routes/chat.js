var db = require('../firebase')
var utils = require("../utils")
var worker = require("./worker")

const sendChatMessage = (data) => {
    let messages = []
    let messageID = +utils.randomNumbers(5)
    let chatData = {
        chatID: data.chatID,
        messageID: messageID,
        message: data.message,
        clientID: data.clientID,
        workerID: 1,
        sendTime: data.sendTime,
        expired: false,
        date: utils.getDatetime("date"),
        time: utils.getDatetime("time")
    }

    db.addDoc("chat", `${data.chatID}_${messageID}`, chatData)

    // return chatData
}

const removeChatMessage = (data) => {
    let id = `${data.chatID}_${data.messageID}`

    return db.removeDoc("chat", id)
}

const clientGetMessages = (data) => {
    let messages = []
    console.log(data)
    return db.getAllDocs("chat")
        .then(res => {
            res.filter(x =>
                x.chatID.includes(data) && messages.push(x)
            )
        })
        .then(() => {
            return messages
        })
}

const setChatExpire = (data) => {
    let messages = []
    return db.getAllDocs("chat")
        .then(res => {
            res.filter(x =>
                x.chatID.includes(data) && messages.push({
                    ...x,
                    expired: true
                })
            )
        })
        .then(() => {
            messages.map((c, i) =>
                db.addDoc("chat", `${c.chatID}_${c.messageID}`, c)
            )
        })
        .then(() => {
            return "updated"
        })
}

const workerGetMessage = (data) => {
    let messages = []
    return db.getAllDocs("chat")
        .then(res => {
            res.filter(x =>
                x.workerID === +data && messages.push(x)
            )
        })
        .then(() => {
            console.log(messages)
            return messages
        })
}

module.exports = {
    sendChatMessage, removeChatMessage,
    clientGetMessages, setChatExpire,
    workerGetMessage
};
