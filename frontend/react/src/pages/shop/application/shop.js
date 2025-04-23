// shop.js

import axios from 'axios';

const API_BASE = 'http://localhost:3000/api';

// Existing exports...

export async function getItems(sort = '0') {
  const res = await axios.get(`${API_BASE}/items?sort=${sort}`);
  return res.data.data;
}

export async function getItemsByFarmer(farmerId) {
  const res = await axios.get(`${API_BASE}/items/farmer/${farmerId}`);
  return res.data;
}

export function sortList(items, sortValue) {
  if (!items) return [];

  switch (sortValue) {
    case '1':
      return [...items].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    case '2':
      return [...items].sort((a, b) => a.name.localeCompare(b.name));
    case '3':
      return [...items].sort((a, b) => b.name.localeCompare(a.name));
    case '4':
      return [...items].sort((a, b) => a.price - b.price);
    case '5':
      return [...items].sort((a, b) => b.price - a.price);
    default:
      return items;
  }
}

// ✅ Add this function
export async function deleteItem(itemId) {
  const res = await axios.delete(`${API_BASE}/items/${itemId}`);
  return res.data;
}
// ✅ Add this to shop.js

export async function getUserFromId(userId) {
  const res = await axios.get(`${API_BASE}/users/${userId}`);
  return res.data;
}
