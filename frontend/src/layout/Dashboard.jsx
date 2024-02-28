import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../sass/Dashboard.scss";

function Dashboard() {
  return (
    <>
      <Sidebar />
      <main className="dashboard-ctn-main">
        <Outlet />
      </main>
    </>
  );
}

export default Dashboard;
