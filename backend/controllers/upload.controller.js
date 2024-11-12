import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'du3ckllhf',
    api_key: '544965513368788',
    api_secret: 'F8voAT4Bb28gCVTm14n42GiFIvk'
});

const uploadController = {
    uploadFile: async (req, res) => {
        const file = req.file;

        if (!file) {
            return res.status(400).json({
                error: 'No file uploaded.'
            });
        }

        const dataUrl = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
        const fileName = file.originalname.substring(0, file.originalname.lastIndexOf('.'));

        try {
            const result = await cloudinary.uploader.upload(dataUrl, {
                public_id: fileName,
                resource_type: 'auto',
                folder: 'LearningSystem',
                overwrite: true
            });

            res.status(200).json({
                url: result.secure_url
            });
        } catch (err) {
            res.status(500).json({
                error: `Upload fail: ${err.message}`
            });
        }
    },

    uploadFiles: async (req, res) => {
        const listFile = req.files;
        const listResult = [];
        const errorList = [];

        if (!listFile || listFile.length === 0) {
            return res.status(400).json({
                error: 'No files uploaded.'
            });
        }

        for (const file of listFile) {
            const dataUrl = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
            const fileName = file.originalname.substring(0, file.originalname.lastIndexOf('.'));

            try {
                const result = await cloudinary.uploader.upload(dataUrl, {
                    public_id: fileName,
                    resource_type: 'auto',
                    folder: 'LearningSystem',
                    overwrite: true
                });
                listResult.push(result);
            } catch (err) {
                errorList.push(`Upload fail ${file.originalname}: ${err.message}`);
            }
        }

        res.status(200).json({
            listResult,
            errorList
        });
    }
};

export default uploadController;
