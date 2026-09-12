import { useState } from "react";
import API from "../api/productApi";
import "../css/addSupplierModal.css";

const AddSupplierModal = ({ closeModal, refreshSuppliers }) => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/suppliers", formData);

      alert("Supplier added successfully");

      refreshSuppliers();
      closeModal();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add supplier");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Supplier</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Supplier Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
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

export default AddSupplierModal;