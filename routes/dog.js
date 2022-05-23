var db = require('../firebase')
var utils = require("../utils")

const getAllDogs = () => {
    return db.getAllDocs("dog").then(res => {
        return res
    })
}

const conductAddDog = (data, id) => {
    let dogData = {
        id: +id,
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
    db.addDoc("dog", `${id}`, dogData)

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

const addDogImage = (data) => {
    db.getDoc("token", data.token).then((res) => {
        if (res !== null) {
            console.log("ok")
            let id = utils.randomNumbers(5)
            db.addDoc("dogImage", `${data.id}`, { src: data.image })
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

const getFavouriteList = (data) => {
    let id = data.id
    let list = []
    return db.getDoc("favouriteList", `${id}`)
        .then(x => {
            x.list.map(xi => list.push(+xi))
        })
        .then(re => {
            return list
        })
}

const addFavourite = (data) => {
    let id = data.id
    let newFavouriteID = data.newFavouriteID
    let list = []
    return db.getDoc("favouriteList", id)
        .then(x => {
            x.list.map(y => list.push(y))
        }).then(_ => {
            if (list.filter(f => f === newFavouriteID).length === 0) {
                list.push(newFavouriteID)
                db.addDoc("favouriteList", id, { list: list })
                return list
            } else {
                return "target already exist in the favourite list"
            }
        })
}

const removeFavourite = (data) => {
    let id = data.id
    let targetID = data.targetID
    let list = []
    return db.getDoc("favouriteList", id)
        .then(x => {
            x.list.map(y =>
                y !== targetID && list.push(y)
            )
        })
        .then(_ => {
            return db.addDoc("favouriteList", id, { list: list })
                .then((d) => {
                    return list
                })
        })
}

module.exports = {
    getAllDogs, addDog, removeDog,
    updateDog, addFavourite, removeFavourite,
    addDogImage, getFavouriteList
};
