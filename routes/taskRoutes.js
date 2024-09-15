const express = require('express');
const { createTask, getAllTasks, getTaskId, deleteTask,updateTask,getTaskByUser, getTaskByCategory,getAlltask } = require('../controllers/taskController');

const router = express.Router();

// Crear una nueva tarea
router.post('/', createTask);

// Obtener todas las tareas
router.get('/', getAllTasks);

// Obtener una tarea por ID
router.get('/:id', getTaskId);

router.put('/:id', updateTask);

// Eliminar una tarea por ID
router.delete('/:id', deleteTask);

//Filtar task por usurio 
router.get('/user/:userId', getTaskByUser);

router.get('/category/:categoryId', getTaskByCategory)

router.get('/task/tasks', getAlltask);


module.exports = router;
