import { Outlet } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <Sidebar />
      <main className="App">
        <Outlet />
      </main>
    </>
  );
}

export default App;
