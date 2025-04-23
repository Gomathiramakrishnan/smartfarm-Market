const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const upload = require('../config/upload');  // for multer-cloudinary
const { MilletItem, validateMilletItem } = require('../models/millet_item');
const { getSuccessResponse, getErrorResponse } = require('../utils/response');

// Add item route
router.post('/addItem', upload.array('images', 5), async (req, res) => {
  try {
    const { title, description, price, listedBy } = req.body;

    if (!mongoose.Types.ObjectId.isValid(listedBy)) {
      return res.status(400).send(getErrorResponse('Invalid User ID'));
    }

    // Extract image URLs from Cloudinary upload
    const imageUrls = req.files.map(file => file.path);

    // Prepare data to validate and save
    const itemData = {
      listedBy,
      name: title,
      description,
      price: parseFloat(price),
      images: imageUrls,
      comments: []
    };

    // Validate the data using Joi
    const { error } = validateMilletItem(itemData);
    if (error) return res.status(400).send(getErrorResponse(error.details[0].message));

    // Save to database
    const item = new MilletItem(itemData);
    await item.save();

    return res.status(200).send(getSuccessResponse('Item added successfully', item));
  } catch (err) {
    console.error(err);
    return res.status(500).send(getErrorResponse('Internal Server Error'));
  }
});

module.exports = router;
