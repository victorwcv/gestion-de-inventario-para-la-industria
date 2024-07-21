import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";

const System = () => {
  return (
    <div className="flex-1">
      <Header />
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default System