var express = require('express');
var router = express.Router();
var database = require('../firebase')
var register = require('./register')
var login = require('./login')
var dog = require('./dog')

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
  let result = register.register(req.body)
  res.send(result)

  return result
})

router.post('/add', (req, res) => {
  database.addDoc("account", "test", { name: "test", country: "test", date: "now" })
  res.send(data)
})

router.post('/login', (req, res) => {
  let result = login.login(req.body)
  res.send(result)
  return result
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



module.exports = router;
