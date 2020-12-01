import multer from 'multer';
import path from 'path';
import { callbackify } from 'util';

export default {
    storage: multer.diskStorage({
        destination: path.join(__dirname,'..','..','upload'),
        filename: (req, file, callback)=>{
            const filename = `${Date.now()}-${file.originalname.trim()}`;

            callback(null, filename);
        }
    })
}