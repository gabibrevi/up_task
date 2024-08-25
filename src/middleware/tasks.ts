import type { Request, Response, NextFunction } from 'express'
import Task, { ITask } from '../models/Task'

//Lets you add task into Request to use it on Controller
declare global {
    namespace Express {
        interface Request {
            task: ITask
        }
    }
}

export async function taskExist(req: Request, res: Response, next: NextFunction) {
    try {
        const { taskId } = req.params

        if (taskId.length === 24) {
            const task = await Task.findById(taskId)

            if (!task) {
                const error = new Error('Task does not exist')
                return res.status(500).json({ error: error.message })
            }
            req.task = task
            next()
        } else {
            res.send('ID not valid, it must be a Object Mongo ID - 24 Characters')
        }
    } catch (error) {
        console.log(error.reason)
    }
}

export async function taskBelongToProject(req: Request, res: Response, next: NextFunction) {
    try {
        if (req.task.project.toString() !== req.project.id.toString()) {
            return res.status(400).json('Action no valid')
        }
        next()
    } catch (error) {
        console.log(error)
    }
}
