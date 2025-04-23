const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinaryConfig');


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'millet_items',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }]
  }
});

// Create multer instance using the CloudinaryStorage as storage engine
const upload = multer({ storage });

module.exports = upload;
