import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();
  const showFooter = ["/login", "/register", "/"].includes(location.pathname);

  return (
    <div className="bg-slate-200 min-h-screen flex flex-col">
      <Outlet />
      {showFooter && <Footer />}
    </div>
  );
}

export default App;
