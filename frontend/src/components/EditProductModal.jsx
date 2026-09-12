import { useEffect, useState } from "react";
import API from "../api/productApi";
import "../css/addProductModal.css";

const EditProductModal = ({
  product,
  closeModal,
  refreshProducts,
}) => {
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

    if (product) {
      setFormData({
        name: product.name || "",
        brand: product.brand || "",
        category: product.category || "Men",
        size: product.size || "M",
        color: product.color || "",
        quantity: product.quantity ?? "",
        purchasePrice: product.purchasePrice ?? "",
        sellingPrice: product.sellingPrice ?? "",
        supplier: product.supplier?._id || "",
        image: product.image || "",
      });

      setImagePreview(product.image || "");
    }
  }, [product]);

  const fetchSuppliers = async () => {
    try {
      const { data } = await API.get("/suppliers");
      setSuppliers(data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Compress image before saving
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

          const compressedImage = canvas.toDataURL(
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
      await API.put(
        `/products/${product._id}`,
        formData
      );

      alert(
        "Product updated successfully"
      );

      refreshProducts();
      closeModal();
    } catch (error) {
      console.error(
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
          "Failed to update product"
      );
    }
  };

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h2>Edit Product</h2>

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
                  alt={product?.name || "Product Preview"}
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
              Select a new image to replace
              the current product image.
            </small>

          </div>


          {/* ================= NAME ================= */}

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />


          {/* ================= BRAND ================= */}

          <input
            type="text"
            name="brand"
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
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>


          {/* ================= SIZE ================= */}

          <select
            name="size"
            value={formData.size}
            onChange={handleChange}
          >
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>


          {/* ================= COLOR ================= */}

          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            required
          />


          {/* ================= QUANTITY ================= */}

          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            min="0"
          />


          {/* ================= PURCHASE PRICE ================= */}

          <input
            type="number"
            name="purchasePrice"
            value={formData.purchasePrice}
            onChange={handleChange}
            required
            min="0"
          />


          {/* ================= SELLING PRICE ================= */}

          <input
            type="number"
            name="sellingPrice"
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
              Update
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

export default EditProductModal;