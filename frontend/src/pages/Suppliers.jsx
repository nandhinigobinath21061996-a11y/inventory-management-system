import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../api/productApi";
import AddSupplierModal from "../components/AddSupplierModal";
import EditSupplierModal from "../components/EditSupplierModal";
import "../css/suppliers.css";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);

  const [showModal, setShowModal] =
    useState(false);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [selectedSupplier, setSelectedSupplier] =
    useState(null);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const { data } =
        await API.get("/suppliers");

      setSuppliers(data);
    } catch (error) {
      console.error(
        "Error fetching suppliers:",
        error
      );
    }
  };

  const editSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    setShowEditModal(true);
  };

  const deleteSupplier = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this supplier?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(
        `/suppliers/${id}`
      );

      alert(
        "Supplier deleted successfully"
      );

      fetchSuppliers();
    } catch (error) {
      console.error(
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete supplier"
      );
    }
  };

  return (
    <div className="suppliers-page">

      {/* ================= SIDEBAR ================= */}

      <Sidebar />


      {/* ================= MAIN ================= */}

      <div className="suppliers-layout">

        <main className="suppliers-main">

          {/* ================= HEADER ================= */}

          <div className="suppliers-page-header">

            <div>

              <h1>
                Suppliers
              </h1>

              <p>
                {suppliers.length} suppliers •
                Manage your suppliers
              </p>

            </div>


            <button
              className="add-supplier-btn"
              onClick={() =>
                setShowModal(true)
              }
            >
              + Add Supplier
            </button>

          </div>


          {/* ================= SUPPLIER TABLE CARD ================= */}

          <div className="suppliers-card">

            <div className="suppliers-card-header">

              <div>

                <h2>
                  Supplier List
                </h2>

                <span>
                  All registered suppliers
                </span>

              </div>

            </div>


            <div className="suppliers-table-wrapper">

              <table className="suppliers-table">

                <thead>

                  <tr>

                    <th>
                      #
                    </th>

                    <th>
                      Supplier Name
                    </th>

                    <th>
                      Company
                    </th>

                    <th>
                      Phone
                    </th>

                    <th>
                      Address
                    </th>

                    <th>
                      Actions
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {suppliers.length > 0 ? (

                    suppliers.map(
                      (supplier, index) => (

                        <tr
                          key={
                            supplier._id
                          }
                        >

                          <td className="supplier-number">
                            {index + 1}
                          </td>


                          <td>

                            <div className="supplier-name">

                              <div className="supplier-avatar">

                                {supplier.name
                                  ?.charAt(
                                    0
                                  )
                                  ?.toUpperCase() ||
                                  "S"}

                              </div>

                              <strong>
                                {supplier.name ||
                                  "N/A"}
                              </strong>

                            </div>

                          </td>


                          <td>
                            {supplier.company ||
                              "N/A"}
                          </td>


                          <td>
                            {supplier.phone ||
                              "N/A"}
                          </td>


                          <td className="supplier-address">
                            {supplier.address ||
                              "N/A"}
                          </td>


                          <td>

                            <div className="supplier-actions">

                              <button
                                className="edit-btn"
                                onClick={() =>
                                  editSupplier(
                                    supplier
                                  )
                                }
                              >
                                Edit
                              </button>


                              <button
                                className="delete-btn"
                                onClick={() =>
                                  deleteSupplier(
                                    supplier._id
                                  )
                                }
                              >
                                Delete
                              </button>

                            </div>

                          </td>

                        </tr>

                      )
                    )

                  ) : (

                    <tr>

                      <td
                        colSpan="6"
                        className="empty-suppliers"
                      >

                        No suppliers found

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>


          {/* ================= ADD SUPPLIER ================= */}

          {showModal && (

            <AddSupplierModal
              closeModal={() =>
                setShowModal(false)
              }
              refreshSuppliers={
                fetchSuppliers
              }
            />

          )}


          {/* ================= EDIT SUPPLIER ================= */}

          {showEditModal && (

            <EditSupplierModal
              supplier={
                selectedSupplier
              }
              closeModal={() =>
                setShowEditModal(false)
              }
              refreshSuppliers={
                fetchSuppliers
              }
            />

          )}

        </main>

      </div>

    </div>
  );
};

export default Suppliers;