var db = require('../firebase')
var utils = require("../utils")

const getAllDogs = () => {
    return db.getAllDocs("dog").then(res => {
        return res
    })
}

const conductAddDog = (data, id) => {
    let dogData = {
        id: id,
        name: data.name,
        gender: data.gender,
        location: data.location,
        seterillsed: data.seterillsed,
        breed: data.breed,
        birthday: data.birthday,
        mircochipNo: data.mircochipNo,
        intake: data.intake,
        description: data.description,
        profileImage: data.profileImage,
        notes: data.notes,
        size: data.size,
        weight: data.weight,
        addedBy: data.addedBy,
    }
    db.addDoc("dog", id, dogData)

    return "done"
}

const addDog = (data) => {
    db.getDoc("token", data.token).then((res) => {
        if (res !== null) {
            console.log("ok")
            let id = utils.randomNumbers(5)
            return conductAddDog(data, id)
        } else {
            console.log("invalid token")
            return "invalid token"
        }
    })
}

const conductRemoveDog = (data) => {
    let id = `${data.id}`
    db.removeDoc("dog", id)
    return "removed"
}

const removeDog = (data) => {
    db.getDoc("token", data.token).then((res) => {
        if (res !== null) {
            console.log("ok")
            return conductRemoveDog(data)
        } else {
            console.log("invalid token")
            return "invalid token"
        }
    })
}

const conductUpdateDog = (data) => {
    conductRemoveDog(data)
    conductAddDog(data, `${data.id}`)

    return "done"

}

const updateDog = (data) => {
    db.getDoc("token", data.token).then((res) => {
        if (res !== null) {
            console.log("ok")
            conductUpdateDog(data)
            return ''
        } else {
            console.log("invalid token")
            return "invalid token"
        }
    })
}


module.exports = {
    getAllDogs, addDog, removeDog,
    updateDog
};
