import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../api/productApi";
import AddSaleModal from "../components/AddSaleModal";
import "../css/sales.css";
import { FaBoxOpen } from "react-icons/fa";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const { data } = await API.get("/sales");
      setSales(data);
    } catch (error) {
      console.error("Error fetching sales:", error);
    }
  };

  return (
    <div className="sales-page">
      <Sidebar />

      <div className="sales-layout">
        <main className="sales-main">

          {/* HEADER */}
          <div className="sales-page-header">
            <div>
              <h1>Sales</h1>
              <p>
                {sales.length} sales • Manage your product sales
              </p>
            </div>

            <button
              className="add-sale-btn"
              onClick={() => setShowModal(true)}
            >
              + Add Sale
            </button>
          </div>


          {/* SALES CARD */}
          <div className="sales-card">

            <div className="sales-card-header">
              <div>
                <h2>Sales History</h2>
                <span>Recent product sales</span>
              </div>
            </div>


            {/* TABLE */}
            <div className="sales-table-wrapper">

              <table className="sales-table">

                <thead>
                  <tr>
                    <th>#</th>
                    <th>Products</th>
                    <th>Customer</th>
                    <th>Total Amount</th>
                    <th>Sale Date</th>
                  </tr>
                </thead>


                <tbody>

                  {sales.length > 0 ? (

                    sales.map((sale, index) => (

                      <tr key={sale._id}>

                        {/* NUMBER */}
                        <td className="sale-number">
                          {index + 1}
                        </td>


                        {/* PRODUCTS */}
                        <td>

                          <div className="sale-products-list">

                            {sale.items?.map((item) => {

                              const product = item.product;

                              return (

                                <div
                                  key={item.product?._id}
                                  className="sale-product"
                                >

                                  <div className="sale-product-image">

                                    {product?.image ? (

                                      <img
                                        src={product.image}
                                        alt={
                                          product.name ||
                                          "Product"
                                        }
                                      />

                                    ) : (

                                      <FaBoxOpen />

                                    )}

                                  </div>


                                  <div className="sale-product-info">

                                    <strong>
                                      {product?.name || "N/A"}
                                    </strong>

                                    <span>
                                      {product?.brand || "No Brand"}
                                    </span>

                                    <small>
                                      {item.quantity} × ₹
                                      {Number(
                                        item.sellingPrice
                                      ).toLocaleString("en-IN")}
                                    </small>

                                  </div>

                                </div>

                              );
                            })}

                          </div>

                        </td>


                        {/* CUSTOMER */}
                        <td>
                          {sale.customerName ||
                            "Walk-in Customer"}
                        </td>


                        {/* TOTAL */}
                        <td className="sale-total">
                          ₹
                          {Number(
                            sale.totalAmount
                          ).toLocaleString("en-IN")}
                        </td>


                        {/* DATE */}
                        <td>
                          {sale.saleDate
                            ? new Date(
                                sale.saleDate
                              ).toLocaleDateString()
                            : "N/A"}
                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan="5"
                        className="empty-sales"
                      >
                        No sales found
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>


          {/* ADD SALE MODAL */}

          {showModal && (

            <AddSaleModal
              closeModal={() =>
                setShowModal(false)
              }
              refreshSales={fetchSales}
            />

          )}

        </main>
      </div>
    </div>
  );
};

export default Sales;