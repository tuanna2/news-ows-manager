const BaseRouter = require('./base_router');
const NewsController = require('../controllers/news_ctrl');
const CategoryController = require('../controllers/category_ctrl');
const CommentsController = require('../controllers/comments_ctrl');
const MemberController = require('../controllers/member_ctrl');
const UserController = require('../controllers/user_ctrl');

class RootRouter extends BaseRouter{
    constructor() {
        super();
    }
    config() {
        const newsCtrl = new NewsController();
        const categoryCtrl = new CategoryController();
        const commentCtrl = new CommentsController();
        const memberCtrl = new MemberController();
        const userCtrl = new UserController();

        this.addRouter('GET', '/',userCtrl.auth, newsCtrl.home);
        this.addRouter('GET','/login',userCtrl.isAuth,userCtrl.login);
        this.addRouter('GET','/signup',userCtrl.isAuth,userCtrl.signup);
        this.addRouter('GET','/logout',userCtrl.logout,userCtrl.return);
        this.addRouter('GET', '/news',userCtrl.auth, newsCtrl.index);
        this.addRouter('GET', '/news/detail',userCtrl.auth, newsCtrl.detail);
        this.addRouter('GET', '/news/new',userCtrl.auth, newsCtrl.newPost);
        this.addRouter('GET', '/category',userCtrl.isAdmin, categoryCtrl.index);
        this.addRouter('GET', '/category/detail',userCtrl.isAdmin, categoryCtrl.detail);
        this.addRouter('GET', '/category/new',userCtrl.isAdmin, categoryCtrl.newCategory);
        this.addRouter('GET', '/comments',userCtrl.isAdmin, commentCtrl.index);
        this.addRouter('GET', '/comments/detail',userCtrl.isAdmin, commentCtrl.detail);
        this.addRouter('GET', '/comments/new',userCtrl.isAdmin, commentCtrl.newComment);
        this.addRouter('GET', '/members',userCtrl.isAdmin, memberCtrl.index);
        this.addRouter('GET', '/members/detail',userCtrl.isAdmin, memberCtrl.detail);
    }
}
module.exports = RootRouter;