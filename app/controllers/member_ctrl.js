class MemberController{
    constructor(){}
    
    async index(req,res){
        res.render('Member');
    }
    async detail(req,res){
        let id = req.query.id;
        res.render('DetailMember',{id:id});
    }
}
module.exports = MemberController;