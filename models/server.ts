import express, { Application } from 'express';
import cors from 'cors';

class Server {

	private app: Application;

	constructor() {
		this.app = express();

		this.middlewares();

		this.routes();
	}

	middlewares() {
		this.app.use(cors());
		this.app.use(express.json())
	}

	routes() {
		this.app.get('/', (req, res) => {
			res.send('yummify-backend');
		});
	}

	listen() {
		this.app.listen(process.env.PORT, () => {
			console.log(`server running on port: ${process.env.PORT}`);
		});
	}
}

export default Server;
