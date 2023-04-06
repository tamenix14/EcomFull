import React, { Fragment, useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "react-js-pagination";
import { searchProducts } from "../../actions/productActions";
import Product from "../product/Product";
import Loader from "./Loader";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

export default function Search({ match }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [color, setColor] = useState("");
  const dispatch = useDispatch();
  const categories = [
    "Cleats",
    "Gloves",
    "Balls",
    "Shirts",
    "Accessories",
    "Bags & Luggage",
    "Electronics",
  ];
  const colors = ["Black", "Brown", "Silver", "White", "Blue", "Ocean"];
  const keyword = match.params.keyword;
  const {
    loading,
    products,
    productsCount,
    resPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  let count = productsCount;
  if (keyword) {
    count = filteredProductsCount;
  }

  useEffect(() => {
    dispatch(searchProducts(keyword, currentPage, price, category, color, rating));
  }, [dispatch, keyword, currentPage, price, category, color, rating]);
  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }
  return (
    <Fragment>
      <div className="d-flex pt-5">
        <div className="col-6 col-md-4">
          <div className="px-5">
            <Range
              marks={{
                1: `$1`,
                1000: `$1000`,
              }}
              min={1}
              max={1000}
              defaultValue={[1, 1000]}
              tipFormatter={(value) => `$${value}`}
              tipProps={{
                placement: "top",
                visible: true,
              }}
              value={price}
              onChange={(price) => setPrice(price)}
            />
            <hr className="my-5" />
            <div className="mt-5">
              <h4 className="mb-3">Categories</h4>
              <ul className="pl-0">
                {categories.map((cate) => (
                  <div>
                    <input
                      type="radio"
                      style={{
                        cursor: "pointer",
                        listStyleType: "none",
                      }}
                      name="category"
                      value={cate}
                      key={cate}
                      onChange={() => setCategory(cate)}
                      checked={cate === category}
                    />
                    <label className="ml-2">{cate}</label>
                  </div>
                ))}
              </ul>
            </div>
            <hr className="my-3" />
            <div className="mt-5">
              <h4 className="mb-3">Colors</h4>
              <div className="pl-0">
                {colors.map((c) => (
                  <div>
                    <input
                      type="radio"
                      style={{
                        cursor: "pointer",
                        listStyleType: "none",
                      }}
                      name="color"
                      value={c}
                      key={c}
                      onChange={() => setColor(c)}
                      checked={c === color}
                    />
                    <label className="ml-1">{c}</label>
                  </div>
                ))}
              </div>
            </div>
            <hr className="my-3" />
            <div className="mt-5">
              <h4 className="mb-3">Ratings</h4>
              <ul className="pl-0">
                {[5, 4, 3, 2, 1].map((star) => (
                  <li
                    style={{
                      cursor: "pointer",
                      listStyleType: "none",
                    }}
                    key={star}
                    onClick={() => setRating(star)}
                  >
                    <div className="rating-outer">
                      <div
                        className="rating-inner"
                        style={{
                          width: `${star * 20}%`,
                        }}
                      ></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {keyword ? (
          <div className="col-6 col-md-8">
            {loading ? (
              <Loader />
            ) : (
              <div className="row">
                {products.length ? (
                  products?.map((product) => (
                    <Product key={product._id} product={product} col={4} />
                  ))
                ) : (
                  <h1>No products found</h1>
                )}
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      {resPerPage < count && (
        <div className="d-flex justify-content-center mt-5">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resPerPage}
            totalItemsCount={productsCount}
            onChange={setCurrentPageNo}
            nextPageText={"Next"}
            prevPageText={"Prev"}
            firstPageText={"First"}
            lastPageText={"Last"}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      )}
    </Fragment>
  );
}
