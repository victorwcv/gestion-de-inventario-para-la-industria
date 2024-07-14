import { Formik, Form } from "formik";
import FormField from "../../components/FormField";
import { Link } from "react-router-dom";
import Button from "../../components/Button";

const Login = () => {
  return (
    <div className="relative flex-1 flex flex-col justify-center items-center">
      <h2 className="text-2xl font-semibold mb-12">Ingresar</h2>
      <div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {(formik) => (
            <Form>
              <div className="container sm:w-[450px] w-[300px] flex flex-col bg-blue-200 py-6  xl:px-10 px-4 rounded-lg">
                <FormField
                  formik={formik}
                  type={"email"}
                  name={"email"}
                  label={"Correo electrónico:"}
                />

                <FormField
                  formik={formik}
                  type={"password"}
                  name={"password"}
                  label={"Contraseña:"}
                />
                <div className="mx-auto mt-4">
                  <Button label={"Ingresar"} addStyles="w-[250px]" type="submit"/>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        <div className="mt-1 w-full flex justify-between items-center gap-3 text-blue-800 px-4">
          <Link to="/" className="hover:underline underline-offset-2">Volver al Inicio</Link>
          <Link to="/register" className="hover:underline underline-offset-2">
            Registrar Usuario
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
