const express = require('express')
const mongoose = require('mongoose')
const taskRouter = require('./routes/taskRoutes')
const userRouter = require('./routes/userRoutes')
const errorHandler = require('./middleware/errorHandler')

const app = express()
const port = process.env.POR || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
app.use(errorHandler)


mongoose.connect('mongodb://localhost:27017/taskmanager', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  
  if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }

  module.exports = app;
