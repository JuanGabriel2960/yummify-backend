"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
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
exports.default = Server;
//# sourceMappingURL=server.js.map