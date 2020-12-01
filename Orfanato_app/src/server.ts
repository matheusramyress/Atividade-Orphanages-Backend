import express from 'express';
import path from 'path';
import cors from 'cors';
import routes from './routes';
import 'express-async-errors';
import './database/connection';
import errorHandler from './errors/handler';

const server = express();

//Express entender o JSON
server.use(express.json());
server.use(cors());
server.use(routes);

server.use('/upload',express.static(path.join(__dirname,'..','upload')));
server.use(errorHandler);

server.listen(3003,()=>{
    console.log('Servidor Online na porta 3003')
});
