const {Router} = require('express')
const db = require('../db/queries.js')
const indexControllers = require('../controllers/indexControllers.js')
const indexRouter = Router();
indexRouter.get("/", indexControllers.displayList)
indexRouter.get("/anime/:id", indexControllers.displayAnime)
indexRouter.get("/search", indexControllers.getSearch)
indexRouter.post('/anime/:id', indexControllers.postAnime)
module.exports = indexRouter;