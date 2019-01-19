class UserController{
    constructor(){}

    async login(req,res){
        res.render('Login');
    }
    async signup(req,res){
        res.render('Signup');
    }
    async auth(req,res,next){
        if(req.cookies.username===undefined || req.cookies.token===undefined){
            res.redirect('/login');
        }
        else return next();
    }
    async isAuth(req,res,next){
        if(req.cookies.username!==undefined || req.cookies.username!==undefined){
            res.redirect('/');
        }
        else return next();
    }
    async logout(req,res,next){
        res.clearCookie("token",{ path: '/' });
        res.clearCookie("username",{ path: '/' });
        return next();
    }
    async return(req,res){
        res.redirect('/login');
    }
    async isAdmin(req,res,next){
        if(req.cookies.username=="admin" && req.cookies.token!==undefined){
            return next();
        }
        res.redirect('/');
    }
}
module.exports = UserController;