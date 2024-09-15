const { Op } = require('sequelize');
const Task = require('../models/Task'); // Ajusta la ruta según tu estructura de proyecto

// Crear una nueva tarea
const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todas las tareas
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener una tarea por ID
const getTaskId = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).json({ message: 'Tarea no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar una tarea por ID
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (task) {
            await task.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Tarea no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar una tarea por ID
const updateTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (task) {
            await task.update(req.body);
            res.status(200).json(task);
        } else {
            res.status(404).json({ message: 'Tarea no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener tareas por ID de usuario
const getTaskByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { page = 1, limit = 10 } = req.query;

        const offset = (page - 1) * limit;

        const tasks = await Task.findAndCountAll({
            where: { user_id: userId },
            limit: parseInt(limit, 10),
            offset: parseInt(offset, 10),
        });

        res.status(200).json({
            tasks: tasks.rows,
            totalTasks: tasks.count,
            totalPages: Math.ceil(tasks.count / limit),
            currentPage: parseInt(page, 10)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener tareas por ID de categoría
const getTaskByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { page = 1, limit = 10 } = req.query;

        const offset = (page - 1) * limit;

        const tasks = await Task.findAndCountAll({
            where: { category_id: categoryId },
            limit: parseInt(limit, 10),
            offset: parseInt(offset, 10),
        });

        res.status(200).json({
            tasks: tasks.rows,
            totalTasks: tasks.count,
            totalPages: Math.ceil(tasks.count / limit),
            currentPage: parseInt(page, 10)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




const getAlltask = async (req, res) => {
    try {
        const { id, title, UserId, CategoryId } = req.query; 
        const whereConditions = {};
  
        if (id) {
            whereConditions.id = {
                [Op.iLike]: `%${id}%`  
            };
        }
        if (title) {
            whereConditions.title = {
                [Op.iLike]: `%${title}%`
            };
        }
  

        if (UserId) {
            whereConditions.UserId = parseInt(UserId, 10);
        }
  
        if (CategoryId) {
            whereConditions.CategoryId = parseInt(CategoryId, 10); 
        }
  
        const tasks = await Task.findAll({
            where: whereConditions,
            attributes: ['title', 'description', 'createdAt', 'UserId', 'CategoryId']  
        });
  

        if (tasks.length > 0) {
            res.status(200).json(tasks);
        } else {
            res.status(404).json({ message: 'No se encontraron tareas' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };

module.exports = {
    createTask,
    getTaskByUser,
    getTaskByCategory,
    getAllTasks,
    getTaskId,
    deleteTask,
    updateTask,
    getAlltask
};
