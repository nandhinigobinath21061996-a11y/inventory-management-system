import { useEffect, useState } from "react";
import API from "../api/productApi";
import "../css/purchases.css";

const AddPurchaseModal = ({ closeModal, refreshPurchases }) => {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const [formData, setFormData] = useState({
    product: "",
    supplier: "",
    quantity: "",
    purchasePrice: "",
    purchaseDate: "",
    notes: "",
  });

  useEffect(() => {
    fetchProducts();
    fetchSuppliers();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products");
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const { data } = await API.get("/suppliers");
      setSuppliers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/purchases", formData);

      alert("Purchase added successfully");

      refreshPurchases();
      closeModal();
    } catch (error) {
      console.error(error.response?.data || error);
      alert(error.response?.data?.message || "Failed to add purchase");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Purchase</h2>

        <form onSubmit={handleSubmit}>
          <select
            name="product"
            value={formData.product}
            onChange={handleChange}
            required
          >
            <option value="">Select Product</option>

            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>

          <select
            name="supplier"
            value={formData.supplier}
            onChange={handleChange}
            required
          >
            <option value="">Select Supplier</option>

            {suppliers.map((supplier) => (
              <option key={supplier._id} value={supplier._id}>
                {supplier.company}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="purchasePrice"
            placeholder="Purchase Price"
            value={formData.purchasePrice}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="purchaseDate"
            value={formData.purchaseDate}
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

export default AddPurchaseModal;