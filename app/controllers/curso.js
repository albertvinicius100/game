const models = require("../models/index");
const Curso = models.Curso;

async function index(req,res){}
async function create(req,res){
    res.render("curso/create");
}
async function read(req,res){}
async function update(req,res){}
async function remove(req,res){}


module.exports = {index, create, read, update, remove}
