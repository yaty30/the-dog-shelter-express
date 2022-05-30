const { doc, getDoc } = require('firebase/firestore')
var db = require('../firebase')
var utils = require("../utils")
var worker = require("./worker")

const getMessageOrderID = (chatID) => {
    let list = []
    return db.getAllDocs("chat")
        .then((res) =>
            res.map(x =>
                x.chatID === chatID && list.push(x)
            )
        )
        .then(() => list.length + 1)
}

const createNewChat = (data) => {
    return worker.getAllWorkerIDs()
        .then((workerID) => {
            let chatID = utils.randomString(15)
            let messageID = utils.randomString(25)
            let messageBody = {
                message: data.message,
                from: data.from,
                to: workerID[Math.floor(Math.random() * workerID.length)],
                date: utils.getDatetime("date"),
                time: utils.getDatetime("time"),
                chatID: chatID,
                messageID: messageID,
                orderID: 1,
                messageType: "string"
            }

            return db.addDoc("chat", `${chatID}_${messageID}`, messageBody)
                .then(() => messageBody)
        })
}

const replyMessage = (data) => {
    let messageID = utils.randomString(25)
    return getMessageOrderID(data.chatID).then((orderID) => {
        let messageBody = {
            message: data.message,
            from: data.from,
            to: data.to,
            date: utils.getDatetime("date"),
            time: utils.getDatetime("time"),
            chatID: data.chatID,
            messageID: messageID,
            orderID: orderID,
            messageType: data.messageType
        }

        return db.addDoc("chat", `${data.chatID}_${messageID}`, messageBody)
            .then(() => messageBody)
    })
}

const deleteMessage = (data) => {
    return db.removeDoc("chat", `${data.chatID}_${data.messageID}`)
        .then((res) =>
            res
        )
}

const restoreMessage = (userID) => {
    let list = []
    return db.getAllDocs("chat")
        .then((res) => {
            res.map((x, i) => {
                (x.from === +userID || x.to === +userID) && list.push(x)
            })
        })
        .then(() => {
            return list
        })
}

module.exports = {
    createNewChat, replyMessage, 
    deleteMessage, restoreMessage
};
