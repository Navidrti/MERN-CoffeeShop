import { useState } from 'react';

const EditCategoryModal = ({ category, onClose, onUpdate }) => {
  const [editName, setEditName] = useState(category.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(category._id, editName, onClose);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-base-100 p-6 rounded shadow-lg w-[90%] max-w-md">
        <h3 className="text-lg font-semibold mb-4 text-center">
          Edit Category
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            className="input input-bordered w-full"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            required
          />
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>
            <button type="submit" className="btn btn-success">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryModal;
