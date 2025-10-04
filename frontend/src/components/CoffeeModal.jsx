import React, { forwardRef } from 'react';

const CoffeeModal = forwardRef(({ coffee }, ref) => {
  if (!coffee) return null;

  return (
    <dialog ref={ref} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        {coffee.image && (
          <img
            src={`http://localhost:5000${coffee.image}`}
            alt={coffee.name}
            className="w-full max-h-[50vh] object-contain rounded-lg mb-4"
          />
        )}

        <h3 className="font-bold text-lg">{coffee.name}</h3>
        <p className="py-2">{coffee.description}</p>
        <p className="font-semibold text-primary">{coffee.price}</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
});

export default CoffeeModal;
