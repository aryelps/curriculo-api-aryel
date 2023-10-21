const { createClient } = require('@supabase/supabase-js');

// Conexão com o Supabase
const supabaseUrl = "https://jhsfawoupzdprqbkqptr.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impoc2Zhd291cHpkcHJxYmtxcHRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc4OTg5NTIsImV4cCI6MjAxMzQ3NDk1Mn0.H6LbkcFq2DmHMD4xIryGDL8T_wIk236NCXQFeArwWbs"; // Insira sua chave aqui
const supabase = createClient(supabaseUrl, supabaseKey);

const getCurriculos = async (request, response) => {
    let { data, error } = await supabase.from('curriculo-aryel').select('*');
    if (error) throw error;
    response.status(200).json(data);
}

const getCurriculoById = async (request, response) => {
    const id = parseInt(request.params.id);
    let { data, error } = await supabase.from('curriculo-aryel').select('*').eq('id', id);
    if (error) throw error;
    response.status(200).json(data);
}

const createCurriculo = async (request, response) => {
    const { nome, email, experiencia, educacao } = request.body;
    let { data, error } = await supabase.from('curriculo-aryel').insert([{ nome, email, experiencia, educacao }]);
    if (error) throw error;
    response.status(201).json(data);
}

const updateCurriculo = async (request, response) => {
    const id = parseInt(request.params.id);
    const { nome, email, experiencia, educacao } = request.body;
    let { data, error } = await supabase.from('curriculo-aryel').update({ nome, email, experiencia, educacao }).eq('id', id);
    if (error) throw error;
    response.status(200).json(data);
}

const deleteCurriculo = async (request, response) => {
    const id = parseInt(request.params.id);
    let { data, error } = await supabase.from('curriculo-aryel').delete().eq('id', id);
    if (error) throw error;
    response.status(200).json(data);
}

module.exports = {
    getCurriculos,
    getCurriculoById,
    createCurriculo,
    updateCurriculo,
    deleteCurriculo,
}
