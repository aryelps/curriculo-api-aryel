const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries.js');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Redirecionamento para /curriculos quando acessar a raiz
app.get('/', (request, response) => {
    response.redirect('/curriculos');
});

app.get('/curriculos', db.getCurriculos);
app.get('/curriculos/:id', db.getCurriculoById);
app.post('/curriculos', db.createCurriculo);
app.put('/curriculos/:id', db.updateCurriculo);
app.delete('/curriculos/:id', db.deleteCurriculo);

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
