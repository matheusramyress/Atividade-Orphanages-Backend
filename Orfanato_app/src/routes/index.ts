import { Router } from 'express';
import multer from 'multer';
import OrphanageController from '../controller/OrphanageController';
import uploadConfig from '../config/upload'


const routes = Router();
const uploadMulter = multer(uploadConfig);

routes.get('/orphanages',OrphanageController.index);

routes.get('/orphanages/:id',OrphanageController.show);

routes.post('/orphanages',uploadMulter.array('images'),OrphanageController.create);

export default routes;