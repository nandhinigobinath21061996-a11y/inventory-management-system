const LowStockTable = ({ products }) => {
  return (
    <div className="recent-card">
      <h3>Low Stock Products</h3>

      <table className="recent-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Brand</th>
            <th>Stock</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.brand}</td>
                <td>{product.quantity}</td>
                <td>
                  <span className="low-stock-badge">
                    Low Stock
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No Low Stock Products</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LowStockTable;