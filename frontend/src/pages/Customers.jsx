import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MaterialReactTable } from "material-react-table";
import { useMemo, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import AddCustomerModal from "../components/AddCustomerModal";
import userData from "../contents/dataGen";
import "../sass/Customers.scss";

function Customers() {
  const [currentModal, setCurrentModal] = useState(null);

  const handleAddCustomers = () => {
    setCurrentModal("add-customer");
  };
  const handleModalClose = () => {
    setCurrentModal(null);
  };

  const columns = useMemo(() => [
    {
      accessorKey: "firstName",
      header: "First Name",
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "city",
      header: "City",
    },
    {
      accessorKey: "actions",
      header: "Actions",
      Cell: ({ row }) => (
        <div>
          <FaEdit
            onClick={() => handleEdit(row.original)}
            className="icons-edit-customers"
          />
          <FaTrash
            onClick={() => handleDelete(row.original)}
            className="icons-delete-customers"
          />
        </div>
      ),
    },
  ]);
  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode: "light",
      },
    })
  );

  return (
    <section className="customers-content">
      <h2>Clients</h2>
      <button
        type="button"
        className="customer-btn"
        onClick={() => handleAddCustomers()}
      >
        Ajouter un client
      </button>
      {currentModal === "add-customer" && (
        <AddCustomerModal visible onClose={handleModalClose} />
      )}
      <div className="table-container">
        <ThemeProvider theme={theme}>
          <MaterialReactTable columns={columns} data={userData} />
        </ThemeProvider>
      </div>
    </section>
  );
}

export default Customers;
