import mongoose from "mongoose";
import Todo from "../models/todo.model.js";

export const addTodoService= async({title,description,userId})=>{
    try {
       
        const newTodo=await Todo.create({
            title,
            description,
            userId
        })
        
global.io.emit("addTodo",newTodo)
        return newTodo
    } catch (error) {
        console.error("Error in TodoService:", error);
        throw new Error("Failed to process Todo request");
    }
}

export const deleteTodoService=async(id)=>{
    try {
      
        const deletedTodo=await Todo.findByIdAndDelete(id);
    
        return deletedTodo;
    } catch (error) {
        console.error("Error in TodoService:", error);
        throw new Error("Failed to process Todo deletion request");
        
    }
}

export const updateTodoService=async(id,updateData)=>{
    try {
        const updatedTodo=await Todo.findByIdAndUpdate(id,{
            ...updateData
        },{new: true}); 
        if (!updatedTodo) {
            throw new Error("Todo not found");
        }
        return updatedTodo;
        
    } catch (error) {
        console.error("Error in TodoService:", error);
        throw new Error("Failed to process Todo update request");
        
    }
}

export const deleteManyTodosService=async(ids)=>{
    try {
        const deletedTodos=await Todo.deleteMany({_id: {$in: ids}});
        if (deletedTodos.deletedCount === 0) {
            throw new Error("No Todos found to delete");
        }
        return deletedTodos;
        
    } catch (error) {
        console.error("Error in TodoService:", error);
        throw new Error("Failed to process bulk Todo deletion request");
        
    }
}

export const completedTodoService=async(id)=>{
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(id, { isCompleted: true }, { new: true });
        if (!updatedTodo) {
            throw new Error("Todo not found");
        }
        return updatedTodo;
    } catch (error) {
        console.error("Error in TodoService:", error);
        throw new Error("Failed to mark Todo as completed");
        
    }
}

export const GetTodoService = async ({ userId }) => {
  try {

    const todos=await Todo.find({userId})
    return todos;

  } catch (error) {
    console.log('Error in GetTodoService:', error.message);
    throw error;
  }
};

export const GetTodoByidService=async({id})=>{
    try {
        const todo=await Todo.findById({_id:id})
        if(!todo){
            console.log('todo not found');
            
        }
        return todo
    } catch (error) {
        console.log(error);
        
    }
}
