import { useState } from 'react';
import { addItem } from './application/function';
import { toast } from 'react-toastify';

export default function AddItem() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [files, setFiles] = useState([]);
  const listedBy = localStorage.getItem('id'); // Your farmer/user ID

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!listedBy) {
      toast.error('User not authenticated!');
      return;
    }

    if (!title || !description || !price || files.length === 0) {
      toast.error('All fields including image(s) are required!');
      return;
    }

    const data = {
      listedBy,
      title,
      description,
      price,
      images: files,
    };

    const result = await addItem(data);

    if (result) {
      toast.success('Item added successfully!');
      setTitle('');
      setDescription('');
      setPrice('');
      setFiles([]);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Item Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="file"
          onChange={(e) => setFiles([...e.target.files])}
          accept="image/*"
          multiple
          className="w-full"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Item
        </button>
      </form>
    </div>
  );
}
