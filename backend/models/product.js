const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter Product name"],
    trim: true,
    maxLength: [100, "Product name cant be exceed more than 100 character"],
  },

  price: {
    type: number,
    default: 0.0,
    required: [true, "Please Insert product price"],
    maxLength: [5, "Product price cant be exceed more than 5 character"],
  },

  description: {
    type: string,
    required: [true, "Please Insert product des"],
  },

  ratings: {
    type: number,
    default: 0.0,
  },

  image: [
    {
      public_id: {
        type: string,
        required: true,
      },

      url: {
        type: string,
        required: true,
      },
    },
  ],

  category: {
    type: string,
    required: [true, "Please Insert category"],
    enum: {
      values: [
        "Electronics",
        "Camera",
        "Mobile",
        "clothes/shoe",
        "Beauty/Health",
        "sports",
        "outdoor",
        "Home",
      ],
      message: "Please Enter Category",
    },
  },

  seller: {
    type: string,
    required: [true, "Please enter seller info"],
  },

  stock: {
    type: number,
    required: [true, "Please enter product stock"],
    maxLength: [20, "Product stock should not exceed 20"],
  },

  numOfReviews: {
    type: number,
    default: 0,
  },

  reviews: [
    {
      name: {
        type: string,
        required: true,
      },

      rating: {
        type: number,
        required: true,
      },
      comment: {
        type: string,
        required: true,
      },
    },
  ],

  creatAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = productSchema;
