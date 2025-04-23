import axios from 'axios';
import appState from '../../../data/AppState';
import { toast } from 'react-toastify';

/**
 * Handles uploading image to Cloudinary using env variables
 * @param {File} image
 * @returns {Promise<string|null>} secure URL of uploaded image or null on failure
 */
async function handleUpload(image) {
  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
  formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData
    });

    const data = await res.json();

    if (data.secure_url) {
      return data.secure_url;
    } else {
      throw new Error('Cloudinary did not return a secure URL');
    }
  } catch (err) {
    console.error('Upload error:', err);
    return null;
  }
}

/**
 * Makes request to backend to update the user's profile
 * @param {Object} body
 * @param {string} body.name
 * @param {string} body.email
 * @param {string} body.phone
 * @returns {Promise<User|undefined>} The user's updated profile
 */
export default async function updateUser(body) {
  const res = await axios.post(import.meta.env.VITE_API_URL + '/profile/updateUser', {
    ...body,
    _id: appState.getUserData()._id
  });

  if (res.status !== 200) {
    toast.error('An error occurred while updating your profile. Please try again later.');
    throw new Error('An error occurred while updating your profile');
  } else {
    appState.setUserData(res.data.data);
    return res.data.data;
  }
}

/**
 * Add's Image to Farmers Profile
 * @param {File} image
 * @returns {Promise<string>} The URL of the uploaded image
 */
export async function addFarmImage(image) {
  toast.info('Uploading image...');
  const imageUrl = await handleUpload(image);

  if (!imageUrl) {
    toast.error('An error occurred while uploading image');
    return;
  }

  const url = import.meta.env.VITE_API_URL + `/auth/addImage/${appState.getUserData()._id}`;

  await axios.post(url, { image: imageUrl });
  return imageUrl;
}

/**
 * Makes request to backend to get the user's profile
 * @returns {Promise<User|Error>} The user's profile or Error
 */
export async function getUser(navigate) {
  if (!appState.isUserLoggedIn()) {
    toast.error('You must be logged in to view your profile');
    navigate('/auth');
    throw Error('User not logged in');
  }

  const res = await axios.get(import.meta.env.VITE_API_URL + `/auth/${appState.getUserData()._id}`);

  if (res.status === 200) {
    appState.setUserData(res.data.data);
    return res.data.data;
  }

  appState.logOutUser();
  throw Error('User not found');
}
