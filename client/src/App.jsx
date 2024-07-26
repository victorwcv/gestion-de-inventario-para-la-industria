import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();
  const showFooter = ["/login", "/register", "/"].includes(location.pathname);

  return (
    <div className="App">
      <Outlet />
      {showFooter && <Footer />}
    </div>
  ); 
}

export default App;
