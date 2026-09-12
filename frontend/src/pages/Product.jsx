import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../api/productApi";
import "../css/products.css";
import AddProductModal from "../components/AddProductModal";
import EditProductModal from "../components/EditProductModal";

import { FaBoxOpen } from "react-icons/fa";

const Products = () => {
  const [products, setProducts] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products");

      setProducts(data);
    } catch (error) {
      console.error(
        "Error fetching products:",
        error
      );
    }
  };

  const editProduct = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/products/${id}`);

      alert("Product deleted successfully");

      fetchProducts();
    } catch (error) {
      console.error(
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete product"
      );
    }
  };

  /* =====================================================
     CATEGORY FILTER
  ===================================================== */

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) =>
            product.category === selectedCategory
        );

  /* =====================================================
     CATEGORY COUNTS
  ===================================================== */

  const allCount = products.length;

  const menCount = products.filter(
    (product) =>
      product.category === "Men"
  ).length;

  const womenCount = products.filter(
    (product) =>
      product.category === "Women"
  ).length;

  const kidsCount = products.filter(
    (product) =>
      product.category === "Kids"
  ).length;

  return (
    <div className="products-page">

      {/* ================= SIDEBAR ================= */}

      <Sidebar />


      {/* ================= MAIN ================= */}

      <div className="products-layout">

        {/* ================= CONTENT ================= */}

        <main className="products-main">

          {/* ================= PAGE HEADER ================= */}

          <div className="products-page-header">

            <div>

              <h1>
                Products
              </h1>

              <p>
                {filteredProducts.length}{" "}
                products • Manage your
                inventory products
              </p>

            </div>


            <button
              className="add-product-btn"
              onClick={() =>
                setShowModal(true)
              }
            >
              + Add Product
            </button>

          </div>


          {/* ================= FILTERS ================= */}

          <div className="product-filters">

            <button
              className={
                selectedCategory === "All"
                  ? "filter-btn active"
                  : "filter-btn"
              }
              onClick={() =>
                setSelectedCategory("All")
              }
            >
              All

              <span>
                {allCount}
              </span>
            </button>


            <button
              className={
                selectedCategory === "Men"
                  ? "filter-btn active"
                  : "filter-btn"
              }
              onClick={() =>
                setSelectedCategory("Men")
              }
            >
              Men

              <span>
                {menCount}
              </span>
            </button>


            <button
              className={
                selectedCategory === "Women"
                  ? "filter-btn active"
                  : "filter-btn"
              }
              onClick={() =>
                setSelectedCategory("Women")
              }
            >
              Women

              <span>
                {womenCount}
              </span>
            </button>


            <button
              className={
                selectedCategory === "Kids"
                  ? "filter-btn active"
                  : "filter-btn"
              }
              onClick={() =>
                setSelectedCategory("Kids")
              }
            >
              Kids

              <span>
                {kidsCount}
              </span>
            </button>

          </div>


          {/* ================= PRODUCTS ================= */}

          {filteredProducts.length > 0 ? (

            <div className="products-grid">

              {filteredProducts.map(
                (product) => (

                  <div
                    className="product-card"
                    key={product._id}
                  >

                    {/* ================= IMAGE ================= */}

                    <div className="product-card-image">

                      {product.image ? (

                        <img
                          src={product.image}
                          alt={product.name}
                        />

                      ) : (

                        <div className="product-no-image">

                          <FaBoxOpen />

                          <span>
                            No Image
                          </span>

                        </div>

                      )}

                    </div>


                    {/* ================= CONTENT ================= */}

                    <div className="product-card-content">

                      {/* ================= NAME ================= */}

                      <div className="product-name-row">

                        <div>

                          <h2>
                            {product.name}
                          </h2>

                          <p>
                            {product.brand ||
                              "No Brand"}
                          </p>

                        </div>


                        {/* STOCK */}

                        <div
                          className={
                            Number(
                              product.quantity
                            ) <= 5
                              ? "stock-badge low"
                              : "stock-badge"
                          }
                        >
                          {Number(
                            product.quantity
                          ) <= 5
                            ? "Low Stock"
                            : "In Stock"}
                        </div>

                      </div>


                      {/* ================= DETAILS ================= */}

                      <div className="product-details-grid">

                        <div className="detail-item">

                          <span>
                            Category
                          </span>

                          <strong>
                            {product.category ||
                              "N/A"}
                          </strong>

                        </div>


                        <div className="detail-item">

                          <span>
                            Size
                          </span>

                          <strong>
                            {product.size ||
                              "N/A"}
                          </strong>

                        </div>


                        <div className="detail-item">

                          <span>
                            Color
                          </span>

                          <strong>
                            {product.color ||
                              "N/A"}
                          </strong>

                        </div>


                        <div className="detail-item">

                          <span>
                            Supplier
                          </span>

                          <strong>
                            {product.supplier
                              ?.company ||
                              "N/A"}
                          </strong>

                        </div>

                      </div>


                      {/* ================= PRICE / QUANTITY ================= */}

                      <div className="product-summary">

                        <div>

                          <span>
                            Selling Price
                          </span>

                          <strong className="product-price">
                            ₹{product.sellingPrice}
                          </strong>

                        </div>


                        <div className="quantity-box">

                          <span>
                            Quantity
                          </span>

                          <strong
                            className={
                              Number(
                                product.quantity
                              ) <= 5
                                ? "quantity-low"
                                : "quantity-good"
                            }
                          >
                            {product.quantity}
                          </strong>

                        </div>

                      </div>


                      {/* ================= ACTIONS ================= */}

                      <div className="product-actions">

                        <button
                          className="edit-btn"
                          onClick={() =>
                            editProduct(
                              product
                            )
                          }
                        >
                          Edit
                        </button>


                        <button
                          className="delete-btn"
                          onClick={() =>
                            deleteProduct(
                              product._id
                            )
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          ) : (

            /* ================= EMPTY STATE ================= */

            <div className="empty-products">

              <FaBoxOpen />

              <h2>
                No products found
              </h2>

              <p>
                No{" "}
                {selectedCategory === "All"
                  ? ""
                  : selectedCategory}{" "}
                products available.
              </p>

              <button
                className="add-product-btn"
                onClick={() =>
                  setShowModal(true)
                }
              >
                + Add Product
              </button>

            </div>

          )}


          {/* ================= ADD MODAL ================= */}

          {showModal && (

            <AddProductModal
              closeModal={() =>
                setShowModal(false)
              }
              refreshProducts={
                fetchProducts
              }
            />

          )}


          {/* ================= EDIT MODAL ================= */}

          {showEditModal && (

            <EditProductModal
              product={selectedProduct}
              closeModal={() =>
                setShowEditModal(false)
              }
              refreshProducts={
                fetchProducts
              }
            />

          )}

        </main>

      </div>

    </div>
  );
};

export default Products;