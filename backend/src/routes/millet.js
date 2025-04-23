const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const upload = require('../config/upload'); 
const { MilletItem, validateMilletItem } = require('../models/millet_item')
const { getSuccessResponse, getErrorResponse } = require('../utils/response')

// Add item route
router.post('/addItem', upload.array('images', 5), async (req, res) => {
  try {
    const { title, description, price, listedBy } = req.body

    if (!mongoose.Types.ObjectId.isValid(listedBy)) {
      return res.status(400).send(getErrorResponse('Invalid User ID'))
    }

    // Image URLs from Cloudinary upload
    const imageUrls = req.files.map(file => file.path)

    const itemData = {
      listedBy,
      name: title,
      description,
      price: parseFloat(price),
      images: imageUrls,
      comments: []
    }

    const { error } = validateMilletItem(itemData)
    if (error) return res.status(400).send(getErrorResponse(error.details[0].message))

    const item = new MilletItem(itemData)
    await item.save()

    return res.status(200).send(getSuccessResponse('Item added successfully', item))
  } catch (err) {
    console.error(err)
    return res.status(500).send(getErrorResponse('Internal Server Error'))
  }
})

// Get all items (e.g., for shop display)
router.get('/', async (req, res) => {
  try {
    const sort = req.query.sort || '0'; // Optional sort logic here
    const items = await MilletItem.find().sort({ createdAt: -1 }); // example sort
    res.status(200).send(getSuccessResponse('Fetched items', items));
  } catch (err) {
    console.error(err);
    res.status(500).send(getErrorResponse('Failed to fetch items'));
  }
});

module.exports = router
