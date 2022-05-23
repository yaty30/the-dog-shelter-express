var express = require('express');
var router = express.Router();
var database = require('../firebase')
var cors = require('cors');
var register = require('./register')
var login = require('./login')
var dog = require('./dog')

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
    return x
  })
})


router.get('/dog/getAllDogs', (req, res) => {
  let result = []

  return dog.getAllDogs().then((x) => {
    res.send(JSON.stringify(x))
    x.map((info, i) =>
      result.push(info)
    )
    return x
  })
})

router.post('/dog/addDog', (req, res) => {
  let result = dog.addDog(req.body)
  res.send(result)
  return result
})

router.post('/dog/addDogImage', (req, res) => {
  return dog.addDogImage(req.body)
    .then((x) => {
      res.send(x)
      return x
    })
})

router.post('/dog/removeDog', (req, res) => {
  let result = dog.removeDog(req.body)
  res.send(result)
  return result
})

router.post('/dog/updateDog', (req, res) => {
  let result = dog.updateDog(req.body)
  res.send(result)
  return result
})

router.post('/dog/favouriteList/add', (req, res) => {
  return dog.addFavourite(req.body).then((x) => {
    res.send(x)
    return x
  })
})

router.post('/dog/favouriteList/remove', (req, res) => {
  return dog.removeFavourite(req.body).then((x) => {
    res.send(x)
    return x
  })
})

router.post('/dog/favouriteList/getList', (req, res) => {
  return dog.getFavouriteList(req.body).then((x) => {
    res.send("")
    return x
  })
})


module.exports = router;
