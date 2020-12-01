import {Request, Response} from 'express';
import { getRepository } from  'typeorm';
import * as Yup from 'yup';
import OrphanageView from '../views/orphanage_view';
import Orphanage from '../models/Orphanage';

const OrphanageController = {
    
    async create (req:Request,res:Response): Promise<Orphanage | any>{
        const { 
            name, 
            latitude, 
            longitude, 
            about, 
            instructions, 
            opening_hours, 
            open_on_weekends
        } = req.body;
    
        const orphanageRepository = getRepository(Orphanage);
        const reqImages = req.files as Express.Multer.File[];

        const images = reqImages.map(img => {
            return {path:img.filename}
        });
        
        const dataOrphanage = {
            name, 
            latitude, 
            longitude, 
            about, 
            instructions, 
            opening_hours, 
            open_on_weekends,
            images
        }
        //Esquema para validação de dados
        const schema = Yup.object().shape({
            name : Yup.string().trim().required(), 
            latitude : Yup.number().required(), 
            longitude : Yup.number().required(), 
            about : Yup.string().required().max(300), 
            instructions : Yup.string().required(), 
            opening_hours : Yup.string().required(), 
            open_on_weekends : Yup.boolean().required(),
            images : Yup.array(Yup.object().shape({
                path: Yup.string().required()
            }))
        });

        //Validando dados
        await schema.validate(dataOrphanage, {
            abortEarly: false //faz com que todas as mensagens de erros apareçam
        });

        const orphanage = orphanageRepository.create(dataOrphanage);
    
        await orphanageRepository.save(orphanage);
    
        console.log('PASSOU PASSOU');
        return res.status(201).json(orphanage);
    },

    async index (req:Request,res:Response){

        const orphanageRepository =  getRepository(Orphanage);
        const orphanage = await orphanageRepository.find({
            relations:['images']
        });
        return res.status(200).json(OrphanageView.renderMany(orphanage));
    },

    async show(req:Request, res:Response){
        
        const {id} = req.params;
        const orphanageRepository = getRepository(Orphanage);
        const orphanage = await orphanageRepository.findOneOrFail(id,{
            relations:['images']
        });
        return res.status(200).json(OrphanageView.render(orphanage));
    }
}
export default OrphanageController;