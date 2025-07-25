const express = require('express')
const cors = require('cors')

const diaryRoutes = require('./routes/diary')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/diary', diaryRoutes)

app.get('/', (req, res) => {
  res.send({
    message: "welcome",
    description: "DIARY API",
    endpoints: [
      "GET    /            200",
      "GET    /diary       200",
      "GET    /diary/:id   200",
      "POST   /diary       201",
      "PATCH  /diary/:id   200",
      "DELETE /diary/:id   204",
    ]
  })
})

app.post('/', (req, res) => {
  res.status(405).send('Not allowed!')
});

module.exports = app
