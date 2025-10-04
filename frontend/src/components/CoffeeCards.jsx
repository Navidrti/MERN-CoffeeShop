import React, { useEffect, useState } from 'react';

const CoffeeCards = ({ coffee, dispatch, onView }) => {
  const [maxLength, setMaxLength] = useState(getMaxLength());

  function getMaxLength() {
    return window.innerWidth < 640 ? 50 : 70;
  }

  useEffect(() => {
    const handleResize = () => {
      setMaxLength(getMaxLength());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const truncate = (text, length) => {
    if (!text) return '';
    return text.length > length ? text.slice(0, length) + '…' : text;
  };

  return (
    <div className="card bg-base-100 shadow-xl mt-4 flex flex-col sm:flex-row overflow-hidden">
      {/* Image */}
      {coffee.image && (
        <div className="w-full sm:w-48 h-48 sm:h-auto flex items-center justify-center bg-base-200">
          <img
            src={`http://localhost:5000${coffee.image}`}
            alt={coffee.name}
            className="w-full h-full object-contain sm:object-cover"
          />
        </div>
      )}

      {/* Text */}
      <div className="flex flex-col justify-between p-4 w-full">
        <div>
          <h2 className="card-title text-base sm:text-lg">{coffee.name}</h2>

          <p className="text-sm text-justify">
            {truncate(coffee.description, maxLength)}
          </p>

          <p className="font-semibold text-primary mt-2">{coffee.price}</p>
        </div>

        <div className="card-actions justify-end mt-4">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onView(coffee)}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeCards;
