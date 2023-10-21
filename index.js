const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})
app.get('/curriculos', db.getCurriculos);
app.get('/curriculos/:id', db.getCurriculoById);
app.post('/curriculos', db.createCurriculo);
app.put('/curriculos/:id', db.updateCurriculo);
app.delete('/curriculos/:id', db.deleteCurriculo);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})


