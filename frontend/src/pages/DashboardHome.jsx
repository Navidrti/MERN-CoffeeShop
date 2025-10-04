import { useNavigate } from 'react-router';
import { useCoffeeContext } from '../hooks/useCoffeeContext';
import DashCoffeeCards from '../components/DashCoffeeCards';
import EditCoffeeModal from '../components/EditCoffeeModal';

import { useDashboardData } from '../hooks/useDashboardData';
import { useCoffeeForm } from '../hooks/useCoffeeForm';
import { useCoffeeActions } from '../hooks/useCoffeeActions';

const DashboardHome = () => {
  const navigate = useNavigate();
  const { coffees } = useCoffeeContext();
  const {
    coffeeCount,
    adminCount,
    loadingCounts,
    loadingCoffees,
    setCoffeeCount,
  } = useDashboardData();

  const {
    name,
    setName,
    price,
    setPrice,
    description,
    setDescription,
    image,
    setImage,
    handleSubmit,
    category,
    setCategory,
    categories,
    fileInputRef,
  } = useCoffeeForm(setCoffeeCount);

  const {
    selectedCoffee,
    isModalOpen,
    handleEdit,
    handleDelete,
    handleModalClose,
    handleSave,
  } = useCoffeeActions(setCoffeeCount);

  return (
    <div className="relative min-h-screen px-6 pt-6 max-w-5xl mx-auto">
      {/* Back to Homepage */}
      <div
        className="absolute top-6 left-6 flex items-center space-x-2 text-primary cursor-pointer hover:underline"
        onClick={() => navigate('/')}
      >
        <button
          className="btn btn-circle btn-sm bg-primary text-white hover:bg-primary-focus"
          aria-label="Back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 rotate-180"
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
        <span className="font-medium">Homepage</span>
      </div>

      <div className="h-10 md:h-16" />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {[
          { title: 'Total Coffees', count: coffeeCount },
          { title: 'Total Admins', count: adminCount },
        ].map(({ title, count }) => (
          <div
            key={title}
            className="card bg-base-200 shadow-xl border border-primary/20"
          >
            <div className="card-body flex flex-col items-center justify-center text-center">
              <h2 className="text-xl font-semibold text-primary mb-2">
                {title}
              </h2>
              <div className="text-4xl font-bold h-12 flex items-center justify-center">
                {loadingCounts ? (
                  <span className="loading loading-spinner loading-lg text-primary"></span>
                ) : (
                  count
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Coffee Form */}
      <div className="card bg-base-100 shadow-2xl mt-20">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Add a New Coffee
          </h2>
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            onSubmit={handleSubmit}
          >
            <div className="form-control">
              <label className="label font-medium">Name</label>
              <input
                className="input input-bordered bg-base-200"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label font-medium">Price</label>
              <input
                className="input input-bordered bg-base-200"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="form-control md:col-span-2">
              <label className="label font-medium">Description</label>
              <textarea
                className="textarea textarea-bordered bg-base-200"
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label className="label font-medium">Category</label>
              <select
                required
                value={category}
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
            <div className="form-control md:col-span-2">
              <label className="label font-medium">Coffee Image</label>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="file-input file-input-bordered bg-base-200"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button type="submit" className="btn btn-primary px-8">
                ☕ Add Coffee
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Coffee Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {loadingCoffees ? (
          <div className="col-span-full flex justify-center items-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <span className="ml-2 text-primary font-medium">
              Loading coffees...
            </span>
          </div>
        ) : coffees.length > 0 ? (
          coffees.map((coffee) => (
            <DashCoffeeCards
              key={coffee._id}
              coffee={coffee}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No coffees found.
          </p>
        )}
      </div>

      {/* Edit Modal */}
      <EditCoffeeModal
        coffee={selectedCoffee}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSave}
      />
    </div>
  );
};

export default DashboardHome;
