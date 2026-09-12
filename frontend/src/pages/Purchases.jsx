import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../api/productApi";
import "../css/purchases.css";
import AddPurchaseModal from "../components/AddPurchaseModal";

import { FaBoxOpen } from "react-icons/fa";

const Purchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const { data } = await API.get("/purchases");

      setPurchases(data);
    } catch (error) {
      console.error(
        "Error fetching purchases:",
        error
      );
    }
  };

  return (
    <div className="purchases-page">

      {/* ================= SIDEBAR ================= */}

      <Sidebar />


      {/* ================= MAIN ================= */}

      <div className="purchases-layout">

        <main className="purchases-main">

          {/* ================= PAGE HEADER ================= */}

          <div className="purchases-page-header">

            <div>
              <h1>Purchases</h1>

              <p>
                {purchases.length} purchases •
                Manage your product purchases
              </p>
            </div>

            <button
              className="add-purchase-btn"
              onClick={() => setShowModal(true)}
            >
              + Add Purchase
            </button>

          </div>


          {/* ================= PURCHASE TABLE ================= */}

          <div className="purchases-card">

            <div className="purchases-card-header">

              <div>
                <h2>
                  Purchase History
                </h2>

                <span>
                  Recent inventory purchases
                </span>
              </div>

            </div>


            <div className="purchases-table-wrapper">

              <table className="purchases-table">

                <thead>

                  <tr>

                    <th>#</th>

                    <th>Product</th>

                    <th>Supplier</th>

                    <th>Quantity</th>

                    <th>Purchase Price</th>

                    <th>Total Amount</th>

                    <th>Date</th>

                  </tr>

                </thead>


                <tbody>

                  {purchases.length > 0 ? (

                    purchases.map(
                      (purchase, index) => {

                        const product =
                          purchase.product;

                        return (
                          <tr
                            key={
                              purchase._id
                            }
                          >

                            {/* NUMBER */}

                            <td className="purchase-number">
                              {index + 1}
                            </td>


                            {/* PRODUCT */}

                            <td>

                              <div className="purchase-product">

                                <div className="purchase-product-image">

                                  {product?.image ? (

                                    <img
                                      src={
                                        product.image
                                      }
                                      alt={
                                        product.name ||
                                        "Product"
                                      }
                                    />

                                  ) : (

                                    <FaBoxOpen />

                                  )}

                                </div>


                                <div className="purchase-product-info">

                                  <strong>
                                    {product?.name ||
                                      "N/A"}
                                  </strong>

                                  <span>
                                    {product?.brand ||
                                      "No Brand"}
                                  </span>

                                </div>

                              </div>

                            </td>


                            {/* SUPPLIER */}

                            <td>
                              {purchase.supplier
                                ?.company ||
                                purchase.supplier
                                  ?.name ||
                                "N/A"}
                            </td>


                            {/* QUANTITY */}

                            <td className="purchase-quantity">
                              {purchase.quantity}
                            </td>


                            {/* PURCHASE PRICE */}

                            <td>
                              ₹
                              {Number(
                                purchase.purchasePrice
                              ).toLocaleString(
                                "en-IN"
                              )}
                            </td>


                            {/* TOTAL */}

                            <td className="purchase-total">
                              ₹
                              {Number(
                                purchase.totalAmount
                              ).toLocaleString(
                                "en-IN"
                              )}
                            </td>


                            {/* DATE */}

                            <td>
                              {purchase.purchaseDate
                                ? new Date(
                                    purchase.purchaseDate
                                  ).toLocaleDateString()
                                : "N/A"}
                            </td>

                          </tr>
                        );
                      }
                    )

                  ) : (

                    <tr>

                      <td
                        colSpan="7"
                        className="empty-purchases"
                      >
                        No purchases found
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>


          {/* ================= ADD PURCHASE MODAL ================= */}

          {showModal && (

            <AddPurchaseModal
              closeModal={() =>
                setShowModal(false)
              }
              refreshPurchases={
                fetchPurchases
              }
            />

          )}

        </main>

      </div>

    </div>
  );
};

export default Purchases;