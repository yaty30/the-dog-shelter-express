var express = require('express');
var router = express.Router();
var database = require('../firebase')
var cors = require('cors');
var register = require('./register')
var login = require('./login')
var dog = require('./dog')
var chat = require('./chat')
var worker = require('./worker')
var utils = require('../utils')

router.use(cors());
router.use(express.json({ limit: '1024mb' }));
router.use(express.urlencoded({ limit: '1024mb' }));

router.get('/all', (req, res) => {
  // database.addDoc("account", "test", {name: "test", country: "test", date: "now"})
  // database.removeDoc("account", "test")
  // database.getDoc("account", "tsaest").then(x =>
  //   res.send(x)  
  // )
  // database.getAllDocs().then((x) => 
  //   res.send(x)
  // )
});

router.post('/register', (req, res) => {
  register.register(req.body).then(r => {
    res.send("")
    return r
  })
})

router.post('/add', (req, res) => {
  database.addDoc("account", "test", { name: "test", country: "test", date: "now" })
  res.send(data)
})

router.post('/login', (req, res) => {
  return login.login(req.body).then((x) => {
    res.send(x)
    return utils.res(res.statusCode, x)
  })
})

router.get('/dog/getAllDogs', (req, res) => {
  let result = []

  return dog.getAllDogs().then((x) => {
    res.send(JSON.stringify(x))
    return utils.res(res.statusCode, x)
  })
})

router.post('/dog/addDog', (req, res) => {
  let result = dog.addDog(req.body)
  res.send(result)
  return utils.res(res.statusCode, result)
})

router.post('/dog/addDogImage', (req, res) => {
  return dog.addDogImage(req.body)
    .then((x) => {
      res.send(x)
      return utils.res(res.statusCode, x)
    })
})

router.post('/dog/removeDog', (req, res) => {
  let result = dog.removeDog(req.body)
  res.send(result)
  return utils.res(res.statusCode, result)
})

router.post('/dog/updateDog', (req, res) => {
  let result = dog.updateDog(req.body)
  res.send(result)
  return utils.res(res.statusCode, result)
})

router.post('/dog/favouriteList/add', (req, res) => {
  return dog.addFavourite(req.body).then((x) => {
    res.send(JSON.stringify(x))
    return utils.res(res.statusCode, x)
  })
})

router.post('/dog/favouriteList/remove', (req, res) => {
  return dog.removeFavourite(req.body).then((x) => {
    res.send(x)
    return utils.res(res.statusCode, x)
  })
})

router.post('/dog/favouriteList/getList', (req, res) => {
  return dog.getFavouriteList(req.body).then((x) => {
    res.send("")
    return utils.res(res.statusCode, x)
  })
})

router.get('/dog/favouriteList/getList', (req, res) => {
  let id = `${req.query.id}`
  return dog.getFavouriteList(id).then((x) => {
    res.send(JSON.stringify(x))
    return utils.res(res.statusCode, x)
  })
})

router.post('/chat/createNewChat', (req, res) => {
  console.log(req.body)
  return chat.createNewChat(req.body)
    .then((x) => {
      res.send(JSON.stringify(x))
      return x
    })
})

router.post('/chat/replyMessage', (req, res) => {
  return chat.replyMessage(req.body)
    .then((x) => {
      res.send(JSON.stringify(x))
      return x
    })
})

router.post('/chat/deleteMessage', (req, res) => {
  return chat.deleteMessage(req.body)
    .then((x) => {
      res.send(JSON.stringify(x))
      return x
    })
})

router.get('/chat/restoreMessage', (req, res) => {
  return chat.restoreMessage(req.query.userID)
    .then((x) => {
      res.send(JSON.stringify(x))
      return x
    })
})

router.post('/contact/sendMessage', (req, res) => {
  res.send(JSON.stringify(req.body))
  return req.body
})


module.exports = router;
