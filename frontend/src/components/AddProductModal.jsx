import { useEffect, useState } from "react";
import API from "../api/productApi";
import "../css/addProductModal.css";

const AddProductModal = ({ closeModal, refreshProducts }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [imagePreview, setImagePreview] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "Men",
    size: "M",
    color: "",
    quantity: "",
    purchasePrice: "",
    sellingPrice: "",
    supplier: "",
    image: "",
  });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const { data } = await API.get("/suppliers");
      setSuppliers(data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Compress image before storing it
  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (event) => {
        const img = new Image();

        img.src = event.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");

          const maxWidth = 700;
          const maxHeight = 700;

          let width = img.width;
          let height = img.height;

          // Maintain original aspect ratio
          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(
              maxWidth / width,
              maxHeight / height
            );

            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");

          ctx.drawImage(
            img,
            0,
            0,
            width,
            height
          );

          const compressedImage =
            canvas.toDataURL(
              "image/jpeg",
              0.7
            );

          resolve(compressedImage);
        };

        img.onerror = () => {
          reject(
            new Error("Unable to load image")
          );
        };
      };

      reader.onerror = () => {
        reject(
          new Error("Unable to read image")
        );
      };
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Check file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    try {
      const compressedImage =
        await compressImage(file);

      setImagePreview(compressedImage);

      setFormData((prev) => ({
        ...prev,
        image: compressedImage,
      }));
    } catch (error) {
      console.error(
        "Image processing error:",
        error
      );

      alert("Failed to process image.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/products",
        formData
      );

      alert(
        "Product added successfully"
      );

      refreshProducts();
      closeModal();

    } catch (error) {
      console.error(
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
          "Failed to add product"
      );
    }
  };

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h2>Add Product</h2>

        <form onSubmit={handleSubmit}>

          {/* ================= IMAGE ================= */}

          <div className="product-image-upload">

            <label>
              Product Image
            </label>

            <div className="image-upload-box">

              {imagePreview ? (

                <img
                  src={imagePreview}
                  alt="Product Preview"
                  className="image-preview"
                />

              ) : (

                <div className="image-placeholder">
                  <span>+</span>
                  <p>
                    Add Product Image
                  </p>
                </div>

              )}

            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />

            <small>
              JPG, PNG or WEBP
            </small>

          </div>


          {/* ================= NAME ================= */}

          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            required
          />


          {/* ================= BRAND ================= */}

          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={formData.brand}
            onChange={handleChange}
            required
          />


          {/* ================= CATEGORY ================= */}

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Men">
              Men
            </option>

            <option value="Women">
              Women
            </option>

            <option value="Kids">
              Kids
            </option>
          </select>


          {/* ================= SIZE ================= */}

          <select
            name="size"
            value={formData.size}
            onChange={handleChange}
          >
            <option value="S">
              S
            </option>

            <option value="M">
              M
            </option>

            <option value="L">
              L
            </option>

            <option value="XL">
              XL
            </option>

            <option value="XXL">
              XXL
            </option>
          </select>


          {/* ================= COLOR ================= */}

          <input
            type="text"
            name="color"
            placeholder="Color"
            value={formData.color}
            onChange={handleChange}
            required
          />


          {/* ================= QUANTITY ================= */}

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            min="0"
          />


          {/* ================= PURCHASE PRICE ================= */}

          <input
            type="number"
            name="purchasePrice"
            placeholder="Purchase Price"
            value={formData.purchasePrice}
            onChange={handleChange}
            required
            min="0"
          />


          {/* ================= SELLING PRICE ================= */}

          <input
            type="number"
            name="sellingPrice"
            placeholder="Selling Price"
            value={formData.sellingPrice}
            onChange={handleChange}
            required
            min="0"
          />


          {/* ================= SUPPLIER ================= */}

          <select
            name="supplier"
            value={formData.supplier}
            onChange={handleChange}
            required
          >
            <option value="">
              Select Supplier
            </option>

            {suppliers.map((supplier) => (
              <option
                key={supplier._id}
                value={supplier._id}
              >
                {supplier.company}
              </option>
            ))}
          </select>


          {/* ================= BUTTONS ================= */}

          <div className="modal-buttons">

            <button type="submit">
              Save
            </button>

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

export default AddProductModal;