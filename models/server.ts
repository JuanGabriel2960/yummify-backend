import express, { Application } from 'express';
import cors from 'cors';
import db from '../database/connection';

import auth from '../routes/auth';

class Server {

	private app: Application;

	private paths = {
		auth: '/api/auth',
	};

	constructor() {
		this.app = express();

		this.connection()

		this.middlewares();

		this.routes();
	}

	async connection() {
		try {
			await db.authenticate()
			console.log('Successful connection to database')
		} catch {
			throw new Error('Error establishing connection to database')
		}
	}

	middlewares() {
		this.app.use(cors());
		this.app.use(express.json())
	}

	routes() {
		this.app.get('/', (req, res) => {
			res.send('yummify-backend');
		});

		this.app.use(this.paths.auth, auth)
	}

	listen() {
		this.app.listen(process.env.PORT, () => {
			console.log(`server running on port: ${process.env.PORT}`);
		});
	}
}

export default Server;
