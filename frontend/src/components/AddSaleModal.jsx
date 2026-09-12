import { useEffect, useState } from "react";
import API from "../api/productApi";
import "../css/purchases.css";

const AddSaleModal = ({ closeModal, refreshSales }) => {
  const [products, setProducts] = useState([]);

  const [selectedName, setSelectedName] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [formData, setFormData] = useState({
    product: "",
    customerName: "",
    quantity: "",
    sellingPrice: "",
    saleDate: "",
    notes: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products");
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Unique Product Names
  const uniqueProducts = [...new Set(products.map((p) => p.name))];

  // Sizes based on selected product
  const availableSizes = [
    ...new Set(
      products
        .filter((p) => p.name === selectedName)
        .map((p) => p.size)
    ),
  ];

  // Colors based on selected product + size
  const availableColors = [
    ...new Set(
      products
        .filter(
          (p) =>
            p.name === selectedName &&
            p.size === selectedSize
        )
        .map((p) => p.color)
    ),
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);

    const product = products.find(
      (p) =>
        p.name === selectedName &&
        p.size === selectedSize &&
        p.color === color
    );

    if (!product) return;

    setSelectedProduct(product);

    setFormData((prev) => ({
      ...prev,
      product: product._id,
      sellingPrice: product.sellingPrice,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/sales", formData);

      alert("Sale added successfully");

      refreshSales();
      closeModal();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to add sale");
    }
  };
    return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Sale</h2>

        <form onSubmit={handleSubmit}>

          {/* Product */}
          <select
            value={selectedName}
            onChange={(e) => {
              setSelectedName(e.target.value);
              setSelectedSize("");
              setSelectedColor("");
              setSelectedProduct(null);

              setFormData((prev) => ({
                ...prev,
                product: "",
                sellingPrice: "",
              }));
            }}
            required
          >
            <option value="">Select Product</option>

            {uniqueProducts.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>

          {/* Size */}
          <select
            value={selectedSize}
            onChange={(e) => {
              setSelectedSize(e.target.value);
              setSelectedColor("");
              setSelectedProduct(null);

              setFormData((prev) => ({
                ...prev,
                product: "",
                sellingPrice: "",
              }));
            }}
            disabled={!selectedName}
            required
          >
            <option value="">Select Size</option>

            {availableSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

          {/* Color */}
          <select
            value={selectedColor}
            onChange={(e) => handleColorChange(e.target.value)}
            disabled={!selectedSize}
            required
          >
            <option value="">Select Color</option>

            {availableColors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>

          {selectedProduct && (
            <div className="product-details">
              <div className="detail-item">
                <span>Brand</span>
                <strong>{selectedProduct.brand}</strong>
              </div>

              <div className="detail-item">
                <span>Category</span>
                <strong>{selectedProduct.category}</strong>
              </div>

              <div className="detail-item">
                <span>Available Stock</span>
                <strong>{selectedProduct.quantity}</strong>
              </div>

              <div className="detail-item">
                <span>Selling Price</span>
                <strong>₹{selectedProduct.sellingPrice}</strong>
              </div>
            </div>
          )}

          <input
            type="text"
            name="customerName"
            placeholder="Customer Name"
            value={formData.customerName}
            onChange={handleChange}
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="saleDate"
            value={formData.saleDate}
            onChange={handleChange}
          />

          <textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
          />

          <div className="modal-buttons">
            <button type="submit">Save</button>

            <button
              type="button"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSaleModal;