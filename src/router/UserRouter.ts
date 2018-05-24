import { Router, Request, Response, NextFunction } from 'express';
import User from '../models/User';
import * as bcrypt from 'bcrypt';


class UserRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public GetUsers(req: Request, res: Response): void {
        User.find({})
            .then((data) => {
                const status = res.statusCode
                res.json({
                    status,
                    data
                });
            })
            .catch((err) => {
                const status = res.statusCode
                res.json({
                    status,
                    err
                });
        });
    }

    
    public GetUser(req: Request, res: Response): void {
        const username: string = req.params.username;

        User.findOne({ username })
            .populate('posts')
            .then((data) => {
                const status = res.statusCode
                res.json({
                    status,
                    data
                });
            })
            .catch((err) => {
                const status = res.statusCode
                res.json({
                    status,
                    err
                });
        });
    }

    
    public CreateUser(req: Request, res: Response): void {
        const firstname: string = req.body.firstname;
        const lastname: string = req.body.lastname;
        const username: string = req.body.username;
        const email: string = req.body.email;
        const posts: string[] = req.body.posts;
        
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if(err) {
                return res.status(500).json({
                    error: err
                });
            } else {
                const user = new User({
                    firstname,
                    lastname,
                    username,
                    email,
                    password: hash,
                    posts      
                });
                user.save()
                    .then((data) => {
                        const status = res.statusCode
                        res.json({
                            status,
                            data
                        });
                    })
                    .catch((err) => {
                        const status = res.statusCode
                        res.json({
                            status,
                            err
                        });
                    });
            }
        });
    }

    
    public UpdateUser(req: Request, res: Response): void {
        const username: string = req.params.username;

        User.findOneAndUpdate({ username }, req.body)
            .then((data) => {
                const status = res.statusCode
                res.json({
                    status,
                    data
                });
            })
            .catch((err) => {
                const status = res.statusCode
                res.json({
                    status,
                    err
                });
        });
        
    }
    
    
    public DeleteUser(req: Request, res: Response): void {
        const username: string = req.params.username;

        User.findOneAndRemove({ username })
            .then((data) => {
                const status = res.statusCode
                res.json({
                    status,
                    data
                });
            })
            .catch((err) => {
                const status = res.statusCode
                res.json({
                    status,
                    err
                });
        });
    }
    
    
    public routes(): void {
        this.router.get('/', this.GetUsers);
        this.router.get('/:username', this.GetUser);
        this.router.post('/', this.CreateUser);
        this.router.put('/:username', this.UpdateUser);
        this.router.delete('/:username', this.DeleteUser);
    }


}


const userRoutes = new UserRouter().router;
export default userRoutes;