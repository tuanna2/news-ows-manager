class NewsController{
    constructor(){}

    async index(req,res){
        res.render('News');
    }
    async home(req,res){
        res.redirect('/news');
    }
    async detail(req,res){
        let id = req.query.id;
        res.render('DetailPost',{id:id});
    }
    async newPost(req,res){
        res.render('NewPost');
    }
}
module.exports = NewsController;