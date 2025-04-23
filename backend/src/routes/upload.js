const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../config/cloudinaryConfig');

const fs = require('fs');
const Product = require('../models/Product');

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'SmartFarmMarket',
    });

    const imageUrl = result.secure_url;
    const metadata = {
      farmerId: req.body.farmerId,
      name: req.body.name,
      price: req.body.price,
      imageUrl,
    };

    const saved = await Product.create(metadata);
    fs.unlinkSync(req.file.path);

    res.status(200).json({ message: 'Uploaded!', data: saved });
  } catch (err) {
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
});

module.exports = router;
