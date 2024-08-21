import type { Request, Response, NextFunction } from 'express'
import Project, { IProject } from '../models/Project'

//Lets you add project into Request to use it on createTask - Controller
declare global {
    namespace Express {
        interface Request {
            project: IProject
        }
    }
}

export async function validateProjectExist(req: Request, res: Response, next: NextFunction) {
    try {
        const { projectId } = req.params

        const project = await Project.findById(projectId)

        if (!project) {
            const error = new Error('Project does not exist')
            return res.status(500).json({ error: error.message })
        }
        req.project = project
        next()
    } catch (error) {
        console.log(error)
    }
}
