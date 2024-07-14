import { Link } from "react-router-dom";
import Button from "../../components/Button";

const Home = () => {
  return (
    <div className="flex-1 flex flex-col justify-evenly items-center p-4">
      <h1 className="text-2xl font-semibold text-neutral-700 text-center">
        Sistema de Gestión de Inventario para la Industria
      </h1>
      <div className="flex flex-col justify-center items-center gap-4">
        <Link to="/login">
          <Button label={"Ingresar al Sistema"} addStyles="w-[250px]" />
        </Link>
        <Link to="/register">
          <p className="text-neutral-700 hover:underline ">Registrar Usuario</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
