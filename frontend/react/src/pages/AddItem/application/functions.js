import { toast } from 'react-toastify'
import { API } from '../../../api/api';
import { ENDPOINTS } from '../../../api/endpoint';


/**
 * Saves item data to backend and uploads image through backend (not frontend Cloudinary)
 * @param {Object} data
 * @param {string} data.listedBy
 * @param {string} data.title
 * @param {string} data.description
 * @param {string} data.price
 * @param {File[]} data.images
 * @returns {Promise<Object|null>}
 */
export async function addItem(data) {
  const { listedBy, title, description, price, images } = data

  try {
    const formData = new FormData()
    formData.append('listedBy', listedBy)
    formData.append('title', title)
    formData.append('description', description)
    formData.append('price', price)

    // Append each image
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i])
    }

    const res = await API.post(ENDPOINTS.ADD_ITEM, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    if (res.data.statusCode === 200) {
      toast.success(res.data.message)
      return res.data.data || true
    } else {
      toast.error(res.data.message)
      return null
    }
  } catch (err) {
    console.error('Error adding item:', err)
    toast.error('Error adding item')
    return null
  }
}
