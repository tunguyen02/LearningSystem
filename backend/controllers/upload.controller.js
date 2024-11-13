import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'du3ckllhf',
    api_key: '544965513368788',
    api_secret: 'F8voAT4Bb28gCVTm14n42GiFIvk'
});

const uploadController = {
    uploadFile: async (file) => {
        if (!file) {
            return null;
        }
        const dataUrl = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
        const fileName = file.originalname.substring(0, file.originalname.lastIndexOf('.'));

        const result = await cloudinary.uploader.upload(dataUrl, {
            public_id: fileName,
            resource_type: 'auto',
            folder: 'LearningSystem',
            overwrite: true
        });
        return result.secure_url;
    },

    uploadFiles: async (listFile) => {
        const listResult = [];

        for (const file of listFile) {
            const dataUrl = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
            const fileName = file.originalname.substring(0, file.originalname.lastIndexOf('.'));

            const result = await cloudinary.uploader.upload(dataUrl, {
                public_id: fileName,
                resource_type: 'auto',
                folder: 'LearningSystem',
                overwrite: true
            });
            listResult.push(result);
        }
        return { listResult };
    }
};

export default uploadController;
