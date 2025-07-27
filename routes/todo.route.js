import express from 'express'
import {addTodo,updateTodo, deleteTodo,deleteManyTodos,completedTodo,GetTodos,GetTodoByid} from '../controllers/todo.controller.js'
import { verifyUser } from '../middlewares/user.middleware.js'

const router=express.Router()



router.post('/add',verifyUser,addTodo)
router.delete('/delete/:id',verifyUser,deleteTodo)
router.put('/update/:id',verifyUser,updateTodo)
router.post('/delete-many',verifyUser,deleteManyTodos) 
router.put('/:id/complete',completedTodo);
router.get('/get',verifyUser,GetTodos)
router.get('/spacific/:id',verifyUser,GetTodoByid)



export default router;