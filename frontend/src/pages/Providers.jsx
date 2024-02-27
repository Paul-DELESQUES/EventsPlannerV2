import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { MaterialReactTable } from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import AddProviderForListModal from "../components/AddProviderForListModal";
import "../sass/Providers.scss";
function Providers() {
  const [currentModal, setCurrentModal] = useState(null);
  const [providersData, setProvidersData] = useState([]);

  const getProvidersForList = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/providers`
      );
      setProvidersData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getProvidersForList();
  }, []);

  const columns = useMemo(() => [
    {
      accessorKey: "name",
      header: "Nom",
    },
    {
      accessorKey: "provider_type",
      header: "Type",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Téléphone",
    },
    {
      accessorKey: "address",
      header: "Adresse",
    },
    {
      accessorKey: "city",
      header: "Ville",
    },
    {
      accessorKey: "actions",
      header: "Actions",
      Cell: ({ row }) => (
        <div>
          <FaEdit
            onClick={() => handleEdit(row.original)}
            className="icons-edit-providers"
          />
          <FaTrash
            onClick={() => handleDelete(row.original)}
            className="icons-delete-providers"
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

  const handleModalOpen = () => {
    setCurrentModal("provider");
  };
  const handleModalClose = () => {
    setCurrentModal(null);
  };

  return (
    <section className="providers-content">
      <h2>Prestataires</h2>
      <button
        type="button"
        className="provider-btn"
        onClick={() => handleModalOpen()}
      >
        Ajouter un prestataire
      </button>
      {currentModal === "provider" && (
        <AddProviderForListModal visible onClose={handleModalClose} />
      )}
      <div className="table-container">
        <ThemeProvider theme={theme}>
          <MaterialReactTable columns={columns} data={providersData} />
        </ThemeProvider>
      </div>
    </section>
  );
}

export default Providers;
