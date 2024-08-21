import { Router } from 'express'
import { body, param } from 'express-validator'
import { ProjectController } from '../controllers/ProjectController'
import { handleInputErrors } from '../middleware/validation'
import { TaskController } from '../controllers/TaskController'
import { validateProjectExist } from '../middleware/project'

const router = Router()

/* PROJECTS */
router.post(
    '/',
    body('projectName').notEmpty().withMessage('Do not forget the project name!'),
    body('clientName').notEmpty().withMessage('Who is the client?'),
    body('description').notEmpty().withMessage('Tell me more about it!'),
    handleInputErrors,
    ProjectController.createProject
)
router.get('/', ProjectController.getAllProject)
router.get(
    '/:id',
    param('id').isMongoId().withMessage('ID not valid'),
    handleInputErrors,
    ProjectController.getProjectById
)
router.put(
    '/:id',
    param('id').isMongoId().withMessage('ID not valid'),
    body('projectName').notEmpty().withMessage('Do not forget the project name!'),
    body('clientName').notEmpty().withMessage('Who is the client?'),
    body('description').notEmpty().withMessage('Tell me more about it!'),
    handleInputErrors,
    ProjectController.updateProject
)

router.delete(
    '/:id',
    param('id').isMongoId().withMessage('ID not valid'),
    handleInputErrors,
    ProjectController.deleteProject
)

/* TASK */
router.post(
    '/:projectId/task',
    validateProjectExist,
    body('name').notEmpty().withMessage('Do not forget the task name!'),
    body('description').notEmpty().withMessage('Do not forget the task description! '),
    TaskController.createTask
)

router.get('/:projectId/tasks', TaskController.getAllTasks)
router.get('/:projectId/taskId', TaskController.getTaskById)
router.put('/:projectId/taskId', TaskController.updateTask)
router.delete('/:projectId/taskId', TaskController.deleteTask)

export default router
