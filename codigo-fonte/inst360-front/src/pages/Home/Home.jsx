import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import ListaUsuarios from "../../components/ListaUsuarios/ListaUsuarios";
import "./Home.css";

function Home() {

  const navigate = useNavigate();

  const usuarioSalvo =
    sessionStorage.getItem("usuarioLogado");

  const usuario = usuarioSalvo
    ? JSON.parse(usuarioSalvo)
    : null;

  if (!usuario) {
    return (
      <div>
        <h1>Usuário não autenticado</h1>

        <button onClick={() => navigate("/login")}>
          Ir para o login
        </button>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main className="container">

        <h1>Home</h1>

        <p>
          Bem-vindo(a), {usuario.nome}!
        </p>

        <p>
          Tipo de usuário:{" "}
          {usuario.administrador
            ? "Administrador"
            : "Usuário comum"}
        </p>

        {usuario.administrador && (
          <ListaUsuarios />
        )}

      </main>
    </>
  );
}

export default Home;