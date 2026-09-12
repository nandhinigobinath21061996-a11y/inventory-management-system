import "../css/stats.css";
import {
  FaBoxOpen,
  FaUsers,
  FaChartLine,
  FaWarehouse,
} from "react-icons/fa";

const Stats = () => {
  const stats = [
    {
      id: 1,
      icon: <FaBoxOpen />,
      number: "5,000+",
      title: "Products Managed",
    },
    {
      id: 2,
      icon: <FaUsers />,
      number: "500+",
      title: "Happy Clients",
    },
    {
      id: 3,
      icon: <FaChartLine />,
      number: "₹2M+",
      title: "Sales Tracked",
    },
    {
      id: 4,
      icon: <FaWarehouse />,
      number: "250+",
      title: "Warehouses",
    },
  ];

  return (
    <section className="stats-section">
      <div className="container">

        <div className="section-title">
          <h2>Trusted by Businesses Worldwide</h2>
          <p>
            Everything you need to manage inventory efficiently.
          </p>
        </div>

        <div className="stats-grid">

          {stats.map((item) => (
            <div className="stat-card" key={item.id}>

              <div className="stat-icon">
                {item.icon}
              </div>

              <h3>{item.number}</h3>

              <p>{item.title}</p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Stats;