import type { Request, Response } from 'express'
import Task from '../models/Task'

export class TaskController {
    static createTask = async (req: Request, res: Response) => {
        try {
            const task = new Task(req.body)
            task.project = req.project.id
            req.project.tasks.push(task.id)

            await Promise.allSettled([task.save(), req.project.save()])

            res.send('Task created successfully')
        } catch (error) {
            return res.status(500).json({ error: 'Error found' })
        }
    }
    static getProjectTasks = async (req: Request, res: Response) => {
        try {
            const tasks = await Task.find({ project: req.project.id }).populate('project')
            if (!tasks) {
                return res.status(404).json('No task created so far')
            }
            res.json(tasks)
        } catch (error) {
            return res.status(500).json({ error: 'Error found' })
        }
    }

    static getTaskById = async (req: Request, res: Response) => {
        try {
            res.json(req.task)
        } catch (error) {
            return res.status(500).json({ error: 'Error found' })
        }
    }

    static updateTask = async (req: Request, res: Response) => {
        try {
            req.task.name = req.body.name
            req.task.description = req.body.description
            await req.task.save()
            res.send('Task updated successfully')
        } catch (error) {
            return res.status(500).json({ error: 'Error found' })
        }
    }

    static deleteTask = async (req: Request, res: Response) => {
        try {
            req.project.tasks = req.project.tasks.filter((task) => task.toString() !== req.task.id.toString())

            await Promise.allSettled([req.task.deleteOne(), req.project.save()])

            res.send('Task deleted successfully')
        } catch (error) {
            return res.status(500).json({ error: 'Error found' })
        }
    }

    static updateStatus = async (req: Request, res: Response) => {
        try {
            req.task.status = req.body.status
            await req.task.save()
            res.send('Status updated successfully')
        } catch (error) {
            return res.status(500).json({ error: 'Error found' })
        }
    }
}
