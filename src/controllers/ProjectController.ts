import { Request, Response } from 'express'
import Project from '../models/Project'
import colors from 'colors'

export class ProjectController {
    static createProject = async (req: Request, res: Response) => {
        const project = new Project(req.body)

        try {
            await project.save()
            res.send('Project created successfully')
        } catch (error) {
            return res.status(500).json({ error: 'Error found' })
        }
    }

    static getAllProject = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find()
            res.json(projects)
        } catch (error) {
            return res.status(500).json({ error: 'Error found' })
        }
    }

    static getProjectById = async (req: Request, res: Response) => {
        const { id } = req.params
        console.log(id)
        try {
            const project = await Project.findById(id).populate('tasks')
            console.log(project)

            if (!project) {
                const error = new Error('Project not found')
                return res.status(404).json({ error: error.message })
            }
            res.json(project)
        } catch (error) {
            return res.status(500).json({ error: 'Error found' })
        }
    }

    static updateProject = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const project = await Project.findById(id)

            if (!project) {
                const error = new Error('Project not found')
                return res.status(404).json({ error: error.message })
            }

            project.projectName = req.body.projectName
            project.clientName = req.body.clientName
            project.description = req.body.description

            await project.save()

            res.send('Project updated successfully')
        } catch (error) {
            return res.status(500).json({ error: 'Error found' })
        }
    }
    static deleteProject = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const project = await Project.findById(id)
            await project.deleteOne()
            res.send('Project deleted successfully')
        } catch (error) {
            return res.status(500).json({ error: 'Error found' })
        }
    }
}
