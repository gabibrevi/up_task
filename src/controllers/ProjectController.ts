import { Request, Response } from 'express'

export class ProjectController {
    static getAllProject = async (req: Request, res: Response) => {
        res.send('All projects')
    }
}
