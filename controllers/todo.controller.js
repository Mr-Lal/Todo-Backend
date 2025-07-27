import {addTodoService, deleteManyTodosService, deleteTodoService, GetTodoByidService, GetTodoService, updateTodoService} from "../services/todo.service.js";

export const addTodo=async(req,res)=>{
    try {
        const {title,description}=req.body;

        const userId=req.user._id;
const newTodo=await addTodoService({title,description,userId});
        res.status(201).json({message: 'Todo added successfully', todo: newTodo});


    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'})
        
    }
}

export const deleteTodo=async(req,res)=>{
    try {
       const {id}=req.params;
       const deletedTodo=await deleteTodoService(id);
       
       res.status(200).json({message: 'Todo deleted successfully', todo: deletedTodo});
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'})
        console.log(error);
        
        
    }
}
export const updateTodo=async(req,res)=>{
    try {
        const {id}=req.params;
        const updateData=req.body;
        const updatedTodo=await updateTodoService(id,updateData);
        res.status(200).json({message: 'Todo updated successfully', todo: updatedTodo});
    } catch (error) {
        
        res.status(500).json({message: 'Internal Server Error'})
        console.log(error);
    }
}

export const deleteManyTodos=async(req,res)=>{
    try {

        const {ids}=req.body; 
        const deletedTodos=await deleteManyTodosService(ids);
        res.status(200).json({message: 'Todos deleted successfully', todos: deletedTodos});
        
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'})
        console.log(error);
        
    }
}

export const completedTodo=async(req,res)=>{
    try {
        const {id} = req.params;
      
   
        const updatedTodo = await updateTodoService(id, { isCompleted: true });
        res.status(200).json({ message: 'Todo marked as completed', todo: updatedTodo });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
        console.log(error);
    }
}
export const GetTodos =async(req,res)=>{
    try {

        const userId=req.user._id

        const todos= await GetTodoService({userId})
        res.status(200).json({msg:'get data successful',todos})
        
    } catch (error) {
        res.status(500).send(error)
    }
}

export const GetTodoByid=async(req,res)=>{
    try {
        const id=req.params.id
        

        const todo=await GetTodoByidService({id})
        res.status(200).json({msg:'get todo successful',todo})
    } catch (error) {
        res.status(500).json({msg:'error on get todo',error})
    }
}