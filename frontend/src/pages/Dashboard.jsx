import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../api/productApi";
import "../css/dashboard.css";

import {
  FaBoxOpen,
  FaShoppingCart,
  FaCashRegister,
  FaExclamationCircle,
} from "react-icons/fa";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSuppliers: 0,
    totalPurchases: 0,
    totalSales: 0,
    lowStockCount: 0,
    lowStock: [],
  });

  const [sales, setSales] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [products, setProducts] = useState([]);

  const [totalSalesAmount, setTotalSalesAmount] = useState(0);
  const [totalPurchaseAmount, setTotalPurchaseAmount] =
    useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [
        dashboardRes,
        salesRes,
        purchaseRes,
        productsRes,
      ] = await Promise.all([
        API.get("/reports/dashboard"),
        API.get("/reports/sales"),
        API.get("/reports/purchases"),
        API.get("/products"),
      ]);

      const dashboardData = dashboardRes.data || {};

      setStats({
        totalProducts: dashboardData.totalProducts || 0,
        totalSuppliers: dashboardData.totalSuppliers || 0,
        totalPurchases: dashboardData.totalPurchases || 0,
        totalSales: dashboardData.totalSales || 0,
        lowStockCount: dashboardData.lowStockCount || 0,
        lowStock: dashboardData.lowStock || [],
      });

      setSales(salesRes.data?.sales || []);
      setPurchases(purchaseRes.data?.purchases || []);
      setProducts(productsRes.data || []);

      setTotalSalesAmount(
        salesRes.data?.totalSalesAmount || 0
      );

      setTotalPurchaseAmount(
        purchaseRes.data?.totalPurchaseAmount || 0
      );
    } catch (error) {
      console.error(
        "Error fetching dashboard data:",
        error
      );
    }
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

      acc[productId].quantity += Number(
        sale.quantity || 0
      );

      return acc;
    }, {})
  )
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 4);

  /* =====================================================
     LOW STOCK PRODUCTS
  ===================================================== */

  const lowStockProducts = products
    .filter(
      (product) => Number(product.quantity) <= 5
    )
    .slice(0, 5);

  /* =====================================================
     TOTAL STOCK
  ===================================================== */

  const totalStock = products.reduce(
    (total, product) =>
      total + Number(product.quantity || 0),
    0
  );

  return (
    <div className="dashboard">

      {/* ================= SIDEBAR ================= */}

      <Sidebar />

      {/* ================= MAIN ================= */}

      <div className="dashboard-layout">

        <main className="dashboard-main">

          {/* =================================================
             DASHBOARD HEADING
          ================================================= */}

          <div className="dashboard-overview-header">

            <div>
              <h1>
                Inventory Overview
              </h1>

              <p>
                Track your sales, purchases, stock and
                inventory alerts at a glance.
              </p>
            </div>

          </div>


          {/* =================================================
             TOP SUMMARY
          ================================================= */}

          <section className="dashboard-summary">

            {/* TOTAL SALES */}

            <div className="dashboard-summary-card">

              <div className="summary-icon sales-summary-icon">
                <FaCashRegister />
              </div>

              <div className="summary-content">

                <span>
                  Total Sales
                </span>

                <strong>
                  ₹{" "}
                  {Number(
                    totalSalesAmount || 0
                  ).toLocaleString("en-IN")}
                </strong>

              </div>

            </div>


            {/* TOTAL PURCHASES */}

            <div className="dashboard-summary-card">

              <div className="summary-icon purchase-summary-icon">
                <FaShoppingCart />
              </div>

              <div className="summary-content">

                <span>
                  Total Purchases
                </span>

                <strong>
                  ₹{" "}
                  {Number(
                    totalPurchaseAmount || 0
                  ).toLocaleString("en-IN")}
                </strong>

              </div>

            </div>


            {/* TOTAL STOCK */}

            <div className="dashboard-summary-card">

              <div className="summary-icon stock-summary-icon">
                <FaBoxOpen />
              </div>

              <div className="summary-content">

                <span>
                  Total Stock
                </span>

                <strong>
                  {totalStock}
                </strong>

              </div>

            </div>


            {/* LOW STOCK */}

            <div className="dashboard-summary-card">

              <div className="summary-icon low-summary-icon">
                <FaExclamationCircle />
              </div>

              <div className="summary-content">

                <span>
                  Low Stock Items
                </span>

                <strong>
                  {stats.lowStockCount}
                </strong>

              </div>

            </div>

          </section>


          {/* =================================================
             MIDDLE SECTION
          ================================================= */}

          <section className="middle-section">

            {/* ================= PRODUCT DETAILS ================= */}

            <div className="dashboard-card">

              <div className="card-header">

                <h2>
                  PRODUCT DETAILS
                </h2>

              </div>

              <div className="product-details">

                <div className="product-row">

                  <span>
                    Products
                  </span>

                  <strong>
                    {stats.totalProducts}
                  </strong>

                </div>


                <div className="product-row">

                  <span>
                    Suppliers
                  </span>

                  <strong>
                    {stats.totalSuppliers}
                  </strong>

                </div>


                <div className="product-row">

                  <span>
                    Purchases
                  </span>

                  <strong>
                    {stats.totalPurchases}
                  </strong>

                </div>


                <div className="product-row">

                  <span>
                    Sales
                  </span>

                  <strong className="blue">
                    {stats.totalSales}
                  </strong>

                </div>

              </div>

            </div>


            {/* ================= TOP SELLING PRODUCTS ================= */}

            <div className="dashboard-card top-selling-card">

              <div className="card-header">

                <div>

                  <h2>
                    TOP SELLING PRODUCTS
                  </h2>

                  <span className="card-subtitle">
                    Best performing products
                  </span>

                </div>

              </div>

              <div className="dashboard-top-selling-list">

                {topSellingProducts.length > 0 ? (

                  topSellingProducts.map(
                    (item, index) => {

                      const product =
                        item.product;

                      return (
                        <div
                          className="dashboard-top-selling-row"
                          key={
                            product?._id ||
                            product?.name ||
                            index
                          }
                        >

                          <span className="dashboard-rank">
                            {index + 1}
                          </span>


                          <div className="dashboard-top-image">

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


                          <div className="dashboard-top-info">

                            <strong>
                              {product?.name ||
                                "Product"}
                            </strong>

                            <span>
                              {product?.brand ||
                                "No Brand"}
                            </span>

                          </div>


                          <strong className="dashboard-sold">
                            {item.quantity} pcs
                          </strong>

                        </div>
                      );
                    }
                  )

                ) : (

                  <div className="dashboard-empty">
                    No sales data available
                  </div>

                )}

              </div>

            </div>

          </section>


          {/* =================================================
             BOTTOM - RECENT ACTIVITY
          ================================================= */}

          <section className="recent-dashboard-grid">

            {/* ================= RECENT SALES ================= */}

            <div className="dashboard-card">

              <div className="card-header">

                <div>

                  <h2>
                    RECENT SALES
                  </h2>

                  <span className="card-subtitle">
                    Latest sales transactions
                  </span>

                </div>

              </div>

              <div className="recent-dashboard-list">

                {sales.length > 0 ? (

                  sales
                    .slice(0, 5)
                    .map((sale) => (

                      <div
                        className="recent-dashboard-row"
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


                        <div className="recent-dashboard-right">

                          <strong className="recent-sale-amount">
                            ₹
                            {Number(
                              sale.totalAmount || 0
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </strong>

                          <span>
                            {sale.quantity} pcs
                          </span>

                        </div>

                      </div>

                    ))

                ) : (

                  <div className="dashboard-empty">
                    No sales found
                  </div>

                )}

              </div>

            </div>


            {/* ================= RECENT PURCHASES ================= */}

            <div className="dashboard-card">

              <div className="card-header">

                <div>

                  <h2>
                    RECENT PURCHASES
                  </h2>

                  <span className="card-subtitle">
                    Latest purchase transactions
                  </span>

                </div>

              </div>

              <div className="recent-dashboard-list">

                {purchases.length > 0 ? (

                  purchases
                    .slice(0, 5)
                    .map((purchase) => (

                      <div
                        className="recent-dashboard-row"
                        key={purchase._id}
                      >

                        <div>

                          <strong>
                            {purchase.product?.name ||
                              "Product"}
                          </strong>

                          <span>
                            {purchase.supplier?.company ||
                              "Supplier"}
                          </span>

                        </div>


                        <div className="recent-dashboard-right">

                          <strong className="recent-purchase-amount">
                            ₹
                            {Number(
                              purchase.totalAmount || 0
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </strong>

                          <span>
                            {purchase.quantity} pcs
                          </span>

                        </div>

                      </div>

                    ))

                ) : (

                  <div className="dashboard-empty">
                    No purchases found
                  </div>

                )}

              </div>

            </div>

          </section>


          {/* =================================================
             STOCK STATUS
          ================================================= */}

          <section className="low-stock-section">

            <div className="low-stock-header">

              <h2>
                STOCK STATUS
              </h2>

              <FaExclamationCircle />

            </div>


            <div className="low-stock-list">

              {lowStockProducts.length > 0 ? (

                lowStockProducts.map(
                  (product) => (

                    <div
                      className="low-stock-item"
                      key={product._id}
                    >

                      <span>
                        {product.name}
                      </span>

                      <strong>
                        {product.quantity}
                      </strong>

                    </div>

                  )
                )

              ) : (

                <div className="dashboard-stock-healthy">

                  <strong>
                    All products are sufficiently stocked
                  </strong>

                  <span>
                    No low stock items
                  </span>

                </div>

              )}

            </div>

          </section>

        </main>

      </div>

    </div>
  );
};

export default Dashboard;