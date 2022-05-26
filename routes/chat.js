var db = require('../firebase')
var utils = require("../utils")
var worker = require("./worker")

const generateMessageID = (chatID) => {
    let list = []
    return clientGetMessages(chatID).then((x) => {
        x.map((id) =>
            list.push(id.orderID)
        )
    }).then(() => {
        console.log(Math.max(list) + 1)
        return Math.max(list) + 1
    })
}

const sendChatMessage = (data) => {
    let messageID = +utils.randomNumbers(5)
    generateMessageID(data.chatID).then((orderID) => {
        let chatData = {
            chatID: data.chatID,
            messageID: messageID,
            message: data.message,
            clientID: data.clientID,
            workerID: 88731,
            sendTime: data.sendTime,
            sendBy: data.sendBy,
            expired: false,
            orderID: orderID,
            date: utils.getDatetime("date"),
            time: utils.getDatetime("time")
        }

        db.addDoc("chat", `${data.chatID}_${messageID}`, chatData)

    })

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
            if (res !== null) {
                res.map(x =>
                    x.chatID === data && messages.push(x)
                )
            }
        })
        .then(() => {
            return messages
        })
}

const clientGetMessagesByID = (data) => {
    let messages = []
    return db.getAllDocs("chat")
        .then(res => {
            if (res !== null) {
                res.map(x =>
                    x.clientID === +data && messages.push(x)
                )
            }
        })
        .then(() => {
            return messages
        })
}

const workerGetMessagesByID = (data) => {
    let messages = []
    return db.getAllDocs("chat")
        .then(res => {
            if (res !== null) {
                res.map(x =>
                    x.workerID === +data && messages.push(x)
                )
            }
        })
        .then(() => {
            return messages
        })
}

const getMessagesByID = (data) => {
    let messages = []
    return db.getAllDocs("chat")
        .then(res => {
            if (res !== null) {
                res.map(x =>
                    x.clientID === +data && messages.push(x)
                )
            }
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
    workerGetMessage, clientGetMessagesByID,
    workerGetMessagesByID
};
