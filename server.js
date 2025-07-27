import app from "./app.js";
import http from "http";
import { Server } from 'socket.io'
import { deleteTodoService, updateTodoService } from "./services/todo.service.js";


const server=http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

io.on('connection', (socket) => {
  console.log('User connected: ', socket.id)

  socket.on("deleteTodo", async(id) => {
    const data=await deleteTodoService(id)
 io.emit("todoDeleted", data._id); 
  });

socket.on('updatedTodo', async (updateData) => {
  try {
    const { id } = updateData;
    const finalData = await updateTodoService(id, updateData);

    io.emit('updatedTodo', finalData); 
    
  } catch (error) {
    console.error("Error updating todo:", error);
    socket.emit('errorTodoUpdate', { message: 'Failed to update todo' });
  }
});

socket.on('profileInfo',(info)=>{
  console.log(info);
  
})
global.io=io
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})


const PORT=process.env.PORT || 3000;
server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    
})

