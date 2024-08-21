import type { Request, Response } from 'express'
import colors from 'colors'
import Task from '../models/Task'

export class TaskController {
    static createTask = async (req: Request, res: Response) => {
        try {
            const task = new Task(req.body)
            task.project = req.project.id
            req.project.task.push(task.id)

            await Promise.allSettled([task.save(), req.project.save()])

            res.send('Task created successfully')
        } catch (error) {
            console.log(error)
        }
    }
    static getAllTasks = (req: Request, res: Response) => {}
    static getTaskById = (req: Request, res: Response) => {}
    static updateTask = (req: Request, res: Response) => {}
    static deleteTask = (req: Request, res: Response) => {}
}
