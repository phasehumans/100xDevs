//  start writing your code from here
const {Router} = require('express')
const todoRouter = Router()
const {authMiddleware} = require('../middleware/user')
const { TodoModel } = require('../db')

todoRouter.post('/', authMiddleware, async(req, res) => {
    const userId = req.userId
    const done = false
    const {title , descrption} = req.body

    if(!title || !descrption){
        res.json({
            message : "title and descrption is required"
        })
        return
    }

    const todoCreated = await TodoModel.create({
        title : title,
        description : descrption,
        done : done,
        createdBy : userId
    })

    if(todoCreated){
        res.json({
            message : "todo is created",
            todo : todoCreated
        })
    }else{
        res.json({
            message : "todo is not created"
        })
    }
})

todoRouter.put('/', authMiddleware, async(req, res) => {
    const userId = req.userId
    const todoId = req.body.todoId
    const {title, description , done} = req.body

    await TodoModel.updateOne({
        createdBy : userId,
        _id : todoId
    },{
        title : title,
        description : description,
        done : done
    })
})

todoRouter.delete('/:id', authMiddleware, async(req, res) => {
    const userId = req.userId
    const todoId = req.params.id

    if(!todoId){
        res.json({
            message : "todoid is required in params"
        })
    }

    const deletedTodo = await TodoModel.deleteOne({
        createdBy : userId,
        _id : todoId
    })

    if(deletedTodo){
        res.json({
            message : "todo is deleted"
        })
    }else{
        message : "error occur while deleting todo"
    }
})


module.exports = {
    todoRouter : todoRouter
}