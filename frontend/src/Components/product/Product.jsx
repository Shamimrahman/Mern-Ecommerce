import React from "react";
import "../../App.css";

const Product = ({ product }) => {
  return (
    <div>
      <div class="col-sm-12 col-md-6 col-lg-3 my-3">
        <div class="card p-3 rounded">
          <img class="card-img-top mx-auto" src={product.images[0].url} />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">
              <a href="">{product.name}</a>
            </h5>
            <div class="ratings mt-auto">
              <div class="rating-outer">
                <div
                  class="rating-inner"
                  style={{ width: `${(product.ratings / 5) * 100}%` }}
                ></div>
              </div>
              <span id="no_of_reviews">{product.numOfReviews}</span>
            </div>
            <p class="card-text">{product.price}</p>
            <a href="#" id="view_btn" class="btn btn-block">
              View Details
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
