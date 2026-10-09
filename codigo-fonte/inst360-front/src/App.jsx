import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import Home from "./pages/Home/Home";
import AcessoFormulario from "./pages/AcessoFormulario/AcessoFormulario";
import Formulario from "./pages/Formulario/Formulario";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Cadastro />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/cadastro"
        element={<Cadastro />}
      />

      <Route
        path="/home"
        element={<Home />}
      />

      <Route
        path="/acesso-formulario"
        element={<AcessoFormulario />}
      />

      <Route
        path="/formulario"
        element={<Formulario />}
      />
    </Routes>
  );
}

export default App;