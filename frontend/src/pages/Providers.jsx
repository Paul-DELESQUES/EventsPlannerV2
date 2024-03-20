import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { MaterialReactTable } from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import AddProviderForListModal from "../components/AddProviderForListModal";
import EditProviderModal from "../components/EditProviderModal";
import "../sass/Providers.scss";
function Providers() {
  const [currentModal, setCurrentModal] = useState(null);
  const [providersData, setProvidersData] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentProvider, setCurrentProvider] = useState(null);

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

  const handleDeleteProvider = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/providers/${id}`
      );
      getProvidersForList();
    } catch (error) {
      console.error("Failed to delete provider", error);
    }
  };

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
            onClick={() => handleDeleteProvider(row.original.id)}
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
  const handleEdit = (provider) => {
    setCurrentProvider(provider);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    getProvidersForList();
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
        <AddProviderForListModal
          visible
          onClose={handleModalClose}
          onAdd={getProvidersForList}
        />
      )}
      {editModalOpen && currentProvider && (
        <EditProviderModal
          visible={editModalOpen}
          onClose={handleCloseEditModal}
          providerData={currentProvider}
          onAdd={getProvidersForList}
        />
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
