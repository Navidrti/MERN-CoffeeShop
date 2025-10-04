import React, { useState, useEffect, memo } from 'react';
import api from '../lib/axios';
import { useAuthContext } from '../hooks/useAuthContext';

const EditCoffeeModal = ({ coffee, isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const { admin } = useAuthContext();

  // Set form fields when coffee prop changes
  useEffect(() => {
    if (coffee) {
      setName(coffee.name || '');
      setPrice(coffee.price || '');
      setDescription(coffee.description || '');
      setPreviewUrl(coffee.image || '');
      setCategory(coffee.category?._id || '');
      setImageFile(null);
    }
  }, [coffee]);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories', {
          headers: { Authorization: `Bearer ${admin.token}` },
        });
        setCategories(res.data || []);
      } catch (err) {
        console.error('Failed to fetch categories', err);
      }
    };
    fetchCategories();
  }, [admin.token]);

  if (!isOpen || !coffee) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', category);
    if (imageFile) {
      formData.append('image', imageFile);
    }
    onSave(coffee._id, formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-base-100 rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-primary">Edit Coffee</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="label font-medium">Name</label>
            <input
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full bg-base-200"
            />
          </div>

          {/* Price */}
          <div>
            <label className="label font-medium">Price</label>
            <input
              type="text"
              value={price}
              required
              onChange={(e) => setPrice(e.target.value)}
              className="input input-bordered w-full bg-base-200"
            />
          </div>

          {/* Description */}
          <div>
            <label className="label font-medium">Description</label>
            <textarea
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="textarea textarea-bordered w-full bg-base-200"
            />
          </div>

          {/* Category */}
          <div>
            <label className="label font-medium">Category</label>
            <select
              value={category}
              required
              onChange={(e) => setCategory(e.target.value)}
              className="select select-bordered w-full bg-base-200"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="label font-medium">Change Image</label>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered bg-base-200 w-full"
              onChange={handleImageChange}
            />
            {previewUrl && (
              <img
                src={
                  previewUrl.startsWith('blob:')
                    ? previewUrl
                    : `http://localhost:5000${previewUrl}`
                }
                alt="Preview"
                className="mt-3 w-full max-h-60 object-contain rounded-xl"
              />
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="btn btn-outline">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(EditCoffeeModal);
