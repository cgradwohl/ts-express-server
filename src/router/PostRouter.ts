import { Router, Request, Response, NextFunction } from 'express';
import Post from '../models/Post';


class PostRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public GetPosts(req: Request, res: Response): void {
        Post.find({})
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

    
    public GetPost(req: Request, res: Response): void {
        const slug: string = req.params.slug;

        Post.findOne({ slug })
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

    
    public CreatePost(req: Request, res: Response): void {
        const title: string = req.body.title;
        const slug: string = req.body.slug;
        const featuredImage: string = req.body.featuredImage;
        const content: string = req.body.content;

        const post = new Post({
            title,
            slug,
            content,            
            featuredImage        
        });

        post.save()
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

    
    public UpdatePost(req: Request, res: Response): void {
        const slug: string = req.params.slug;

        Post.findOneAndUpdate({ slug }, req.body)
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
    
    
    public DeletePost(req: Request, res: Response): void {
        const slug: string = req.params.slug;

        Post.findOneAndRemove({ slug })
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
        this.router.get('/', this.GetPosts);
        this.router.get('/:slug', this.GetPost);
        this.router.post('/', this.CreatePost);
        this.router.put('/:slug', this.UpdatePost);
        this.router.delete('/:slug', this.DeletePost);
    }


}


const postRoutes = new PostRouter().router;
export default postRoutes;