const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Insert Product Name"],
    trim: true,
    maxLength: [100, "Product name cant be exceed more than 100 character"],
  },

  price: {
    type: Number,
    default: 0.0,
    required: [true, "Please Insert product price"],
    maxLength: [5, "Product price cant be exceed more than 5 character"],
  },

  description: {
    type: String,
    required: [true, "Please Insert Product Description"],
  },

  ratings: {
    type: Number,
    default: 0.0,
  },

  images: [
    {
      public_id: {
        type: String,
        required: true,
      },

      url: {
        type: String,
        required: true,
      },
    },
  ],

  category: {
    type: String,
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
    type: String,
    required: [true, "Please enter seller info"],
  },

  stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    maxLength: [20, "Product stock should not exceed 20"],
  },

  numOfReviews: {
    type: Number,
    default: 0,
  },

  reviews: [
    {
      name: {
        type: String,
        required: true,
      },

      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  //adding user in product
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
    //thn productController=>req.body.user = req.user.id;
  },

  creatAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
