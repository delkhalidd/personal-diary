const express = require('express')
const cors = require('cors')

const diaryRoutes = require('./routers/diary')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/goats', diaryRoutes)

app.get('/', (req, res) => {
  res.send({
    message: "welcome",
    description: "DIARY API",
    endpoints: [
      "GET    /            200",
      "GET    /goats       200",
      "GET    /goats/:id   200",
      "POST   /goats       201",
      "PATCH  /goats/:id   200",
      "DELETE /goats/:id   204",
    ]
  })
})

app.post('/', (req, res) => {
  res.status(405).send('Not allowed!')
});

module.exports = app
