import React from 'react';

const DashCoffeeCards = ({ coffee, onEdit, onDelete }) => {
  const { name, price, description, image, category } = coffee;

  return (
    <div className="card bg-base-200 shadow-md border border-primary/30 p-4 flex flex-col justify-between">
      <div>
        {image && (
          <img
            src={`http://localhost:5000${image}`}
            alt={name}
            className="w-full max-h-60 object-contain rounded-xl mb-3"
          />
        )}
        <h3 className="text-lg font-semibold text-primary mb-1">{name}</h3>
        <p className="text-sm  mb-2 line-clamp-3 break-words">{description}</p>
        <p className="font-semibold">{price}</p>

        {/* ✅ Category name */}
        <p className="text-sm text-gray-500 mb-2">
          Category:{' '}
          <span className="text-primary font-medium">
            {category?.name || 'none'}
          </span>
        </p>
      </div>

      <div className="mt-4 flex space-x-3">
        <button
          onClick={() => onEdit(coffee)}
          className="btn btn-sm btn-outline btn-primary"
          aria-label={`Edit ${name}`}
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(coffee)}
          className="btn btn-sm btn-error"
          aria-label={`Delete ${name}`}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DashCoffeeCards;
