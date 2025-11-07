let todos = []; // in memory space
let count = 0;

export async function getAllTodo (req, res){
    //  write here
    res.json({
        todos : todos
    })

}

export async function createTodo (req, res){
    //  write here
    const {todo} = req.body

    const task = {
        task: todo,
        id : count++
    }

    todos.push(task)
    
    res.json({
        message : "new task added",
        task : task
    })
}

export async function updateTodo (req, res){
    //  write here

    const todoId = req.params.id
    const {todo} = req.body.todo

    const task = todos.find(count == todoId)

    task.task = task

    res.json({
        message : "task is updated"
    })


}

export async function deleteTodo (req, res){
    //  write here
    const todoId = req.params

    

}

export async function deleteTodoById (req, res){
    //  write here
}