function index(req, res){
    res.render("main/index",{
        titulo: "Professores do IComp",
        mostraTitulo: true,
        professores: [
            {nome: "David Fernandes", sala: 1638},
            {nome: "Horácio Fernandes", sala: 1639},
            {nome: "Edleno Moura", sala: 1636},
            {nome: "Leandro galvão", sala: 1626},
        ]
    });
}


function sobre(req, res){
    const conteudo = 'Página sobre a aplicação';
    res.render('main/sobre',{
        conteudo: conteudo
    });
};

function ui(req, res){
    res.render('main/ui');
}


module.exports = { index, sobre, ui}
