class CategoryController{
    constructor(){}
    
    async index(req,res){
        res.render('Category');
    }
    async detail(req,res){
        let id = req.query.id;
        res.render('DetailCategory',{id:id});
    }
    async newCategory(req,res){
        res.render('NewCategory');
    }
}
module.exports = CategoryController;