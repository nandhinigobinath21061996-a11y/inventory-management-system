import { useEffect, useState } from "react";
import API from "../api/productApi";
import "../css/addSupplierModal.css";

const EditSupplierModal = ({
  supplier,
  closeModal,
  refreshSuppliers,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (supplier) {
      setFormData({
        name: supplier.name || "",
        company: supplier.company || "",
        phone: supplier.phone || "",
        address: supplier.address || "",
      });
    }
  }, [supplier]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/suppliers/${supplier._id}`, formData);

      alert("Supplier updated successfully");

      refreshSuppliers();
      closeModal();
    } catch (error) {
      console.error(error.response?.data || error);

      alert(
        error.response?.data?.message ||
          "Failed to update supplier"
      );
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Supplier</h2>

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
            required
          />

          <div className="modal-buttons">
            <button type="submit">Update</button>

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

export default EditSupplierModal;