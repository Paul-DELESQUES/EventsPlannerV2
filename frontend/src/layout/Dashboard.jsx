import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  return (
    <>
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Dashboard;
