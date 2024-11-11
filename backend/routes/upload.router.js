import { Router } from 'express';
import uploadController from '../controllers/upload.controller.js';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

const UploadRouter = Router();

UploadRouter.post('/single', upload.single('file'), uploadController.uploadFile);
UploadRouter.post('/multiple', upload.array('files', 10), uploadController.uploadFiles);

export default UploadRouter;
