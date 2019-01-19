class CommentsController{
    constructor(){}

    async index(req,res){
        res.render('Comments');
    }
    async detail(req,res){
        let id = req.query.id;
        res.render('DetailComment',{id:id});
    }
    async newComment(req,res){
        res.render('NewComment');
    }
}
module.exports = CommentsController;