import * as dotenv from "dotenv";
dotenv.config();
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';

// move to login routes?
import * as jwt from 'jsonwebtoken';
import { bcrypt } from 'bcrypt';

import PostRouter from './router/PostRouter';
import UserRouter from './router/UserRouter';

class Server {

    public app: express.Application;
    
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    public config(): void {
        // setup mongoose
        const MONGO_URI = 'mongodb://localhost/tes';
        mongoose.connect(MONGO_URI || process.env.MONGOOD_URI)
        
        // app config
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(helmet());
        this.app.use(logger('dev'));
        this.app.use(compression());
        this.app.use(cors());
    }


    public routes(): void {
        let router: express.Router = express.Router();

        this.app.use('/', router);
        this.app.use('/api/v1/posts', PostRouter);
        this.app.use('/api/v1/users', UserRouter);
    }


}

export default new Server().app;