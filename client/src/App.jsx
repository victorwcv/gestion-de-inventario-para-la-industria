import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-slate-200 min-h-screen flex flex-col">
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
