import multer from 'multer';

// Configure multer
const upload = multer({ dest: 'uploads/' });

export const multerConfig = {
  api: {
    bodyParser: false, // Disable body parsing, multer will handle it
  },
};

export default upload