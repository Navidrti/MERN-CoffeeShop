import { useState } from 'react';
import { useCategoryActions } from '../hooks/useCategoryActions';
import EditCategoryModal from '../components/EditCategoryModal';

const AddCategoryPage = () => {
  const [name, setName] = useState('');
  const {
    categories,
    loading,
    editingCategory,
    setEditingCategory,
    addCategory,
    deleteCategory,
    updateCategory,
  } = useCategoryActions();

  const handleAdd = (e) => {
    e.preventDefault();
    addCategory(name, () => setName(''));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-24 px-4">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Category</h2>

        <form onSubmit={handleAdd} className="space-y-4">
          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
            required
          />
          <button className="btn btn-primary w-full" type="submit">
            Add Category
          </button>
        </form>

        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-2 text-center">
            Existing Categories
          </h3>
          {loading ? (
            <div className="flex justify-center mt-8">
              <span className="loading loading-spinner loading-lg text-primary" />
            </div>
          ) : categories.length === 0 ? (
            <p className="text-center text-gray-500 mt-6">
              No categories found.
            </p>
          ) : (
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li
                  key={cat._id}
                  className="p-4 bg-base-200 rounded flex justify-between items-center"
                >
                  <span className="font-medium">{cat.name}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingCategory(cat)}
                      className="btn btn-outline btn-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCategory(cat._id)}
                      className="btn btn-error btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {editingCategory && (
        <EditCategoryModal
          category={editingCategory}
          onClose={() => setEditingCategory(null)}
          onUpdate={updateCategory}
        />
      )}
    </div>
  );
};

export default AddCategoryPage;
