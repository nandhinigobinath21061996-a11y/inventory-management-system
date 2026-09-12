const RecentSales = ({ sales }) => {
  return (
    <div className="recent-card">
      <h3>Recent Sales</h3>

      <table className="recent-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Customer</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {sales.length > 0 ? (
            sales.map((sale) => (
              <tr key={sale._id}>
                <td>{sale.product?.name}</td>
                <td>{sale.customerName || "-"}</td>
                <td>{new Date(sale.saleDate).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No Recent Sales</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecentSales;