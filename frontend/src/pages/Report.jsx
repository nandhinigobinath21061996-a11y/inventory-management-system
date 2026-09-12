import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../api/productApi";
import "../css/reports.css";

import {
  FaChartLine,
  FaShoppingCart,
  FaBoxOpen,
  FaExclamationTriangle,
} from "react-icons/fa";

const Reports = () => {
  const [sales, setSales] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [products, setProducts] = useState([]);

  const [totalSales, setTotalSales] = useState(0);
  const [totalPurchases, setTotalPurchases] = useState(0);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const [
        salesRes,
        purchaseRes,
        productsRes,
      ] = await Promise.all([
        API.get("/reports/sales"),
        API.get("/reports/purchases"),
        API.get("/products"),
      ]);

      setSales(
        salesRes.data.sales || []
      );

      setPurchases(
        purchaseRes.data.purchases || []
      );

      setProducts(
        productsRes.data || []
      );

      setTotalSales(
        salesRes.data.totalSalesAmount || 0
      );

      setTotalPurchases(
        purchaseRes.data.totalPurchaseAmount || 0
      );
    } catch (error) {
      console.error(
        "Error fetching reports:",
        error
      );
    }
  };

  const formatAmount = (amount) => {
    return Number(amount || 0).toLocaleString(
      "en-IN"
    );
  };

  /* =====================================================
     TOP SELLING PRODUCTS
  ===================================================== */

  const topSellingProducts = Object.values(
    sales.reduce((acc, sale) => {
      const productId =
        sale.product?._id ||
        sale.product?.name ||
        "unknown";

      if (!acc[productId]) {
        acc[productId] = {
          product: sale.product,
          quantity: 0,
        };
      }

      acc[productId].quantity +=
        Number(sale.quantity || 0);

      return acc;
    }, {})
  )
    .sort(
      (a, b) =>
        b.quantity - a.quantity
    )
    .slice(0, 4);

  /* =====================================================
     LOW STOCK PRODUCTS
  ===================================================== */

  const lowStockProducts =
    products
      .filter(
        (product) =>
          Number(product.quantity) <= 5
      )
      .slice(0, 5);

  /* =====================================================
     CURRENT STOCK
  ===================================================== */

  const totalStock =
    products.reduce(
      (total, product) =>
        total +
        Number(product.quantity || 0),
      0
    );

  return (
    <div className="reports-page">

      {/* ================= SIDEBAR ================= */}

      <Sidebar />


      {/* ================= MAIN ================= */}

      <div className="reports-layout">

        <main className="reports-main">

          {/* ================= PAGE HEADER ================= */}

          <div className="reports-page-header">

            <div>

              <h1>
                Reports
              </h1>

              <p>
                Inventory performance and business overview
              </p>

            </div>

          </div>


          {/* ================= SUMMARY ================= */}

          <section className="reports-summary">

            {/* SALES */}

            <div className="report-summary-card">

              <div className="report-summary-icon sales-icon">
                <FaChartLine />
              </div>

              <div>

                <span>
                  Total Sales
                </span>

                <strong>
                  ₹ {formatAmount(totalSales)}
                </strong>

              </div>

            </div>


            {/* PURCHASES */}

            <div className="report-summary-card">

              <div className="report-summary-icon purchase-icon">
                <FaShoppingCart />
              </div>

              <div>

                <span>
                  Total Purchases
                </span>

                <strong>
                  ₹ {formatAmount(totalPurchases)}
                </strong>

              </div>

            </div>


            {/* STOCK */}

            <div className="report-summary-card">

              <div className="report-summary-icon stock-icon">
                <FaBoxOpen />
              </div>

              <div>

                <span>
                  Total Stock
                </span>

                <strong>
                  {totalStock}
                </strong>

              </div>

            </div>


            {/* LOW STOCK */}

            <div className="report-summary-card">

              <div className="report-summary-icon low-stock-icon">
                <FaExclamationTriangle />
              </div>

              <div>

                <span>
                  Low Stock Items
                </span>

                <strong>
                  {lowStockProducts.length}
                </strong>

              </div>

            </div>

          </section>


          {/* ================= ANALYTICS ================= */}

          <section className="reports-grid">

            {/* =================================================
                TOP SELLING
            ================================================= */}

            <div className="report-card">

              <div className="report-card-header">

                <div>

                  <h2>
                    Top Selling Products
                  </h2>

                  <span>
                    Best performing products
                  </span>

                </div>

              </div>


              <div className="top-selling-list">

                {topSellingProducts.length > 0 ? (

                  topSellingProducts.map(
                    (item, index) => {

                      const product =
                        item.product;

                      return (
                        <div
                          className="top-selling-row"
                          key={
                            product?._id ||
                            product?.name ||
                            index
                          }
                        >

                          <span className="rank">
                            {index + 1}
                          </span>


                          <div className="report-product-image">

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


                          <div className="top-selling-info">

                            <strong>
                              {product?.name ||
                                "Product"}
                            </strong>

                            <span>
                              {product?.brand ||
                                "No Brand"}
                            </span>

                          </div>


                          <strong className="sold-quantity">
                            {item.quantity} pcs
                          </strong>

                        </div>
                      );
                    }
                  )

                ) : (

                  <div className="report-empty">
                    No sales data available
                  </div>

                )}

              </div>

            </div>


            {/* =================================================
                LOW STOCK
            ================================================= */}

            <div className="report-card">

              <div className="report-card-header">

                <div>

                  <h2>
                    Stock Status
                  </h2>

                  <span>
                    Products requiring attention
                  </span>

                </div>

              </div>


              <div className="stock-status-list">

                {lowStockProducts.length > 0 ? (

                  lowStockProducts.map(
                    (product) => (

                      <div
                        className="stock-status-row"
                        key={product._id}
                      >

                        <div className="stock-product">

                          <div className="report-product-image">

                            {product.image ? (

                              <img
                                src={product.image}
                                alt={product.name}
                              />

                            ) : (

                              <FaBoxOpen />

                            )}

                          </div>


                          <div>

                            <strong>
                              {product.name}
                            </strong>

                            <span>
                              {product.brand ||
                                "No Brand"}
                            </span>

                          </div>

                        </div>


                        <div className="stock-value">

                          <strong>
                            {product.quantity}
                          </strong>

                          <span>
                            Low Stock
                          </span>

                        </div>

                      </div>

                    )
                  )

                ) : (

                  <div className="healthy-stock">

                    <strong>
                      All products are sufficiently stocked
                    </strong>

                    <span>
                      No low stock items
                    </span>

                  </div>

                )}

              </div>

            </div>

          </section>


          {/* ================= RECENT ACTIVITY ================= */}

          <section className="recent-grid">

            {/* =================================================
                RECENT SALES
            ================================================= */}

            <div className="report-card">

              <div className="report-card-header">

                <div>

                  <h2>
                    Recent Sales
                  </h2>

                  <span>
                    Latest sales transactions
                  </span>

                </div>

              </div>


              <div className="recent-list">

                {sales.length > 0 ? (

                  sales
                    .slice(0, 5)
                    .map((sale) => (

                      <div
                        className="recent-row"
                        key={sale._id}
                      >

                        <div>

                          <strong>
                            {sale.product?.name ||
                              "Product"}
                          </strong>

                          <span>
                            {sale.customerName ||
                              "Walk-in Customer"}
                          </span>

                        </div>


                        <div className="recent-right">

                          <strong className="sale-amount">
                            ₹
                            {formatAmount(
                              sale.totalAmount
                            )}
                          </strong>

                          <span>
                            {sale.quantity} pcs
                          </span>

                        </div>

                      </div>

                    ))

                ) : (

                  <div className="report-empty">
                    No sales found
                  </div>

                )}

              </div>

            </div>


            {/* =================================================
                RECENT PURCHASES
            ================================================= */}

            <div className="report-card">

              <div className="report-card-header">

                <div>

                  <h2>
                    Recent Purchases
                  </h2>

                  <span>
                    Latest purchase transactions
                  </span>

                </div>

              </div>


              <div className="recent-list">

                {purchases.length > 0 ? (

                  purchases
                    .slice(0, 5)
                    .map((purchase) => (

                      <div
                        className="recent-row"
                        key={
                          purchase._id
                        }
                      >

                        <div>

                          <strong>
                            {purchase.product
                              ?.name ||
                              "Product"}
                          </strong>

                          <span>
                            {purchase.supplier
                              ?.company ||
                              "Supplier"}
                          </span>

                        </div>


                        <div className="recent-right">

                          <strong className="purchase-amount">
                            ₹
                            {formatAmount(
                              purchase.totalAmount
                            )}
                          </strong>

                          <span>
                            {purchase.quantity} pcs
                          </span>

                        </div>

                      </div>

                    ))

                ) : (

                  <div className="report-empty">
                    No purchases found
                  </div>

                )}

              </div>

            </div>

          </section>

        </main>

      </div>

    </div>
  );
};

export default Reports;