const router = require('express').Router()
    todoController = require('../controllers/todoController')

router.get('/todo', todoController.getAll);

module.exports = router;
