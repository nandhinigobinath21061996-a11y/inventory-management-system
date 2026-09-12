import {
  FaBoxOpen,
  FaTruck,
  FaShoppingCart,
  FaCashRegister,
  FaExclamationTriangle,
} from "react-icons/fa";

const DashboardCards = ({ stats }) => {
  const cards = [
    {
      title: "Products",
      value: stats.totalProducts,
      icon: <FaBoxOpen />,
    },
    {
      title: "Suppliers",
      value: stats.totalSuppliers,
      icon: <FaTruck />,
    },
    {
      title: "Purchases",
      value: stats.totalPurchases,
      icon: <FaShoppingCart />,
    },
    {
      title: "Sales",
      value: stats.totalSales,
      icon: <FaCashRegister />,
    },
    {
      title: "Low Stock",
      value: stats.lowStockCount,
      icon: <FaExclamationTriangle />,
    },
  ];

  return (
    <div className="dashboard-cards">
      {cards.map((card, index) => (
        <div className="card" key={index}>
          <div className="card-icon">{card.icon}</div>

          <h3>{card.title}</h3>

          <h2>{card.value}</h2>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;