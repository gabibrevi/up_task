import { Router } from 'express'
import { body, param } from 'express-validator'
import { ProjectController } from '../controllers/ProjectController'
import { handleInputErrors } from '../middleware/validation'

const router = Router()

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

export default router
