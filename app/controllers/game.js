function index(req, res){
    res.render('main/game');
};
function over(req, res){
    res.render('main/game_over');
};
module.exports = { index, over }
