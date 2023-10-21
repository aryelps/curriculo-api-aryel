const { DatabaseError } = require('pg');

const Pool = require('pg').Pool
const pool = new Pool({
  connectionString: DATABASE,
 })
const getCurriculos = (request, response) => {
    pool.query('SELECT * FROM curriculos ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  }
  
  const getCurriculoById = (request, response) => {
    const id = parseInt(request.params.id);
  
    pool.query('SELECT * FROM curriculos WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  }
  
  const createCurriculo = (request, response) => {
    const { nome, email, experiencia, educacao } = request.body;
  
    pool.query('INSERT INTO curriculos (nome, email, experiencia, educacao) VALUES ($1, $2, $3, $4)', [nome, email, experiencia, educacao], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Currículo adicionado com ID: ${results.insertId}`);
    });
  }
  
  const updateCurriculo = (request, response) => {
    const id = parseInt(request.params.id);
    const { nome, email, experiencia, educacao } = request.body;
  
    pool.query(
      'UPDATE curriculos SET nome = $1, email = $2, experiencia = $3, educacao = $4 WHERE id = $5',
      [nome, email, experiencia, educacao, id],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).send(`Currículo modificado com ID: ${id}`);
      }
    );
  }
  
  const deleteCurriculo = (request, response) => {
    const id = parseInt(request.params.id);
  
    pool.query('DELETE FROM curriculos WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Currículo deletado com ID: ${id}`);
    });
  }
  
  module.exports = {
    getCurriculos,
    getCurriculoById,
    createCurriculo,
    updateCurriculo,
    deleteCurriculo,
  }
  