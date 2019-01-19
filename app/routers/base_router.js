const express = require('express');
class BaseRouter {
    constructor() {
        this.router = express.Router();
        this.config();
    }

    config() {}

    getRouter() {
        return this.router;
    }
    addRouter(method, path, mw, ctrl) {
        switch (method) {
            case 'GET': 
                this.addGetRouter(path, mw, ctrl);
                break;
            case 'POST': 
                this.addPostRouter(path, mw, ctrl);
                break;
            case 'PUT': 
                this.addPutRouter(path, mw, ctrl);
                break;
            case 'DELETE': 
                this.addDeleteRouter(path, mw, ctrl);
                break;
        }
    }
    addGetRouter(path, mw, ctrl){
        this.router.get(path, mw, ctrl);
    }
    addPostRouter(path, mw, ctrl){
        this.router.post(path, mw, ctrl);
    }
    addPutRouter(path, mw, ctrl){
        this.router.put(path, mw, ctrl);
    }
    addDeleteRouter(path, mw, ctrl){
        this.router.delete(path, mw, ctrl);
    }    
}

module.exports = BaseRouter;