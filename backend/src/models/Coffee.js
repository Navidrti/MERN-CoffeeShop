import mongoose from 'mongoose';

const coffeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: '', // stores the relative image path like "/uploads/xyz.jpg"
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
  },
  { timestamps: true }
);

const Coffee = mongoose.model('Coffee', coffeeSchema);

export default Coffee;
