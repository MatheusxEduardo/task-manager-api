const request = require('supertest')
const app = require('../server')
const Task = require('../models/Task')
const mongoose = require('mongoose')

afterAll(async () => {
    await mongoose.connection.close()
  })

beforeEach(async () => {
  await Task.deleteMany()
})

test('Deve criar uma nova tarefa', async () => {
  const response = await request(app)
    .post('/tasks')
    .send({
      title: 'Teste de Tarefa',
      description: 'Descrição de teste',
    })
    .expect(201)

  const task = await Task.findById(response.body._id)
  expect(task).not.toBeNull()
  expect(task.title).toBe('Teste de Tarefa')
})

test('Deve listar todas as tarefas', async () => {
  await new Task({ title: 'Tarefa 1' }).save()
  await new Task({ title: 'Tarefa 2' }).save()

  const response = await request(app).get('/tasks').expect(200)
  expect(response.body.length).toBe(2)
})