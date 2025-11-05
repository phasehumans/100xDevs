const { Router } = require("express");
const userMiddleware = require("../middleware/user");
const { Todo } = require("../database");
const router = Router();

// todo Routes
router.post('/', userMiddleware, async(req, res) => {
    // Implement todo creation logic
    const userId = req.userId
    const title = req.body.title
    const description  = req.body.description
    const done = false

    if(!title || !description){
        res.json({
            message : "all fields are required"
        })
        return
    }

    await Todo.create({
        title : title,
        description : description,
        done : done,
        createdby : userId
    })

    res.json({
        message : "task created"
    })
});

router.put('/', userMiddleware, async(req, res) => {
    // Implement update todo  logic
    const userId = req.userId;
    const todoId = req.body.todoId
    const title = req.body.title;
    const description = req.body.description;
    const done = req.body.done

    await Todo.updateOne(
      {
        createdby: userId,
        _id: todoId,
      },
      {
        $set: { title, description, done },
      }
    );

    res.json({
        message : "todo updated"
    })

});

router.delete('/', userMiddleware, (req, res) => {
    // Implement delete todo logic
    const userId = req.userId

    Todo.deleteMany({
        createdby : userId
    })

    res.json({
        message : "all todos are deleted"
    })
});

router.delete('/:id', userMiddleware, async(req, res) => {
    // Implement delete todo by id logic
    const todoId = req.body.todoId
    const userId = req.userId

    await Todo.deleteOne({
        _id : todoId,
        createdby : userId
    })

    res.json({
        message : "todo is deleted"
    })

});


router.get('/', userMiddleware, async(req, res) => {
    // Implement fetching all todo logic
    const userId = req.userId
    const todos = await Todo.find({
        createdby : userId
    })

    res.json({
        todos : todos
    })

});

router.get('/:id', userMiddleware, async(req, res) => {
    // Implement fetching todo by id logic

    const userId = req.userId
    const todoId = req.body.todoId

    const todo = await Todo.findOne({
        createdby : userId,
        _id : todoId
    })

    res.json({
        todo : todo
    })
});

module.exports = router;