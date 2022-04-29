import React, { Fragment, useEffect } from "react";
import "../App.css";
import Metadata from "./layout/Metadata";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productAction";
import Product from "./product/Product";
import Loader from "./layout/Loader";
import { useAlert } from "react-alert";

const Home = () => {
  //alert er functionality index.js a
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, products, error, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Fragment>
          <Metadata title={"Buy Best Product Online"}></Metadata>
          <div className="container container-fluid mt-5">
            <h1 className="products_heading">Latest Product</h1>
          </div>

          <section id="products" class="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => (
                  <div
                    key={product.id_}
                    class="col-sm-12 col-md-6 col-lg-3 my-3"
                  >
                    <div class="card p-3 rounded">
                      <img
                        class="card-img-top mx-auto"
                        src={product.images[0].url}
                      />
                      <div class="card-body d-flex flex-column">
                        <h5 class="card-title">
                          <Link to={`/product/${product._id}`}>
                            {product.name}
                          </Link>
                        </h5>
                        <div class="ratings mt-auto">
                          <div class="rating-outer">
                            <div
                              class="rating-inner"
                              style={{
                                width: `${(product.ratings / 5) * 100}%`,
                              }}
                            ></div>
                          </div>
                          <span id="no_of_reviews">{product.numOfReviews}</span>
                        </div>
                        <p class="card-text">{product.price}</p>
                        <Link
                          to={`/product/${product._id}`}
                          id="view_btn"
                          class="btn btn-block"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
