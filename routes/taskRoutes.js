const express = require('express')
const Task = require('../models/Task')
const router = new express.Router()

// Criar uma nova tarefa
router.post('/tasks', async (req, res, next) => {
  const task = new Task(req.body)
  try {
    await task.save()
    res.status(201).send(task)
  } catch (e) {
    next(e)
  }
})

// Ler todas as tarefas
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks)
  } catch (e) {
    res.status(500).send()
  }
})

// Ler uma tarefa por ID
router.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id
  try {
    const task = await Task.findById(_id)
    if (!task) {
      return res.status(404).send()
    }
    res.send(task)
  } catch (e) {
    res.status(500).send()
  }
})

// Atualizar uma tarefa
router.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['title', 'description', 'completed']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
    const task = await Task.findById(req.params.id)
    updates.forEach((update) => (task[update] = req.body[update]))
    await task.save()

    if (!task) {
      return res.status(404).send()
    }
    res.send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

// Deletar uma tarefa
router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)
    if (!task) {
      return res.status(404).send()
    }
    res.send(task)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router