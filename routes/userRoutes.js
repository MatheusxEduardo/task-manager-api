const express = require('express')
const User = require('../models/User')
const router = new express.Router()

// Registrar um novo usuário
router.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (e) {
    res.status(400).send(e)
  }
})

// Login de usuário
router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (e) {
    res.status(400).send()
  }
});

module.exports = router