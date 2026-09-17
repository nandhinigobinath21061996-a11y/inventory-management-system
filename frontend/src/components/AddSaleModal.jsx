import { useEffect, useState } from "react";
import API from "../api/productApi";
import "../css/purchases.css";

const AddSaleModal = ({ closeModal, refreshSales }) => {
  const [products, setProducts] = useState([]);

  const [selectedName, setSelectedName] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [quantity, setQuantity] = useState("");

  const [cartItems, setCartItems] = useState([]);

  const [formData, setFormData] = useState({
    customerName: "",
    saleDate: "",
    notes: "",
  });

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products");
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Product names
  const uniqueProducts = [
    ...new Set(products.map((product) => product.name)),
  ];

  // Sizes
  const availableSizes = [
    ...new Set(
      products
        .filter((product) => product.name === selectedName)
        .map((product) => product.size)
    ),
  ];

  // Colors
  const availableColors = [
    ...new Set(
      products
        .filter(
          (product) =>
            product.name === selectedName &&
            product.size === selectedSize
        )
        .map((product) => product.color)
    ),
  ];

  // Add selected product
  const addProduct = () => {
    if (!selectedProduct) {
      alert("Please select a product");
      return;
    }

    const qty = Number(quantity);

    if (!qty || qty < 1) {
      alert("Please enter a valid quantity");
      return;
    }

    if (qty > selectedProduct.quantity) {
      alert("Insufficient stock");
      return;
    }

    // Prevent same product twice
    const alreadyAdded = cartItems.find(
      (item) => item.product === selectedProduct._id
    );

    if (alreadyAdded) {
      alert("Product already added");
      return;
    }

    const item = {
      product: selectedProduct._id,
      name: selectedProduct.name,
      size: selectedProduct.size,
      color: selectedProduct.color,
      quantity: qty,
      sellingPrice: Number(selectedProduct.sellingPrice),
      totalAmount:
        qty * Number(selectedProduct.sellingPrice),
    };

    setCartItems([...cartItems, item]);

    // Reset product selection
    setSelectedName("");
    setSelectedSize("");
    setSelectedColor("");
    setSelectedProduct(null);
    setQuantity("");
  };

  // Remove product
  const removeProduct = (productId) => {
    setCartItems(
      cartItems.filter(
        (item) => item.product !== productId
      )
    );
  };

  // Grand total
  const grandTotal = cartItems.reduce(
    (total, item) => total + item.totalAmount,
    0
  );

  // Save sale
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Please add at least one product");
      return;
    }

    try {
      const saleData = {
        items: cartItems.map((item) => ({
          product: item.product,
          quantity: item.quantity,
          sellingPrice: item.sellingPrice,
        })),

        customerName: formData.customerName,
        saleDate: formData.saleDate,
        notes: formData.notes,
      };

      await API.post("/sales", saleData);

      alert("Sale added successfully");

      refreshSales();
      closeModal();
    } catch (error) {
      console.error("Error adding sale:", error);

      alert(
        error.response?.data?.message ||
          "Failed to add sale"
      );
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>Add Sale</h2>

        <form onSubmit={handleSubmit}>

          {/* PRODUCT */}
          <select
            value={selectedName}
            onChange={(e) => {
              setSelectedName(e.target.value);
              setSelectedSize("");
              setSelectedColor("");
              setSelectedProduct(null);
            }}
          >
            <option value="">Select Product</option>

            {uniqueProducts.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>


          {/* SIZE */}
          <select
            value={selectedSize}
            onChange={(e) => {
              setSelectedSize(e.target.value);
              setSelectedColor("");
              setSelectedProduct(null);
            }}
            disabled={!selectedName}
          >
            <option value="">Select Size</option>

            {availableSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>


          {/* COLOR */}
          <select
            value={selectedColor}
            onChange={(e) => {
              const color = e.target.value;

              setSelectedColor(color);

              const product = products.find(
                (product) =>
                  product.name === selectedName &&
                  product.size === selectedSize &&
                  product.color === color
              );

              setSelectedProduct(product || null);
            }}
            disabled={!selectedSize}
          >
            <option value="">Select Color</option>

            {availableColors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>


          {/* PRODUCT DETAILS */}
          {selectedProduct && (
            <div className="product-details">

              <div className="detail-item">
                <span>Brand</span>
                <strong>
                  {selectedProduct.brand}
                </strong>
              </div>

              <div className="detail-item">
                <span>Category</span>
                <strong>
                  {selectedProduct.category}
                </strong>
              </div>

              <div className="detail-item">
                <span>Available Stock</span>
                <strong>
                  {selectedProduct.quantity}
                </strong>
              </div>

              <div className="detail-item">
                <span>Selling Price</span>
                <strong>
                  ₹{selectedProduct.sellingPrice}
                </strong>
              </div>

            </div>
          )}


          {/* QUANTITY */}
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            min="1"
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value)
            }
          />


          {/* ADD PRODUCT */}
          <button
            type="button"
            onClick={addProduct}
            style={{
              background: "#1685bd",
              color: "#fff",
              border: "none",
              padding: "10px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            + Add Product
          </button>


          {/* SELECTED PRODUCTS */}
          {cartItems.length > 0 && (
            <div
              style={{
                marginTop: "15px",
                borderTop: "1px solid #ddd",
                paddingTop: "10px",
              }}
            >

              <h3>Selected Products</h3>

              {cartItems.map((item) => (
                <div
                  key={item.product}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 0",
                    borderBottom:
                      "1px solid #eee",
                  }}
                >

                  <div>

                    <strong>
                      {item.name}
                    </strong>

                    <div
                      style={{
                        fontSize: "12px",
                        color: "#777",
                      }}
                    >
                      {item.size} • {item.color}
                    </div>

                    <div>
                      {item.quantity} × ₹
                      {item.sellingPrice}
                    </div>

                  </div>


                  <div>

                    <strong>
                      ₹
                      {item.totalAmount.toLocaleString(
                        "en-IN"
                      )}
                    </strong>

                    <button
                      type="button"
                      onClick={() =>
                        removeProduct(item.product)
                      }
                      style={{
                        marginLeft: "10px",
                        border: "none",
                        background: "#df515c",
                        color: "#fff",
                        borderRadius: "4px",
                        padding: "4px 7px",
                        cursor: "pointer",
                      }}
                    >
                      Remove
                    </button>

                  </div>

                </div>
              ))}


              {/* TOTAL */}
              <div
                style={{
                  textAlign: "right",
                  marginTop: "12px",
                  fontSize: "18px",
                }}
              >
                <strong>
                  Total: ₹
                  {grandTotal.toLocaleString(
                    "en-IN"
                  )}
                </strong>
              </div>

            </div>
          )}


          {/* CUSTOMER */}
          <input
            type="text"
            name="customerName"
            placeholder="Customer Name"
            value={formData.customerName}
            onChange={(e) =>
              setFormData({
                ...formData,
                customerName: e.target.value,
              })
            }
          />


          {/* DATE */}
          <input
            type="date"
            name="saleDate"
            value={formData.saleDate}
            onChange={(e) =>
              setFormData({
                ...formData,
                saleDate: e.target.value,
              })
            }
          />


          {/* NOTES */}
          <textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={(e) =>
              setFormData({
                ...formData,
                notes: e.target.value,
              })
            }
          />


          {/* BUTTONS */}
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

export default AddSaleModal;