import { Router } from 'express'
import { body, param } from 'express-validator'
import { ProjectController } from '../controllers/ProjectController'
import { TaskController } from '../controllers/TaskController'
import { handleInputErrors } from '../middleware/validation'
import { projectExist } from '../middleware/project'
import { taskBelongToProject, taskExist } from '../middleware/tasks'

const router = Router()

/************ PROJECTS ***************/

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

/************ TASKS ***************/

//Middleware validations
router.param('projectId', projectExist)
router.param('taskId', taskExist)
router.param('taskId', taskBelongToProject)

router.post(
    '/:projectId/tasks',
    body('name').notEmpty().withMessage('Do not forget the task name!'),
    body('description').notEmpty().withMessage('Do not forget the task description! '),
    handleInputErrors,
    TaskController.createTask
)

router.get('/:projectId/tasks', TaskController.getProjectTasks)

router.get(
    '/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('Task ID not valid'),
    handleInputErrors,
    TaskController.getTaskById
)

router.put(
    '/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('Task ID not valid'),
    body('name').notEmpty().withMessage('Do not forget the task name!'),
    body('description').notEmpty().withMessage('Do not forget the task description! '),
    handleInputErrors,
    TaskController.updateTask
)
router.delete(
    '/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('Task ID not valid'),
    handleInputErrors,
    TaskController.deleteTask
)

router.post(
    '/:projectId/tasks/:taskId/status',
    param('taskId').isMongoId().withMessage('Task ID not valid'),
    body('status').notEmpty().withMessage('Do not forget to asing status!'),
    handleInputErrors,
    TaskController.updateStatus
)

export default router
