import { useState, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router';
import Navbar from '../components/Navbar';
import CoffeeModal from '../components/CoffeeModal';
import CoffeeCards from '../components/CoffeeCards';
import { useCoffeeContext } from '../hooks/useCoffeeContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useHomePageData } from '../hooks/useHomePageData';

const HomePage = () => {
  const modalRef = useRef();
  const navigate = useNavigate();
  const { admin } = useAuthContext();
  const { coffees } = useCoffeeContext();
  const { categories, loading } = useHomePageData();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCoffee, setSelectedCoffee] = useState(null);

  const handleView = useCallback((coffee) => {
    setSelectedCoffee(coffee);
    requestAnimationFrame(() => {
      modalRef.current?.showModal();
    });
  }, []);

  const handleCategoryClick = useCallback((categoryId) => {
    setSelectedCategory(categoryId);
  }, []);

  const goToDashboard = useCallback(() => {
    navigate('/admin');
  }, [navigate]);

  const filteredCoffees = useMemo(() => {
    if (selectedCategory === 'all') return coffees;
    return coffees.filter(
      (coffee) => coffee.category?._id === selectedCategory
    );
  }, [coffees, selectedCategory]);

  return (
    <div className="min-h-screen">
      <Navbar />

      {admin && (
        <div className="max-w-5xl mx-auto p-4 mt-6 flex justify-end items-center space-x-2">
          <span
            className="text-primary font-semibold hover:underline cursor-pointer"
            onClick={goToDashboard}
          >
            Admin
          </span>
          <button
            onClick={goToDashboard}
            className="btn btn-circle btn-sm bg-primary text-white hover:bg-primary-focus"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Category Filter Row */}
      <div className="max-w-5xl mx-auto px-4 mt-10 overflow-x-auto whitespace-nowrap no-scrollbar">
        <button
          onClick={() => handleCategoryClick('all')}
          className={`btn btn-sm mr-2 mb-2 ${
            selectedCategory === 'all' ? 'btn-primary' : 'btn-outline'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => handleCategoryClick(cat._id)}
            className={`btn btn-sm mr-2 mb-2 ${
              selectedCategory === cat._id ? 'btn-primary' : 'btn-outline'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Coffee Cards */}
      <div className="max-w-5xl mx-auto p-4 mt-2">
        {loading ? (
          <div className="text-center text-primary py-10">
            Loading coffees...
          </div>
        ) : filteredCoffees?.length > 0 ? (
          filteredCoffees.map((coffee) => (
            <CoffeeCards key={coffee._id} coffee={coffee} onView={handleView} />
          ))
        ) : (
          <div className="text-center text-gray-500 py-10">
            No coffees found for this category.
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedCoffee && <CoffeeModal coffee={selectedCoffee} ref={modalRef} />}
    </div>
  );
};

export default HomePage;
